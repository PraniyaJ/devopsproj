variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "eu-north-1"
}

variable "vpc_cidr" {
  description = "VPC CIDR block"
  type        = string
  default     = "10.0.0.0/16"
}

variable "public_subnet_cidr" {
  description = "Public subnet CIDR"
  type        = string
  default     = "10.0.1.0/24"
}

variable "ami_id" {
  description = "Optional explicit AMI ID (overrides auto lookup when non-empty)"
  type        = string
  default     = ""
}

variable "instance_type" {
  description = "EC2 instance type for app server"
  type        = string
  default     = "t3.micro"
}

variable "key_name" {
  description = "SSH key pair name"
  type        = string
  default     = "mern-devops-key"
}

variable "public_key_path" {
  description = "Path to SSH public key"
  type        = string
  default     = "/mnt/c/Users/User/.ssh/id_rsa.pub"
}

variable "allowed_ssh_cidr" {
  description = "CIDR allowed to connect via SSH"
  type        = string
  default     = "0.0.0.0/0"
}

variable "repo_url" {
  description = "Git repo URL for application (optional). If set, instance will clone and run docker-compose."
  type        = string
  default     = ""
}

variable "repo_branch" {
  description = "Branch to clone from repo_url"
  type        = string
  default     = "main"
}

variable "app_compose_path" {
  description = "Path to docker-compose.yml inside the repository (relative to repo root)"
  type        = string
  default     = "docker-compose.yml"
}