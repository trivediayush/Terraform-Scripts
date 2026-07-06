#!/bin/bash
set -euxo pipefail

# Log user-data execution
exec > >(tee /var/log/user-data.log | logger -t user-data) 2>&1

echo "===== User Data Started ====="

# Update packages
dnf update -y

# Install useful packages
dnf install -y \
    git \
    curl \
    wget \
    unzip \
    jq \
    htop \
    vim \
    amazon-ssm-agent

# Enable SSM Agent
systemctl enable amazon-ssm-agent
systemctl restart amazon-ssm-agent

# Set timezone (optional)
timedatectl set-timezone UTC

# Create application directory
mkdir -p /opt/app
chmod 755 /opt/app

echo "Provisioned on $(date)" > /opt/app/info.txt

echo "===== User Data Completed ====="