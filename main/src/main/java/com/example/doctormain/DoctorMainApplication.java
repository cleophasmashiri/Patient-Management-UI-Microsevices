package com.example.doctormain;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.zuul.EnableZuulProxy;


@SpringBootApplication
//@Controller
@EnableZuulProxy
public class DoctorMainApplication {

//  @GetMapping("/resource")
//  @ResponseBody
//  public Map<String, Object> home() {
//    Map<String, Object> model = new HashMap<String, Object>();
//    model.put("id", UUID.randomUUID().toString());
//    model.put("content", "Hello World");
//    return model;
//  }

	public static void main(String[] args) {
		SpringApplication.run(DoctorMainApplication.class, args);
	}
}
