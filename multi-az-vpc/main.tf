######################################
# Data Sources
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

############################################
# Networking Module
############################################

module "networking" {
  source = "./modules/networking"

  project_name = var.project_name
  environment  = var.environment

  vpc_cidr = var.vpc_cidr

  public_subnet_1_cidr = var.public_subnet_1_cidr
  public_subnet_2_cidr = var.public_subnet_2_cidr

  private_subnet_1_cidr = var.private_subnet_1_cidr
  private_subnet_2_cidr = var.private_subnet_2_cidr

  availability_zone_1 = var.availability_zone_1
  availability_zone_2 = var.availability_zone_2
}

############################################
# Security Module
############################################

module "security" {
  source = "./modules/security"

  project_name = var.project_name
  environment  = var.environment
  vpc_id       = module.networking.vpc_id
}

############################################
# Load Balancer Module
############################################

module "loadbalancer" {
  source = "./modules/loadbalancer"

  project_name = var.project_name
  environment  = var.environment

  vpc_id = module.networking.vpc_id

  public_subnet_ids = [
    module.networking.public_subnet_1_id,
    module.networking.public_subnet_2_id,
  ]

  alb_security_group_id = module.security.alb_security_group_id
}

############################################
# Server Module
############################################

module "server" {
  source = "./modules/server"

  project_name = var.project_name
  environment  = var.environment

  instance_type = var.instance_type
  key_name      = var.key_name

  private_subnet_ids = [
    module.networking.private_subnet_1_id,
    module.networking.private_subnet_2_id,
  ]

  ec2_security_group_id = module.security.ec2_security_group_id
  target_group_arn      = module.loadbalancer.target_group_arn
  ami_id                = coalesce(var.ami_id, data.aws_ami.amazon_linux.id)
}

############################################
# Database Module
############################################

module "db" {
  source = "./modules/db"

  project_name = var.project_name
  environment  = var.environment

  private_subnet_ids = [
    module.networking.private_subnet_1_id,
    module.networking.private_subnet_2_id,
  ]

  rds_security_group_id = module.security.rds_security_group_id

  db_name           = var.db_name
  db_username       = var.db_username
  db_password       = var.db_password
  db_instance_class = var.db_instance_class
}
