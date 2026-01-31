resource "aws_vpc" "mern_vpc" {
  cidr_block           = var.vpc_cidr
  enable_dns_hostnames = true
  enable_dns_support   = true

  tags = { Name = "mern-vpc" }
}

resource "aws_internet_gateway" "mern_igw" {
  vpc_id = aws_vpc.mern_vpc.id
  tags   = { Name = "mern-igw" }
}

resource "aws_subnet" "mern_public_subnet" {
  vpc_id                  = aws_vpc.mern_vpc.id
  cidr_block              = var.public_subnet_cidr
  availability_zone       = "${var.aws_region}a"
  map_public_ip_on_launch = true

  tags = { Name = "mern-public-subnet" }
}

resource "aws_route_table" "mern_public_rt" {
  vpc_id = aws_vpc.mern_vpc.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.mern_igw.id
  }
  tags = { Name = "mern-public-rt" }
}

resource "aws_route_table_association" "mern_public_assoc" {
  subnet_id      = aws_subnet.mern_public_subnet.id
  route_table_id = aws_route_table.mern_public_rt.id
}
