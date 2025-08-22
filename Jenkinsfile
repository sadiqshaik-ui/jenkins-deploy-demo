pipeline {
    agent any

    triggers {
        githubPush()
    }

    environment {
        DOCKER_REGISTRY = "docker.io"
        IMAGE_NAME = "mydockerhubuser/myapp"
        DOCKER_USER = credentials('docker-username')
        DOCKER_PASS = credentials('docker-password')
        VM_USER = "azureuser"
        VM_HOST = "10.0.0.5"
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/mydockerhubuser/myapp.git'
            }
        }

        stage('Docker Build & Push') {
            steps {
                sh '''
                docker build -t ${IMAGE_NAME}:${BUILD_NUMBER} .
                echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin
                docker push ${IMAGE_NAME}:${BUILD_NUMBER}
                '''
            }
        }

        stage('Deploy to VM') {
            steps {
                sshagent(['ssh-key-cred']) {
                    sh '''
                    ssh -o StrictHostKeyChecking=no ${VM_USER}@${VM_HOST} "
                        docker pull ${IMAGE_NAME}:${BUILD_NUMBER} &&
                        docker stop myapp || true &&
                        docker rm myapp || true &&
                        docker run -d --name myapp -p 3000:3000 ${IMAGE_NAME}:${BUILD_NUMBER}
                    "
                    '''
                }
            }
        }
    }
}
