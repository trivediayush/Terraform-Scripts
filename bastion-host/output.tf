output "bastion_host_public_ip" {
  description = "The public IP address of the bastion host"
  value       = aws_instance.bastion_host.public_ip
}

output "bastion_host_private_ip" {
  description = "The private IP address of the bastion host"
  value       = aws_instance.bastion_host.private_ip
}

output "ssh_command" {
    description = "The SSH command to connect to the bastion host"
    value       = "ssh -i ${var.key_name}.pem ec2-user@${aws_instance.bastion_host.public_ip}"
}