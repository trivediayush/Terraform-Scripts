output "vpc_id" {
  description = "VPC ID"
  value       = module.networking.vpc_id
}

output "alb_dns_name" {
  description = "Application Load Balancer DNS name"
  value       = module.loadbalancer.alb_dns_name
}

output "rds_endpoint" {
  description = "RDS endpoint"
  value       = module.db.rds_endpoint
}
