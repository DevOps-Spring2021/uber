pipeline {
    agent any

    stages {

       stage('Git Clone') {
          steps {
                checkout scm
            }
        }

        stage('Build image') {
             steps {
                script {
                    dockerImage = docker.build ("${FRONTEND_IMAGE}")
                }
             
            }
        }

        stage('Registring image') {
            steps{
                script {
                    docker.withRegistry( '', 'dockerCred' ) {
                    dockerImage.push("latest")
                    }
                }
            }
        }

        stage('Azure Cluster Info') {
            steps{
                script {
                    withKubeConfig([credentialsId: 'azureCred']) {
                        sh "kubectl cluster-info"
                    }
                }
            }
        }

        stage('AWS Cluster Info, Backend Service url') {
            steps{
                script {
                    withKubeConfig([credentialsId: 'kubernetesCred']) {
                        sh "kubectl cluster-info"
                        backendIp = sh(returnStdout: true, script: "kubectl describe services backend | grep elb.amazonaws.com | grep LoadBalancer | awk '{print \$3}' | tr -d '\n'")
                        echo "${backendIp}"
                    }
                }
            }
        }

        stage('Helm upgrade') {
            steps{
                script {
                    withKubeConfig([credentialsId: 'azureCred']) {
                        echo "${backendIp}"
                        sh "helm upgrade frontend ./helm/ --set backend.url='http://${backendIp}:8080'"
                    }
                }
            }
        }


        
    }
}