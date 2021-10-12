pipeline {
  agent any
 
  stages {
    stage('Run Tests') {
      steps {
        sh 'cd hello-world && npm install && npm run test && cd ..'
      }
    }
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
    stage('Staging Deploy') {
      when {
        expression {
          return (env.BRANCH_NAME != 'main')
        }
      }
      steps {
        withAWS(credentials: 'lambda-deploy', region: 'eu-central-1') {
          sh 'venv/bin/sam deploy --no-confirm-changeset --config-file samconfig-stage.toml'
        }
      }
    }
    stage('Prod Deploy') {
      when {
        expression {
          return (env.BRANCH_NAME == 'main')
        }
      }
      input{
        message "Deploy to Production?"
      }
      steps {
        withAWS(credentials: 'lambda-deploy', region: 'eu-central-1') {
          sh 'venv/bin/sam deploy --no-confirm-changeset --config-file samconfig-prod.toml'
        }
      }
    }
  }
}