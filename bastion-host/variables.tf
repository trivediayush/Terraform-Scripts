variable "ami" {
    description = "The AMI ID for the bastion host"
    type        = string
    default     = "ami-036c2680a9e9de6b5"
}

variable "instance_type" {
    description = "The instance type for the bastion host"
    type        = string
    default     = "t3.micro"
}

variable "key_name" {
    description = "The name of the key pair to use for the bastion host"
    type        = string
    default     = "test"
}

variable "region" {
    description = "The AWS region to deploy the bastion host"
    type        = string
    default     = "us-east-1"
}