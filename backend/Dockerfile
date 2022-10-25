FROM openjdk:11-jdk

WORKDIR /app

COPY ../build/libs/*SNApSHOT.jar application.jar

ENV profile default
EXPOSE 8080

CMD ["java", "-jar", "-Dspring.profiles.active=$profile", "application.jar"]
