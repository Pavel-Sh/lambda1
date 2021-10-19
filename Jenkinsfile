pipeline {
  agent any
 
  stages {
    stage('Run Linter') {
      steps {
        nodejs(nodeJSInstallationName: 'nodejs14.x') {
          sh 'cd hello-world && npm install && npm run lint && cd ..'
        }
      }
    }
    stage('Run Tests') {
      steps {
        nodejs(nodeJSInstallationName: 'nodejs14.x') {
          sh 'cd hello-world && npm install && npm run test && cd ..'
        }
      }
    }
    stage('Install sam-cli') {
      steps {
        sh 'python3 -m venv venv && venv/bin/pip install aws-sam-cli'
      }
    }
    stage('Build') {
      steps {
        nodejs(nodeJSInstallationName: 'nodejs14.x') {
          sh 'venv/bin/sam build'
        }
      }
    }
    stage('Staging Deploy') {
      steps {
        withAWS(credentials: 'jenkins-geoip', region: 'eu-central-1') {
          sh 'venv/bin/sam deploy --no-confirm-changeset --config-file samconfig-stage.toml'
        }
      }
    }
    stage('Prod Deploy') {
      when {
        branch 'main'
      }
      steps {
        input message: 'Deploy to Production?'

        withAWS(credentials: 'jenkins-geoip', region: 'eu-central-1') {
          sh 'venv/bin/sam deploy --no-confirm-changeset --config-file samconfig-prod.toml'
        }
      }
    }
  }
}