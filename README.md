# UI as a service with Spring Cloud Gateway and angular 1 and 5
---
This article is going to show you how to develop UI as multiple UI microsevices, in other words I am going to apply microservice concept to a UI. If this is done right, it gives us a number of benefits, for example autonomus build pipelines and deployments, autonomus teams and so forth.

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
We are going to break this into the following iterations.

1. [UI as a service with Spring Cloud Gateway and angular 1 and 5 Part-1](#link1).
2. [Using configuration service (Cloud Configuration) Part-2](#link2).
3. [Using discovery service(Eureka) Part-3]((#link3)).
4. [Dockerise Part-4](#link4).
5. [Authentication Part-5](#link5)

 
## Important Links
1. [Angular 1.5 and 5, Javascript, Typescript](https://link1.com)
2. [Markdown](https://link2.com).
3. [Java, Spring Boot and Spring Cloud](https://link3.com).
4. [Docker](https://link4.com).
