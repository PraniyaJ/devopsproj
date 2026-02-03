output "app_server_public_ip" {
  description = "Public IP of application server"
  value       = aws_instance.mern_app_server.public_ip
}

output "app_server_public_dns" {
  description = "Public DNS of application server"
  value       = aws_instance.mern_app_server.public_dns
}