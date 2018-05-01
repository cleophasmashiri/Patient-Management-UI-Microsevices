# Adding external configuration using spring cloud configuration.

1. Create a Springboot application config-service

Use https://start.spring.io/ add web and config-server dependencies, generate application.
 ./mvnw spring-boot:run to check that everything whent smoothly.

```
./mvnw spring-boot:run

```

2. Add @EnableConfigServer

Add @EnableConfigServer to ApplicationMain class

```
@SpringBootApplication
@EnableConfigServer
public class ConfigApplication {
 ....
}

```

2. Configuration files.

Rename application.properties to application.yml and add the following:

 ```
 server:
   port: 8888
 spring:
   cloud:
     config:
       server:
         git:
            uri: /Users/cleophas/my/apps/microservices/doctor-booking-consulting/git-config-repo
 ```

3. Create a git repository and add the following

    ```
    mkdir git-config

    cd git-config

    touch app1.yml

    ```

    Add the following content to app1.yml

    ```
    server:
        port: 9080
    zuul:
        routes:
            doctor:
                url: http://localhost:9081
                sensitive-headers:
            booking:
                url: http://localhost:9083
                sensitive-headers:
            payment:
                url: http://localhost:9084
                sensitive-headers:
            patient:
                url: http://localhost:9082
                sensitive-headers:
            main:
                url: http://localhost:9080
                sensitive-headers:
    ```

    ```
    git init

    git add .

    git commit -m "first commit"

    ```
