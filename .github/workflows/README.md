# AWS ECR에 Docker 이미지 배포 및 Amazon ECS 서비스 업데이트 가이드

이 문서는 AWS Elastic Container Registry (ECR)에 Docker 이미지를 빌드하고 푸시한 후 Amazon ECS 서비스를 업데이트하는 방법을 안내합니다.

본 문서는 `admin-server`를 기반으로 작성되어 있음을 알립니다.

## 필요 사항

- AWS CLI가 설치되어 있어야 합니다. 설치 방법은 [AWS CLI 공식 문서](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-quickstart.html)를 참조하십시오.
- Docker가 설치되어 있어야 합니다. 설치 방법은 [Docker 공식 문서](https://docs.docker.com/get-docker/)를 참조하십시오.
- AWS IAM 사용자가 생성되어 있어야 하며, 해당 사용자는 `AmazonEC2ContainerRegistryFullAccess` 및 `AmazonECS_FullAccess` 권한을 가지고 있어야 합니다.

## 단계 1: AWS Elastic Container Registry (ECR) 로그인

1. 터미널에서 다음 환경 변수를 설정하십시오. 이때, `<your-access-key-id>` 및 `<your-secret-access-key>` 부분을 해당 IAM 사용자의 Access Key ID와 Secret Access Key로 변경해야 합니다.

   ```bash
   export AWS_ACCESS_KEY_ID=<your-access-key-id>
   export AWS_SECRET_ACCESS_KEY=<your-secret-access-key>
   export AWS_REGION=ap-northeast-2
   ```

2. 다음 명령을 실행하여 AWS ECR에 로그인하십시오. `<your-aws-account-id>` 부분은 해당 AWS 계정의 ID로 변경해야 합니다.

   ```bash
   aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin <your-aws-account-id>.dkr.ecr.$AWS_REGION.amazonaws.com
   ```

## 단계 2: Docker 이미지 빌드 및 ECR에 푸시

1. 프로젝트 디렉토리로 이동합니다.

   ```bash
   cd app/admin-server
   ```

2. Docker 이미지를 빌드합니다.

   ```bash
   ./gradlew bootBuildImage --imageName=app
   ```

3. 빌드된 Docker 이미지의 태그를 변경합니다. `<your-aws-account-id>` 부분은 해당 AWS 계정의 ID로 변경해야 합니다.

   ```bash
   docker tag app:latest <your-aws-account-id>.dkr.ecr.$AWS_REGION.amazonaws.com/automl-main-web:latest
   ```

4. 변경된 태그를 가진 Docker 이미지를 ECR로 푸시합니다.

   ```bash
   docker push <your-aws-account-id>.dkr.ecr.$AWS_REGION.amazonaws.com/automl-main-web:latest
   ```

## 단계 3: Amazon ECS 서비스 업데이트

다음 명령을 실행하여 Amazon ECS 서비스를 업데이트합니다.

```bash
aws ecs update-service \
--cluster automl-cluster \
--service automl-service \
--task-definition automl-main-web-task-definition:'<사용할 태스크정의 개정 지정>' \
--force-new-deployment
```
