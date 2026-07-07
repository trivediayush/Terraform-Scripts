######################################
# AWS Configuration
######################################

variable "aws_region" {
  description = "AWS region to create the infrastructure"
  type        = string
  default     = "us-east-1"
}

######################################
# Project Information
######################################

variable "project_name" {
  description = "Project name"
  type        = string
  default     = "multi-az-vpc"
}

variable "environment" {
  description = "Environment name"
  type        = string
  default     = "Pre-Prod-Testing"
}

######################################
# Networking
######################################

variable "vpc_cidr" {
  description = "CIDR block for the VPC"
  type        = string
  default     = "10.0.0.0/16"
}

variable "public_subnet_1_cidr" {
  description = "CIDR block for the first public subnet"
  type        = string
  default     = "10.0.1.0/24"
}

variable "public_subnet_2_cidr" {
  description = "CIDR block for the second public subnet"
  type        = string
  default     = "10.0.2.0/24"
}

variable "private_subnet_1_cidr" {
  description = "CIDR block for the first private subnet"
  type        = string
  default     = "10.0.3.0/24"
}

variable "private_subnet_2_cidr" {
  description = "CIDR block for the second private subnet"
  type        = string
  default     = "10.0.4.0/24"
}

variable "availability_zone_1" {
  description = "First availability zone"
  type        = string
  default     = "us-east-1a"
}

variable "availability_zone_2" {
  description = "Second availability zone"
  type        = string
  default     = "us-east-1b"
}

######################################
# EC2 Configuration
######################################

variable "instance_type" {
  description = "Instance type for the EC2 instances"
  type        = string
  default     = "t3.micro"
}

variable "key_name" {
  description = "Name of the SSH key pair to use for EC2 instances"
  type        = string
  default     = "test"
}

variable "ami_id" {
  description = "AMI ID for the EC2 instances"
  type        = string
  default     = null
}

variable "desired_capacity" {
  description = "Desired capacity for the Auto Scaling Group"
  type        = number
  default     = 2
}

variable "max_size" {
  description = "Maximum size for the auto scaling group"
  type        = number
  default     = 4
}

variable "min_size" {
  description = "Minimum size for the auto scaling group"
  type        = number
  default     = 1
}

######################################
# RDS/DB Configuration
######################################

variable "db_name" {
  description = "Name of the database"
  type        = string
  default     = "mydb"
}

variable "db_username" {
  description = "Username for the database"
  type        = string
  default     = "admin"
}

variable "db_password" {
  description = "Password for the database"
  type        = string
  default     = "password123"
  sensitive   = true
}

variable "db_instance_class" {
  description = "Instance class for the RDS database"
  type        = string
  default     = "db.t3.micro"
}

######################################
# Common Tags
######################################

variable "common_tags" {
  description = "Common tags for all resources"
  type        = map(string)
  default = {
    ManagedBy   = "Terraform"
    Environment = "Pre-Prod-Testing"
    Project     = "multi-az-vpc"
  }
}
