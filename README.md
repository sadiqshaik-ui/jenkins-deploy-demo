# Jenkins Deploy Demo 🚀

This is a sample Node.js app deployed via Jenkins CI/CD pipeline to a VM using Docker.

## Features
- Simple Express.js app
- Dockerfile to containerize
- Jenkinsfile for CI/CD (build, push, deploy)

## Run locally
```bash
npm install
npm start
```
Visit: http://localhost:3000

## Deployment
Configured with Jenkins to:
1. Build Docker image
2. Push to DockerHub
3. Deploy on VM via SSH
```
