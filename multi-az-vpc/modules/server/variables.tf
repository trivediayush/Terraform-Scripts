variable "project_name" {
  description = "Project name"
  type        = string
}

variable "environment" {
  description = "Environment name"
  type        = string
}

variable "instance_type" {
  description = "Instance type for the EC2 instances"
  type        = string
}

variable "key_name" {
  description = "Name of the SSH key pair to use for EC2 instances"
  type        = string
}

variable "ami_id" {
  description = "AMI ID for the EC2 instances"
  type        = string
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

variable "private_subnet_ids" {
  description = "List of private subnet IDs for the Auto Scaling Group"
  type        = list(string)
}

variable "ec2_security_group_id" {
  description = "Security group ID for the EC2 instances"
  type        = string
}

variable "target_group_arn" {
  description = "Target group ARN to attach the instances to"
  type        = string
}
