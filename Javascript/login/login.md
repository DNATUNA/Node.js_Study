# Login with Passport + Mysql + Sequelize

아주 기본적인 로그인을 구현해봤습니다. Sequelize와 Mysql, Passport를 이용해 로그인과 Kakao Oauth 인증 서비스를 구현했습니다.

## Setting

## 주요 Packages

1. express + express-session
2. passport + passport-local + passport-kakao
3. sequelize + mysql2
4. bcrtpy

## SIMPLE API DOC

|URI|Method|Description|
|-----|:---:|------|
|/|GET|메인|
|/join|GET|회원가입 페이지|
|/profile|GET|내 정보|
|/auth/join|POST|회원가입 요청|
|/auth/login|POST|로그인 요청|
|/auth/logout|GET|로그아웃 요청|
|/auth/kakao|GET|Kakao Oauth 인증 요청|
|/auth/kakao/callback|GET|Kakao Oauth callback URI|