package com.example.doctormain;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.zuul.EnableZuulProxy;


@SpringBootApplication
@EnableZuulProxy
public class DoctorMainApplication {
	public static void main(String[] args) {
		SpringApplication.run(DoctorMainApplication.class, args);
	}
}
