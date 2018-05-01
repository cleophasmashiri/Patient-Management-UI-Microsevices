# Creating Child UI microservices with (Angular 1.5, Spring-boot)

In this part 2 of UI as microservices we will create a UI microservice using Spring Boot and Angular 1.5. Lets get started.

## Creating Spring boot project

1. Use https://start.spring.io/ add web dependencies, generate application and unzip copy the main project into ui-as-microservices.

### Add Maven Front-end plugin to pom.xml.

 .pom.xml
 ```
 <build>
     <plugins>
         <plugin>
             <groupId>org.springframework.boot</groupId>
             <artifactId>spring-boot-maven-plugin</artifactId>
         </plugin>
         <plugin>
             <groupId>com.github.eirslett</groupId>
             <artifactId>frontend-maven-plugin</artifactId>
             <version>1.6</version>
             <configuration>
                 <nodeVersion>v8.8.1</nodeVersion>
             </configuration>
             <executions>
                 <execution>
                          <!-- optional: you don't really need execution ids, but it looks nice in your build log. -->
                          <id>install node and npm</id>
                          <goals>
                            <goal>install-node-and-npm</goal>
                          </goals>
                          <!-- optional: default phase is "generate-resources" -->
                          <phase>generate-resources</phase>
                        </execution>
                        <execution>
                          <id>npm-install</id>
                          <goals>
                            <goal>npm</goal>
                          </goals>
                        </execution>
                        <execution>
                          <id>bower install</id>
                          <goals>
                            <goal>bower</goal>
                          </goals>
                        </execution>
                        <execution>
                          <id>gulp build</id>
                          <goals>
                            <goal>gulp</goal>
                          </goals>
                        </execution>

             </executions>
         </plugin>
     </plugins>
 </build>
 ```

 2. Run the following to install node and npm locally
  ```
  /mvnw generate-resources
 ```

 3. Create npm runner

 - Create file npm in the root folder and copy the following.

 ```
 #!/bin/sh
 cd $(dirname $0)
 PATH="$PWD/node/":$PATH
 node "node/node_modules/npm/bin/npm-cli.js" "$@"
 ```

 - Run the following command in your terminal.
 ```
 chmod +x npm
 ```
 - _This is to make npm file executable._

 4. Install gulp-angular-generator

  ```
  npm install -g generator-gulp-angular

  ````

 5. Create angularjs application.

  ```

  mkdir client && cd

  yo gulp-angular

  ```
  Follow the gulp-angular-generator, selecting the defaults or otherwise.


 6. Move the client application into root folder by executing the following.
 ```
 > $ cat client/.gitignore  .gitignore
 $ rm -rf client/node* client/src/favicon.ico client/.gitignore client/.git
 $ sed -i '/node_/anode/' .gitignore
 $ cp -rf client/* .
 $ cp client/.??* .
 $ rm -rf client
 $ sed -i -e 's,dist,target/classes/static,' .angular-cli.json
 ```

 7. Testing
 - Run the following
 ```
  gulp test
 ```

 ## Run
 ```
 ./mvnw spring-boot:run
 ```
