# Этап сборки
FROM azul/zulu-openjdk:22 AS build
WORKDIR /app

# Установка Maven
ARG MAVEN_VERSION=3.8.5
RUN apt-get update && apt-get install -y wget \
  && wget https://archive.apache.org/dist/maven/maven-3/${MAVEN_VERSION}/binaries/apache-maven-${MAVEN_VERSION}-bin.tar.gz \
  && tar xzvf apache-maven-${MAVEN_VERSION}-bin.tar.gz -C /opt \
  && ln -s /opt/apache-maven-${MAVEN_VERSION} /opt/maven \
  && ln -s /opt/maven/bin/mvn /usr/bin/mvn \
  && rm apache-maven-${MAVEN_VERSION}-bin.tar.gz

ENV MAVEN_HOME /opt/maven
ENV PATH ${MAVEN_HOME}/bin:${PATH}

COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

# Этап выполнения
FROM azul/zulu-openjdk:22
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]
EXPOSE 8080
