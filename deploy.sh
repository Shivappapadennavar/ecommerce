#!/bin/bash

set -e

# Configuration
GIT_REPO="https://github.com/bot28-b/ecommerce.git"
DEPLOY_DIR="/home/ubuntu/ecommerce"
BRANCH="main"

echo "=========================================="
echo "E-Commerce Application - Complete Deployment"
echo "=========================================="
echo ""

# Create deployment directory
echo "[1/7] Setting up deployment directory..."
sudo mkdir -p $DEPLOY_DIR
sudo chown -R $USER:$USER $DEPLOY_DIR
cd $DEPLOY_DIR

# Clone or update repository
if [ -d "$DEPLOY_DIR/.git" ]; then
    echo "[2/7] Updating existing repository..."
    git pull origin $BRANCH
else
    echo "[2/7] Cloning repository..."
    git clone -b $BRANCH $GIT_REPO .
fi

# Install Docker if not present
if ! command -v docker &> /dev/null; then
    echo "[3/7] Installing Docker..."
    sudo apt-get update
    sudo apt-get install -y docker.io
    sudo usermod -aG docker $USER
    newgrp docker
else
    echo "[3/7] Docker is already installed"
fi

# Stop and remove existing containers
echo "[4/7] Stopping and removing existing containers..."
docker stop backend frontend 2>/dev/null || true
docker rm backend frontend 2>/dev/null || true

# Build Docker images
echo "[5/7] Building Docker images..."
cd $DEPLOY_DIR/backend
docker build -t ecom-backend:latest .

cd $DEPLOY_DIR/frontend
docker build -t ecom-frontend:latest .

# Run containers
echo "[6/7] Starting services..."
# Backend on port 8000, mounting data volume for persistence
docker run -d \
  --name backend \
  -p 8000:8000 \
  --restart always \
  -v $DEPLOY_DIR/backend/data:/app/data \
  ecom-backend:latest

# Frontend on port 80 (Nginx)
docker run -d \
  --name frontend \
  -p 80:80 \
  --restart always \
  ecom-frontend:latest

# Verify deployment
echo "[7/7] Verifying deployment..."
sleep 5  # Give containers time to start

echo ""
echo "=========================================="
echo "Deployment Complete!"
echo "=========================================="
echo "Services:"
echo "- Backend API:     http://$(curl -s ifconfig.me):8000"
echo "- Frontend:        http://$(curl -s ifconfig.me)"
echo ""
echo "Container Status:"
docker ps --format "{{.Names}}: {{.Status}}"
echo ""
echo "To view logs:"
echo "  docker logs -f backend"
echo "  docker logs -f frontend"
echo "=========================================="
