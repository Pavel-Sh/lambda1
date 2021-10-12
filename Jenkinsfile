pipeline {
  agent any
 
  stages {
    stage('Install sam-cli') {
      steps {
        sh 'python3 -m venv venv && venv/bin/pip install aws-sam-cli'
      }
    }
    stage('Build') {
      steps {
        sh 'venv/bin/sam build'
      }
    }
    stage('prod') {
      steps {
        withAWS(credentials: 'lambda-deploy', region: 'eu-central-1') {
          sh 'venv/bin/sam deploy'
        }
      }
    }
  }
}