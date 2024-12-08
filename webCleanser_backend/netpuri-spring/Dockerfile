FROM openjdk:17-slim

# 애플리케이션이 사용할 볼륨 생성
VOLUME /tmp

# 빌드 단계에서 생성된 JAR 파일을 복사
COPY build/libs/server-0.0.1-SNAPSHOT.jar app.jar

# 애플리케이션 실행 명령어
ENTRYPOINT ["java", "-jar", "/app.jar"]
