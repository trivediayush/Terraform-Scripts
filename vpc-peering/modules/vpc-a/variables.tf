############################################
# Project
############################################

variable "project_name" {
  type = string
}

variable "environment" {
  type = string
}

############################################
# Networking
############################################

variable "vpc_cidr" {
  type = string
}

variable "public_subnet_cidr" {
  type = string
}

variable "availability_zone" {
  type = string
}

############################################
# EC2
############################################

variable "ami_id" {
  type = string
}

variable "instance_type" {
  type = string
}

variable "key_pair_name" {
  type = string
}