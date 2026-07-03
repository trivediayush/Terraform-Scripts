output "vpc_id" {

  value = aws_vpc.main.id
}

output "public_subnet_id" {

  value = aws_subnet.public.id
}

output "private_subnet_id" {

  value = aws_subnet.private.id
}

output "nat_gateway_id" {

  value = aws_nat_gateway.nat.id
}

output "bastion_public_ip" {
  value = aws_instance.bastion.public_ip
}

output "bastion_public_dns" {
  value = aws_instance.bastion.public_dns
}

output "private_instance_id" {

  value = aws_instance.private.id
}

output "private_instance_ip" {

  value = aws_instance.private.private_ip
}