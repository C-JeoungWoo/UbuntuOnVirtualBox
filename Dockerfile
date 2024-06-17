# 베이스 이미지 설정
FROM node:14

# 작업 디렉토리 설정
WORKDIR /usr/src/app

# package.json과 package-lock.json을 작업 디렉토리로 복사
COPY package*.json ./

# 의존성 설치
RUN npm install

# 애플리케이션 소스 코드를 작업 디렉토리로 복사
COPY . .

# wait-for-it.sh 스크립트를 작업 디렉토리로 복사하고 실행 권한 부여
COPY wait-for-it.sh /usr/src/app/wait-for-it.sh
RUN chmod +x /usr/src/app/wait-for-it.sh

# 애플리케이션 실행
CMD ["npm", "run", "dev"]