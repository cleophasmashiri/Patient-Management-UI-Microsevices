# UI as Microservices with Spring Cloud Gateway and angular 1 and 5
---
This article is going to show you how to develop UI as multiple UI microsevices, in other words I am going to apply microservice concept to a UI. If this is done right, it gives us a number of benefits, for example autonomus build pipelines and deployments, autonomus teams and so forth. 

Applying Microservice on the UI is not that common, I have seen examples using [web components](http://bit.ly/web-components-ui-composition), [server-side UI compostion](http://bit.ly/composite-UI-based-microservice). Another interesting article uses [Spring gateway with multiple UIs](http://bit.ly/Multiple-UI-Applications-Gateway) article  All I can say its hard, but its doable.    

This article draws inspiration from a number of places. Having worked on large scale UI projects and experienced the pain, from slowness of delivering, hardiship of migrating from angular 1.x to 5. This article also draws insipiration from Eric Evans's serminal book [Domain-Driven-Design](http://bit.ly/ddd-eric-evans), and [Vaugn Vernon](http://bit.ly/ddd-vv). I also drew some inspiration from microservices, in particular, [Sam Newman Ground-breaking book](http://bit.ly/microservices-sm) 

## The business problem.
We are going to build standalone UI applications that function as one application to deliver seamless patient experience, from patient own booking app, staff booking app, doctor consultation app and payment application. We are going to use different versions of angular (1.x and 5), just to illustrate the ability to be UI framework agnostic when we break our UI into microservices. Our application is composed of the following UI microservices:
1. Main UI microservice **(angular 5)**.
2. Patient booking UI microservice **(angular 5)**.
3. Staff booking managment UI microservice **(angular 5)**.
4. Doctor consultation management microservice **(angular 5)**.
5. Payments managment UI **(angular 1.5)**

## Application Boundaries
My motivation for breacking the UI as above, is to show you how to apply microservice thinking to a monlithic UI, this is problem you need to pay close attention. I have seen people breaking UI into technical components, you will cry if you do this. In DDD the concept of [bounded context](http://bit.ly/bounded-context) encourages us to breaking-up our domain models around business capabilities. I prefer to lean more torwards [Self-Contained-Systems](http://bit.ly/2JcwAtm). 

## Iterations
We are going to break our deliverables into the following iterations.

1. [UI as a service with Spring Cloud Gateway and angular 1 and 5 Part-1](#link1).
2. [Using configuration service (Cloud Configuration) Part-2](#link2).
3. [Using discovery service(Eureka) Part-3]((#link3)).
4. [Dockerise Part-4](#link4).
5. [Authentication Part-5](#link5)

## [UI as a service with Spring Cloud Gateway and angular 1 and 5 Part-1](#link1).
In this part 1 article, we are going to develop 5 UI applications as microservices, this seems a lot work in one iteration, but these are skeleton applications that will help us to physical show the idea of UI as microservice. 

1. Main UI microservice **(Angular 5, Spring-boot and Zuul gateway)**.
2. Patient booking UI microservice **(Angular 5 and Spring-boot)**.
3. Staff booking managment UI microservice **(Angular 5 and and Spring-boot)**.
4. Doctor consultation management microservice **(Angular 5 and Spring-boot)**.
5. Payments managment UI **(Angular 1.5 and Spring-boot)**

### Main UI microservice **(Angular 5, Spring-boot and Zuul gateway)**.
1. Create parent folder patient-ui-as-microservices and cd into.
2. Use https://start.spring.io/ add web and zuul dependencies, generate application and unzip copy the main project into patient-ui-as-microservices.
3. ./mvnw spring-boot:run to check that everything whent smoothly.
4. Add angular 5 app into main. 
-_For more details on this check this article [Spring Angular](http://bit.ly/angular5-spring-boot)_
-a. In your pom add Maven Front-end plugin.

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

-b. Run the following to install node and npm locally
 ```
 /mvnw generate-resources
```
- Install angular cli
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

- Create a program to run ng cli
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

- Create a new application as follows:
```
 ./ng new client
```
- Move it into root folder by executing the follwing.
```
> $ cat client/.gitignore  .gitignore
$ rm -rf client/node* client/src/favicon.ico client/.gitignore client/.git
$ sed -i '/node_/anode/' .gitignore
$ cp -rf client/* .
$ cp client/.??* .
$ rm -rf client
$ sed -i -e 's,dist,target/classes/static,' .angular-cli.json
```

- Building
- Add the following into the pom.xml, under front-end maven plugin.

```
 <execution
    <idnpm-install</id
    <goals
        <goalnpm</goal
    </goals
</execution
```
- Testing
- Run the following
```
 ./ng e2e
```

- You should see something like below.

- > Executed 1 of 1 spec SUCCESS in 0.718 sec.

- Add the following to the maven front-end plugin
   
```
    <execution>
        <idnpm-build</id>
        <goals>
            <goalnpm</goal>
        </goals>
        <configuration>
            <argumentsrun-script build</arguments>
        </configuration>
    </execution>
```
- Add bootstrap
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
Run
```
./mvnw spring-boot:run
```

### Patient booking UI microservice **(Angular 5 and Spring-boot)**.
### Staff booking managment UI microservice **(Angular 5 and and Spring-boot)**.
### Doctor consultation management microservice **(Angular 5 and Spring-boot)**.
### Payments managment UI **(Angular 1.5 and Spring-boot)**

 
## Important Links
1. [Angular 1.5 and 5, Javascript, Typescript](https://link1.com)
2. [Markdown](https://link2.com).
3. [Java, Spring Boot and Spring Cloud](https://link3.com).
4. [Docker](https://link4.com).
