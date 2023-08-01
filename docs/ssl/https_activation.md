# HTTPS 활성화

이 문서는 AWS의 Route53, ACM, 그리고 로드밸런서를 이용해 웹 사이트의 프로토콜을 HTTP에서 HTTPS로 변경하는 방법에 대해 설명합니다.

## 목적

- WS-AutoML Google OAuth API를 이용한 외부사용자 접근 허용 및 데이터 전송 보안 강화를 위한 암호화 기능 적용

## 목차

1. [AWS Route53에서 도메인 생성 및 결제](#aws-route53에서-도메인-생성-및-결제)
2. [ACM에서 인증서 발급](#acm에서-인증서-발급)
3. [Route53에서 생성한 도메인을 로드밸런서에 등록](#route53에서-생성한-도메인을-로드밸런서에-등록)
4. [기존 HTTP 트래픽에 대한 리다이렉트 설정](#기존-http-트래픽에-대한-리다이렉트-설정)
5. [HSTS 설정](#hsts-설정)
6. [쿠키에 Secure 플래그 설정](#쿠키에-secure-플래그-설정)
7. [CORS 및 CSP 설정](#cors-및-csp-설정)
8. [HTTPS 적용 확인](#https-적용-확인)

## AWS Route53에서 도메인 생성 및 결제

1. AWS Management Console에 로그인 후, 'Services'에서 'Route 53' 서비스를 선택합니다.
2. 'Domain Registration'을 클릭 후 'Register Domain'을 선택합니다.
3. 'main.wsautoml.com'과 'admin.wsautoml.com' 도메인 이름을 입력하고, 도메인 종류 (.com)를 선택합니다. 이 이름은 전 세계에서 유일한 이름이어야 합니다.
4. 필요한 정보를 입력한 후, 결제 정보를 확인하고 도메인을 구매합니다. 도메인 이름이 이용 가능한지와 올바르게 입력되었는지를 확인해주세요.

## ACM에서 인증서 발급

1. AWS Management Console에 로그인 후, 'Services'에서 'Certificate Manager'를 선택합니다.
2. 'Request a certificate'를 클릭합니다.
3. 'Request a public certificate' 옵션을 선택 후, 'Request a certificate' 버튼을 클릭합니다.
4. 인증서를 발급 받고자 하는 도메인 이름 'admin.wsautoml.com'과 'main.wsautoml.com'을 입력하고, 'Next' 버튼을 클릭합니다.
5. 검증 방법으로 DNS 검증 또는 이메일 검증을 선택합니다.
6. 이메일 확인을 통해 인증서를 발급 받습니다. 이메일에 전달된 링크를 클릭하여 인증 절차를 완료합니다.

## Route53에서 생성한 도메인을 로드밸런서에 등록

1. AWS Management Console에서 'Services'에서 'EC2'를 선택합니다.
2. 왼쪽 사이드바에서 'Load Balancers'를 선택합니다.
3. 필요한 로드밸런서 (automl-main-web-load-balancer-213875655 와 automl-user-load-balancer-366843044)를 선택하고, 'Listeners' 탭을 클릭합니다.
4. 'Edit'를 클릭하여 'HTTPS : 443'을 추가하고, 인증서를 ACM에서 발급 받은 것으로 설정합니다.
5. 'Route 53' 서비스로 돌아가서 'Hosted zones'에서 생성한 도메인을 선택합니다.
6. 각 로드밸런서의 DNS 이름을 레코드셋으로 추가합니다. 'Create Record Set'을 클릭하고 'Alias' 항목에 각 로드밸런서의 DNS 이름을 입력합니다.

## 기존 HTTP 트래픽에 대한 리다이렉트 설정

1. AWS Management Console에서 'Services'에서 'EC2'를 선택합니다.
2. 왼쪽 사이드바에서 'Load Balancers'를 선택합니다.
3. 필요한 로드밸런서 (automl-user-load-balancer-366843044 와 automl-main-web-load-balancer-213875655)를 선택하고, 'Listeners' 탭을 클릭합니다.
4. 'View/edit rules'를 클릭한 후, 'HTTP : 80' 리스너에 대해 'Redirect to https://' 규칙을 추가합니다.

## HSTS 설정

1. 웹 서버의 설정 파일에 다음과 같이 HSTS 헤더를 추가합니다.
   ```
   Strict-Transport-Security: max-age=31536000; includeSubDomains
   ```

## 쿠키에 Secure 플래그 설정

- 웹 애플리케이션에서 쿠키를 설정할 때 'Secure' 플래그를 사용해 쿠키가 HTTPS 연결을 통해서만 전송되도록 설정합니다.

## CORS 및 CSP 설정

- 웹 애플리케이션의 CORS 및 CSP 설정을 검토하고 필요한 경우 HTTPS로 업데이트합니다.

## HTTPS 적용 확인

1. 웹 브라우저를 열고, https://main.wsautoml.com 및 https://admin.wsautoml.com 로 접속을 시도합니다.
2. 브라우저의 주소 창에서 'https://'가 표시되고, 보안 연결이 성립된 것을 확인합니다.

[참고 자료](https://develop-writing.tistory.com/127)
