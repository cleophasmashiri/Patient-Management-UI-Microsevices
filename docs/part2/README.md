# UI as microservices creating, api gateway part 2

UI as Microservices Part 2: Creating Gateway with Spring Cloud and Angular 5

In this part 2 of UI as microservices we will create a api gateway using Spring Cloud Configuration service and angular 5. Lets get started.

## Creating Spring boot project

1. Create parent folder ui-as-microservices and cd into.
2. Use https://start.spring.io/ add web and zuul dependencies, generate application and unzip copy the main project into ui-as-microservices.
3. ./mvnw spring-boot:run to check that everything whent smoothly.

## Adding angular 5 application to Spring Boot project. 

### Add front-end assets plugin to your pom.xml.

-_For more details on this check this article [Spring Angular](http://bit.ly/angular5-spring-boot)_

1. In your pom add Maven Front-end plugin.

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
                    <id>install-npm</id>
                    <goals>
                        <goal>install-node-and-npm</goal>
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

3. Install angular cli
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


- Install angular cli by running

```
./npm install @angular/cli
```

4. Create a program to run ng cli
- Create a file _ng_ and copy the contents of:

```
#!/bin/sh
cd $(dirname $0)
PATH="$PWD/node/":"$PWD":$PATH
node_modules/@angular/cli/bin/ng "$@"
```

- Make executable by running:
```
 chmod +x ng
```

5. Create a new application as follows:
```
 ./ng new client
```
6. Move it into root folder by executing the follwing.
```
> $ cat client/.gitignore  .gitignore
$ rm -rf client/node* client/src/favicon.ico client/.gitignore client/.git
$ sed -i '/node_/anode/' .gitignore
$ cp -rf client/* .
$ cp client/.??* .
$ rm -rf client
$ sed -i -e 's,dist,target/classes/static,' .angular-cli.json
```

7. Building
- Add the following into the pom.xml, under front-end maven plugin.

```
 <execution
    <id>npm-install</id>
    <goals>
        <goal>npm</goal
    </goals>
</execution>
```
8. Testing
- Run the following
```
 ./ng e2e
```

- You should see something like below.

- > Executed 1 of 1 spec SUCCESS in 0.718 sec.

9. Add the following to the maven front-end plugin
   
```
    <execution>
        <idnpm-build</id>
        <goals>
            <goal>npm</goal>
        </goals>
        <configuration>
            <arguments>run-script build</arguments>
        </configuration>
    </execution>
```
10. Add bootstrap
```
./npm install bootstrap@3 jquery --save
```

- Update .angular-cli.json

- From
```
 "styles": [
    "styles.css"
  ],
  "scripts": [],
  ```
  
  To
  ```
  "styles.css",
    "../node_modules/bootstrap/dist/css/bootstrap.min.css"
  ],
  "scripts": [
    "../node_modules/jquery/dist/jquery.min.js",
    "../node_modules/bootstrap/dist/js/bootstrap.min.js"
  ],
```

## Add Zuul

Add the annotation @EnableZuulProxy to the MainApplication

```
@EnableZuulProxy
public class MainApplication
```

Rename application.properties to application.yml and add the following into it.

```
server:
  port: 9080
zuul:
  routes:
    main:
      url: http://localhost:9080
      sensitive-headers:
```
  
## Run
```
./mvnw spring-boot:run
```


