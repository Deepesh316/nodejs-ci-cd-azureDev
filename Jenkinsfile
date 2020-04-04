pipeline {
    agent any
    stages {
        stage("Install dependencies") {
            steps {
                bat "npm install"
            }
        }
        stage("Build") {
            steps {
                bat "npm run lint"
                bat "npm run build"
            }
        }
        stage("Test") {
            steps {
                bat "npm run test"
                bat "npm run test:debug"
            }
        }

    }
}