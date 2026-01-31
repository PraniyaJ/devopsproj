data "aws_ami" "ubuntu" {
  most_recent = true
  owners      = ["099720109477"]
  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-jammy-22.04-amd64-server-*"]
  }
}

resource "aws_instance" "mern_app_server" {
  ami                         = coalesce(var.ami_id, data.aws_ami.ubuntu.id)
  instance_type               = var.instance_type
  key_name                    = aws_key_pair.mern_key.key_name
  subnet_id                   = aws_subnet.mern_public_subnet.id
  vpc_security_group_ids      = [aws_security_group.mern_sg.id]
  associate_public_ip_address = true

  root_block_device {
    volume_size = 30
    volume_type = "gp3"
  }

  user_data = <<-EOF
              #!/bin/bash
              set -ex
              apt-get update
              apt-get install -y git apt-transport-https ca-certificates curl software-properties-common
              curl -fsSL https://download.docker.com/linux/ubuntu/gpg | apt-key add -
              add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
              apt-get update
              apt-get install -y docker-ce docker-ce-cli containerd.io
              curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
              chmod +x /usr/local/bin/docker-compose
              usermod -aG docker ubuntu || true
              mkdir -p /home/ubuntu/app
              chown -R ubuntu:ubuntu /home/ubuntu
              if [ -n "${var.repo_url}" ]; then
                su - ubuntu -c "cd /home/ubuntu && git clone --depth 1 --branch ${var.repo_branch} ${var.repo_url} app || (cd app && git pull)"
                su - ubuntu -c "cd /home/ubuntu/app && docker-compose -f ${var.app_compose_path} up -d"
              fi
              EOF

  tags = { Name = "mern-app-server" }
}

resource "aws_instance" "jenkins_server" {
  ami                         = coalesce(var.ami_id, data.aws_ami.ubuntu.id)
  instance_type               = var.jenkins_instance_type
  key_name                    = aws_key_pair.mern_key.key_name
  subnet_id                   = aws_subnet.mern_public_subnet.id
  vpc_security_group_ids      = [aws_security_group.mern_sg.id]
  associate_public_ip_address = true

  root_block_device {
    volume_size = 30
    volume_type = "gp3"
  }

  user_data = <<-EOF
              #!/bin/bash
              set -ex
              apt-get update
              apt-get install -y openjdk-21-jdk git apt-transport-https ca-certificates curl software-properties-common
              curl -fsSL https://pkg.jenkins.io/debian-stable/jenkins.io-2023.key | tee /usr/share/keyrings/jenkins-keyring.asc > /dev/null
              echo deb [signed-by=/usr/share/keyrings/jenkins-keyring.asc] https://pkg.jenkins.io/debian-stable binary/ | tee /etc/apt/sources.list.d/jenkins.list > /dev/null
              apt-get update
              apt-get install -y jenkins
              curl -fsSL https://download.docker.com/linux/ubuntu/gpg | apt-key add -
              add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
              apt-get update
              apt-get install -y docker-ce docker-ce-cli containerd.io
              usermod -aG docker jenkins || true
              systemctl enable --now jenkins
              systemctl enable --now docker
              EOF

  tags = { Name = "jenkins-server" }
}
