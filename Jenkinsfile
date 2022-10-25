version: "3"

services:
  db:
    image: mysql:latest
    container_name: db
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: ${MYSQL_ROOT_PASSWORD}
      MYSQL_DATABASE: ${MYSQL_DATABASE}
      MYSQL_USER: ${MYSQL_USER}
      MYSQL_PASSWORD: ${MYSQL_PASSWORD}
    volumes:
      - ${DB_BACKUP}:/var/lib/mysql

  rabbitmq:
    container_name: rabbitmq
    restart: always
    build:
      context: ./backend
      dockerfile: rabbit-dockerfile
    environment:
      RABBITMQ_ERLANG_COOKIE: "RabbitMQ-My-Cookies"
      RABBITMQ_DEFAULT_USER: ${RABBITMQ_DEFAULT_USER}
      RABBITMQ_DEFAULT_PASS: ${RABBITMQ_DEFAULT_PASS}
      
  redis:
    container_name: redis
    image: redis/redis-stack:latest
    restart: always
    environment:
      REDIS_ARG: ${REDIS_ARG}

  api:
    container_name: api
    build:
      context: ./backend
      dockerfile: backend-dockerfile
    environment:
      SPRING_DATASOURCE_URL: ${SPRING_DATASOURCE_URL}
      SPRING_DATASOURCE_USERNAME: ${MYSQL_USER}
      SPRING_DATASOURCE_PASSWORD: ${MYSQL_PASSWORD}
      PROFILE: prod
    depends_on:
      - db
      - rabbitmq
      - redis
