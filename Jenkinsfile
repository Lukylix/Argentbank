def app
pipeline {
  agent any
  environment {
    VITE_APP_API_BASEURL = "https://api.argentbank.iloa.dev"
  }
  stages {
    stage("Build") {
      steps {
        script {
          app = docker.build("argentbank", "--build-arg baseUrl=${env.VITE_APP_API_BASEURL}", ".")
        }
      }
    }
    stage("Push Image") {
      steps {
        script{
          docker.withRegistry("https://registry.iloa.dev", "registry-auth") {
            app.push("1.0.${env.BUILD_NUMBER}");
            app.push("latest")
          }
        }
      }
    }
  }
}