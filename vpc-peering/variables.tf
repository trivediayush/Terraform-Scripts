#############################
# AWS
#############################

variable "aws_region" {
  type = string
}

#############################
# Project
#############################

variable "project_name" {
  type = string
}

variable "environment" {
  type = string
}

#############################
# VPC A
#############################

variable "vpc_a_cidr" {
  type = string
}

variable "vpc_a_public_subnet" {
  type = string
}

#############################
# VPC B
#############################

variable "vpc_b_cidr" {
  type = string
}

variable "vpc_b_public_subnet" {
  type = string
}

#############################
# EC2
#############################

variable "instance_type" {
  type = string
}

variable "key_pair_name" {
  type = string
}