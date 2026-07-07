output "alb_name" {
  description = "Application Load Balancer name"
  value       = aws_lb.alb.name
}

output "alb_dns_name" {
  description = "Application Load Balancer DNS"
  value       = aws_lb.alb.dns_name
}

output "alb_arn" {
  description = "Application Load Balancer ARN"
  value       = aws_lb.alb.arn
}

output "target_group_arn" {
  description = "Target group ARN"
  value       = aws_lb_target_group.app_tg.arn
}
