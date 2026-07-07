output "rds_endpoint" {
  description = "RDS endpoint"
  value       = aws_db_instance.mysql.endpoint
}

output "rds_identifier" {
  description = "RDS identifier"
  value       = aws_db_instance.mysql.identifier
}

output "rds_database_name" {
  description = "Database name"
  value       = aws_db_instance.mysql.db_name
}
