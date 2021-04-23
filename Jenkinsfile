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

        stage('Cluster Info') {
            steps{
                script {
                    withKubeConfig([credentialsId: 'kubernetesCred']) {
                        sh "kubectl cluster-info"
                    }
                }
            }
        }

        stage('Helm upgrade') {
            steps{
                script {
                    withKubeConfig([credentialsId: 'kubernetesCred']) {
                        backendIp = sh(returnStdout: true, script: "kubectl describe services backend | grep elb.amazonaws.com | grep LoadBalancer | awk '{print \$3}' | tr -d '\n'")
                        echo "${backendIp}"
                        sh "helm upgrade frontend ./helm/ --set backend.url='http://${backendIp}:8080'"
                    }
                }
            }
        }


        
    }
}