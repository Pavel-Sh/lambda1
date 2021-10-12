pipeline {
  agent any
 
  stages {
    stage('Install sam-cli') {
      steps {
        sh 'python3 -m venv venv && venv/bin/pip install aws-sam-cli'
        stash includes: '**/venv/**/*', name: 'venv'
      }
    }
    stage('Build') {
      steps {
        unstash 'venv'
        sh 'venv/bin/sam build'
        stash includes: '**/.aws-sam/**/*', name: 'aws-sam'
      }
    }
    stage('prod') {
      steps {
        withAWS(credentials: 'lambda-deploy', region: 'eu-central-1') {
          unstash 'venv'
          unstash 'aws-sam'
          sh 'venv/bin/sam deploy'
        }
      }
    }
  }
}