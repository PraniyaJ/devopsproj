output "app_server_public_ip" {
  description = "Public IP of application server"
  value       = aws_instance.mern_app_server.public_ip
}

output "app_server_public_dns" {
  description = "Public DNS of application server"
  value       = aws_instance.mern_app_server.public_dns
}

output "jenkins_server_public_ip" {
  description = "Public IP of Jenkins server"
  value       = aws_instance.jenkins_server.public_ip
}

output "jenkins_server_public_dns" {
  description = "Public DNS of Jenkins server"
  value       = aws_instance.jenkins_server.public_dns
}

output "jenkins_url" {
  description = "Jenkins URL"
  value       = "http://${aws_instance.jenkins_server.public_ip}:8080"
}