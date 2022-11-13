pipeline {
  agent any

  // 파이프라인에서 사용할 변수 설정
  environment {
    // 환경변수 파일을 젠킨스 크리덴셜로부터 가져옴
    // 그렇게 하기 위해서 Manage Jenkins > Manage Credentials 에서 크리덴셜 등록 (Kind: Secret file)
    COMPOSE_PRODUCTION = credentials('compose_production')
    BACKEND_PRODUCTION = credentials('backend_production')
    FIREBASE_PRODUCTION = credentials('firebase_production')
    RABBIT_PRODUCTION = credentials('rabbit_production')
    REDIS_CONF_PRODUCTION = credentials('redis_conf_production')
    REDIS_ACL_PRODUCTION = credentials('redis_acl_production')

    BACKEND_CONTAINER = 'api'

    // MM 플러그인, Blue Ocean 플러그인 관련
    // MMACCOUNT = '@dss02094' // @아이디 사용 (언급시 알림)
    // MSGSUFFIX = "\nBuild <${RUN_DISPLAY_URL}|#${BUILD_NUMBER}>" // 메시지에 일괄적으로 달릴 링크
  }

  stages {
    // 빌드 전 정리 작업
    stage('pre_deploy') {
      // 병렬 처리 (파일 작업과 도커 작업)
      parallel {
        // 파일 (환경 변수) 세팅
        stage('file_work') {
          stages {
            // 변경 사항을 지움 (백엔드 application-production.yml 때문)
            stage('git_clean') {
              steps {
                sh 'git clean --force'
              }
            }

            // 파일 세팅
            stage('set_files') {
              steps {
                sh 'cat $BACKEND_PRODUCTION >> backend/src/main/resources/application.yml'
                sh 'cp $FIREBASE_PRODUCTION backend/src/main/resources/firebase-service-account-production-secret.json'
                sh 'chmod 755 backend/src/main/resources/firebase-service-account-production-secret.json'
                sh 'cp $REDIS_CONF_PRODUCTION backend/redis.conf'
                sh 'chmod 755 backend/redis.conf'
                sh 'cp $REDIS_ACL_PRODUCTION backend/users.acl'
                sh 'chmod 755 backend/users.acl'
                sh 'cat $RABBIT_PRODUCTION >> backend/10-defaults.conf'
              }
            }
          }
        }

        // 도커 관련 작업
        stage('docker_work') {
          stages {
            // 안 쓰이는 이미지 제거
              // 하지 않으면 서버가 아파함
            stage('prune_images') {
              steps {
                catchError {
                  sh 'docker image prune --force'
                }
              }
            }

            // 같은 이름을 계속 사용하기 때문에 현재 작동 중인 컨테이너를 지움
            stage('remove_containers') {
              steps {
                catchError {
                  sh "docker rm --force ${BACKEND_CONTAINER}"
                }
              }
            }
          }
        }
      }
    }

    stage('build') {
      steps {
        dir('backend') {
          sh "chmod +x gradlew"
          sh "./gradlew bootjar"
        }
      }
    }

    // 배포 본 작업
    stage('deploy') {
      // 병렬 처리 (프론트엔드와 백엔드)
      parallel {
        stage('docker_build') {
          steps {
            catchError {
              sh "docker compose --env-file ${COMPOSE_PRODUCTION} up --build -d"
            }
          }
        }
      }
    }

    
  }
}
