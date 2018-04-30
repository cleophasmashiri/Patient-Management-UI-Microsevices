# UI as Microservices with Spring Cloud Gateway and angular 1 and 5

---
This article is going to show you how to develop UI as multiple UI microsevices, in other words I am going to apply microservice concept to a UI. If this is done right, it gives us a number of benefits, for example autonomus build pipelines and deployments, autonomus teams and so forth. 

Applying Microservice on the UI is not that common, I have seen examples using [web components](http://bit.ly/web-components-ui-composition), [server-side UI compostion](http://bit.ly/composite-UI-based-microservice). Another interesting article uses [Spring gateway with multiple UIs](http://bit.ly/Multiple-UI-Applications-Gateway) article  All I can say its hard, but its doable.    

This article draws inspiration from a number of places. Having worked on large scale UI projects and experienced the pain, from slowness of delivering, hardiship of migrating from angular 1.x to 5. This article also draws insipiration from Eric Evans's serminal book [Domain-Driven-Design](http://bit.ly/ddd-eric-evans), and [Vaugn Vernon](http://bit.ly/ddd-vv). I also drew some inspiration from microservices, in particular, [Sam Newman Ground-breaking book](http://bit.ly/microservices-sm) 

---
**You can view a live demo by clicking the image below.**
[![Main container application](/images/main.png)](https://med101.herokuapp.com/)
Figure 1 Main container application, Angular 5 and Spring-boot.

**[View the demo on heroku](https://med101.herokuapp.com/)**

---

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
   
   <details>
      <summary>Creating Gateway Main UI microservice with Angular 5, Spring-boot and Zuul</summary> 
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



    </details>
    
 ### 1. [Creating Gateway Main UI microservice with **(Angular 5, Spring-boot and Zuul gateway)**](https://github.com/cleophasmashiri/Patient-Management-UI-Microsevices/blob/master/docs/part1/README.md)
### 2. [Creating Child UI microservices with **(Angular 5, Spring-boot)**](https://github.com/cleophasmashiri/Patient-Management-UI-Microsevices/blob/master/docs/angular5/README.md)
### 3. [Creating Child UI microservice with **(Angular 1.5, Spring-boot)**](https://github.com/cleophasmashiri/Patient-Management-UI-Microsevices/blob/master/docs/angular1x/README.md)
### 4. [Deploy to **Heroku**](https://github.com/cleophasmashiri/Patient-Management-UI-Microsevices/blob/master/docs/config/README.md)
### 5. [Add Configuration microservice with **(Spring Cloud Configuration Service)**](https://github.com/cleophasmashiri/Patient-Management-UI-Microsevices/blob/master/docs/config/README.md)


### To create projects booking, doctor and patient:

 copy the project main as booking:
  1. Remove the zuul dependency from the pom.xml
  2. Remove @EnableZuulProxy from the MainApplication

     ```
     @EnableZuulProxy
     public class MainApplication
     ```

```
	<dependency>
		<groupId>org.springframework.cloud</groupId>
		<artifactId>spring-cloud-starter-netflix-zuul</artifactId>
	</dependency>
```
Make copy booking to make doctor and patient projects.

Update application.yml as per table 1 below
server:
    port: 9080

##### Table 1

| application.yml | Port          |
| --------------- |:-------------:|
| doctor          | 9081          |
| booking         | 9082          |
| patient         | 9083          |
| payment         | 9084          |


## How to run the apps.

 . cd to Patient-Management-UI-Microsevices folder and run the following
 Unix or Mac os
```
 ./main/mvnw spring-boot:run && ./patient/mvnw spring-boot:run && ./doctor/mvnw spring-boot:run && ./payment/mvnw spring-boot:run && ./booking/mvnw spring-boot:run
```

Windows
```
 main/mvnw.cmd spring-boot:run && patient/mvnw.cmd spring-boot:run && doctor/mvnw.cmd spring-boot:run && payment/mvnw.cmd spring-boot:run && ./booking/mvnw.cmd spring-boot:run
```

This is the end of part 1 of the application.

1. [UI as a service with Spring Cloud Gateway and angular 1 and 5 Part-1](#link1).
2. [Using configuration service (Cloud Configuration) Part-2](#link2).
3. [Using discovery service(Eureka) Part-3]((#link3)).
4. [Authentication Part-5](#link5)

**[View the demo on heroku](https://med101.herokuapp.com/)**

## Important Links
1. [Angular 1.5 and 5, Javascript, Typescript](https://link1.com)
2. [Markdown](https://link2.com).
3. [Java, Spring Boot and Spring Cloud](https://link3.com).
4. [Docker](https://link4.com).

