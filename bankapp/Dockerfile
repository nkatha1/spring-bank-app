# Stage 1: Build the Spring Boot application using Maven
# We use a Maven image that includes JDK 17
FROM maven:3.9.6-amazoncorretto-17-al2023 AS build

# Set the working directory for the build stage
WORKDIR /app

# Copy the pom.xml file first to leverage Docker cache
# This ensures that if only source code changes, Maven dependencies are not re-downloaded
COPY pom.xml .

# Copy your source code
COPY src ./src

# Build the Spring Boot application
# -DskipTests is often used for faster Docker builds; tests should ideally run in CI/CD before this stage
RUN mvn clean install -DskipTests

# Stage 2: Create the final lightweight runtime image
# Use a smaller OpenJDK runtime for the final application
FROM amazoncorretto:17-alpine-jdk

# Set the working directory for the final application
WORKDIR /app

# Copy the built JAR file from the 'build' stage into the final image
COPY --from=build /app/target/*.jar app.jar

# Expose the port your Spring Boot app runs on (default 8080)
EXPOSE 8080

# Define the command to run your Spring Boot application
ENTRYPOINT ["java", "-jar", "app.jar"]