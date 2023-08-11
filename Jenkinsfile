pipeline {
    agent any
    tools {
        nodejs 'node'
    }
    stages {
        stage('build app') {
            steps {
               script {
                   echo "building the application..."
                   sh 'yarn install'
               }
            }
        }
        stage('build image') {
            steps {
                script {
                    echo "building the docker image..."
                    sh 'docker build -t 844268948863.dkr.ecr.us-east-1.amazonaws.com/ktn-frontend:145 .'
                }
            }
}
        stage('deploy to ECR') {
            steps {
                 withAWS(credentials: 'moladipoawscred', region: 'us-east-2'){
                   echo 'deploying docker image to aws ecr...'
                   sh 'aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 844268948863.dkr.ecr.us-east-1.amazonaws.com'
                   echo 'tag the image for ecr'
                   sh 'docker push 844268948863.dkr.ecr.us-east-1.amazonaws.com/ktn-frontend:145'
                 }
            }
        }
        stage('deploy to k8s cluster') {
            steps {
                withAWS(credentials: 'DevOps Credential', region: 'us-west-1'){
                echo 'deployment into kubernetes cluster'
                sh 'kubectl apply -f frontend.yml'
            }
        }
    }
}
}
