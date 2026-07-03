provider "aws" {
    region = var.region
}

# Get latest Amazon Linux 3 AMI ID

data "aws_ami" "al2023" {
  most_recent = true
  owners      = ["amazon"]

  filter {
    name   = "name"
    values = ["al2023-ami-2023.*-x86_64"]
  }

  filter {
    name   = "architecture"
    values = ["x86_64"]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }
}

resource "aws_vpc" "bastion_vpc"{
    cidr_block = "10.0.0.0/16"
    enable_dns_support = true
    enable_dns_hostnames = true

    tags = {
        Name = "bastion-vpc"
    }
}

resource "aws_internet_gateway" "bastion_igw" {
    vpc_id = aws_vpc.bastion_vpc.id
    tags = {
        Name = "bastion-igw"
    }
}

resource "aws_subnet" "bastion_subnet" {
    vpc_id = aws_vpc.bastion_vpc.id
    cidr_block = "10.0.1.0/24"
    map_public_ip_on_launch = true
    availability_zone = "${var.region}a"
    tags = {
        Name = "bastion-subnet"
    }
}

resource "aws_route_table" "bastion_route_table" {
    vpc_id = aws_vpc.bastion_vpc.id
    route {
        cidr_block = "0.0.0.0/0"
        gateway_id = aws_internet_gateway.bastion_igw.id
    }
    tags = {
        Name = "bastion-route-table"
    }
}

resource "aws_route_table_association" "bastion_route_table_association" {
    subnet_id = aws_subnet.bastion_subnet.id
    route_table_id = aws_route_table.bastion_route_table.id
}

resource "aws_security_group" "bastion_sg" {
    name = "bastion-sg"
    description = "Security group for bastion host"
    vpc_id = aws_vpc.bastion_vpc.id

    ingress {
        from_port  = 22
        to_port    = 22
        protocol  = "tcp"
        cidr_blocks = ["0.0.0.0/0"]
    }

    egress {
        from_port  = 0
        to_port    = 0
        protocol   = "-1"
        cidr_blocks = ["0.0.0.0/0"]
    }

    tags = {
        Name = "bastion-sg"
    }
}

resource "aws_instance" "bastion_host" {
    ami           = data.aws_ami.al2023.id
    instance_type = var.instance_type
    key_name      = var.key_name
    subnet_id     = aws_subnet.bastion_subnet.id
    vpc_security_group_ids = [aws_security_group.bastion_sg.id]

    tags = {
        Name = "bastion-host"
    }
}