######################################
# Data Source
######################################

data "aws_availability_zones" "available" {
    state = "available"
}

data "aws_ami" "amazon_linux" {
    most_recent = true
    owners      = ["amazon"]
    filter {
        name   = "name"
        values = ["amzn2-ami-hvm-*-x86_64"]
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

######################################
# Local Values
######################################

locals {
    name = "${var.project_name}-${var.environment}"
}

######################################
# VPC
######################################

resource "aws_vpc" "main" {
    cidr_block             = var.vpc_cidr
    enable_dns_support     = true
    enable_dns_hostnames   = true

    tags = {
        Name = "${local.name}-vpc"
    }
}

######################################
# Internet Gateway
######################################

resource "aws_internet_gateway" "main" {
    vpc_id  = aws_vpc.main.id

    tags = {
        Name = "${local.name}-igw"
    }
}

######################################
# Public Subnet 1
######################################

resource "aws_subnet" "public_1" {
    vpc_id                  = aws_vpc.main.id
    cidr_block              = var.public_subnet_1_cidr
    availability_zone       = var.availability_zone_1
    map_public_ip_on_launch = true

    tags = {
        Name = "${local.name}-public-1"
    }
}

######################################
# Public Subnet 2
######################################

resource "aws_subnet" "public_2" {
    vpc_id                  = aws_vpc.main.id
    cidr_block              = var.public_subnet_2_cidr
    availability_zone       = var.availability_zone_2
    map_public_ip_on_launch = true

    tags = {
        Name = "${local.name}-public-2"
    }
}

######################################
# Private Subnet 1
######################################

resource "aws_subnet" "private_1" {
    vpc_id            = aws_vpc.main.id
    cidr_block        = var.private_subnet_1_cidr
    availability_zone = var.availability_zone_1

    tags = {
        Name = "${local.name}-private-1"
    }
}

######################################
# Private Subnet 2
######################################

resource "aws_subnet" "private_2" {
    vpc_id            = aws_vpc.main.id
    cidr_block        = var.private_subnet_2_cidr
    availability_zone = var.availability_zone_2

    tags = {
        Name = "${local.name}-private-2"
    }
}

######################################
# EIP for Nat Gateway 1
######################################

resource "aws_eip" "nat_1" {
    domain = "vpc"

    tags = {
        Name = "${local.name}-nat-1"
    }

    depends_on = [aws_internet_gateway.main]
}

######################################
# EIP for Nat Gateway 2
######################################

resource "aws_eip" "nat_2" {
    domain = "vpc"

    tags = {
        Name = "${local.name}-nat-1"
    }

    depends_on = [ aws_internet_gateway.main ]
}

######################################
# Nat gateway 1
######################################

resource "aws_nat_gateway" "nat_1" {
    allocation_id = aws_eip.nat_1.id
    subnet_id     = aws_subnet.public_1.id


    tags = {
        Name = "${local.name}-nat-1"
    }

    depends_on = [ aws_internet_gateway.main ]
}

######################################
# Nat gateway 2
######################################

resource "aws_nat_gateway" "nat_2" {
    allocation_id = aws_eip.nat_2.id
    subnet_id     = aws_subnet.public_2.id

    tags = {
        Name = "${local.name}-nat-1"
    }

    depends_on = [ aws_internet_gateway.main ]
}

######################################
# Public Route Table
######################################

resource "aws_route_table" "public" {
    vpc_id          = aws_vpc.main.id
    route {
        cidr_block  = "0.0.0.0/0"
        gateway_id  = aws_internet_gateway.main.id
    }

    tags = {
        Name = "${local.name}-public-rt"
    }
}

######################################
# Private Route Table 1
######################################

resource "aws_route_table" "private_1" {
    vpc_id              = aws_vpc.main.id

    route {
        cidr_block      = "0.0.0.0/0"
        nat_gateway_id  = aws_nat_gateway.nat_1.id
    }

    tags = {
        Name = "${local.name}-private-rt-1"
    }
}

######################################
# Private Route Table 2
######################################

resource "aws_route_table" "private_2" {
    vpc_id              = aws_vpc.main.id

    route {
        cidr_block      = "0.0.0.0/0"
        nat_gateway_id  = aws_nat_gateway.nat_2.id
    }

    tags = {
        Name = "${local.name}-private-rt-2"
    }
}

######################################
# association for public subnet 1
######################################

resource "aws_route_table_association" "public_1" {
    subnet_id       = aws_subnet.public_1.id
    route_table_id  = aws_route_table.public.id 
}

######################################
# association for public subnet 2
######################################

resource "aws_route_table_association" "public_2" {
    subnet_id       = aws_subnet.public_2.id
    route_table_id  = aws_route_table.public.id
}

######################################
# association for private subnet 1
######################################

resource "aws_route_table_association" "private_1" {
    subnet_id       = aws_subnet.private_1.id
    route_table_id  = aws_route_table.private_1.id
}

######################################
# association for private subnet 2
######################################

resource "aws_route_table_association" "private_2" {
    subnet_id       = aws_subnet.private_2.id
    route_table_id  = aws_route_table.private_2.id
}