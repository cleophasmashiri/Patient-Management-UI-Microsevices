# UI as a service with Spring Cloud Gateway and angular 1 and 5
---
This article is going to show how to compose a UI from multiple UI microservices,this us a number of benefits, for example autonomus build pipelines and deployments, autonomus teams and so forth.

We are going build patient booking, consultation and payment application. Our application is composed of the following UI microservices:
1. Main UI microservice _angular 5_.
2. Patient booking UI microservice _angular 5_.
3. Staff booking managment UI microservice _angular 5_.
4. Doctor consultation management microservice _angular 5_.
5. Payments managment UI _angular 1.5_

We are using different versions of angular (1.x and 5) just to illustrate the ability to be UI framework agnostic when we break our UI into microservices.

We are going to break this into the following iterations.

1. [UI as a service with Spring Cloud Gateway and angular 1 and 5](#link1).
2. [Using configuration service (Cloud Configuration)](#link2).
3. [Using discovery service(Eureka)]((#link3)).
4. [Dockerise](#link4).
5. [Authentication](#link5)
 
## Important Links
1. [Angular 1.5 and 5, Javascript, Typescript](https://link1.com)
2. [Markdown](https://link2.com).
3. [Java, Spring Boot and Spring Cloud](https://link3.com).
4. [Docker](https://link4.com).
