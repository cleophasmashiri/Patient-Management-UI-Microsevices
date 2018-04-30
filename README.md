# UI as Microservices with Spring Cloud Gateway and angular 1 and 5

[Facebook](https://www.facebook.com/cleophas.mashiri)

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
We are going to break our deliverables into the following iterations.

1. [UI as a service with Spring Cloud Gateway and angular 1 and 5 Part-1](#link1).
2. [Using configuration service (Cloud Configuration) Part-2](#link2).
3. [Using discovery service(Eureka) Part-3]((#link3)).
4. [Authentication Part-5](#link5)

## [UI as a service with Spring Cloud Gateway and angular 1 and 5 Part-1](#link1).
In this part 1 article, we are going to develop 5 UI applications as microservices, this seems a lot work in one iteration, but these are skeleton applications that will help us to physical show the idea of UI as microservice. 

1. Main UI microservice **(Angular 5, Spring-boot and Zuul gateway)**.
2. Patient booking UI microservice **(Angular 5 and Spring-boot)**.
3. Staff booking managment UI microservice **(Angular 5 and and Spring-boot)**.
4. Doctor consultation management microservice **(Angular 5 and Spring-boot)**.
5. Payments managment UI **(Angular 1.5 and Spring-boot)**

[### Main UI microservice **(Angular 5, Spring-boot and Zuul gateway)**: Part 2](https://github.com/cleophasmashiri/Patient-Management-UI-Microsevices/blob/master/tutorials/part2/README.md)

Rename application.properties to application.yml and add the following into it.

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

