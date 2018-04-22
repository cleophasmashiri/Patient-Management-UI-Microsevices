package com.example.payment;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;
import java.util.List;

@SpringBootApplication
@Controller
public class DemoApplication {

	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}

	@GetMapping("/assets/api/bookings")
  @ResponseBody
  public List<Booking> getBookings() {
    List<Booking> bookings = new ArrayList<>();
    bookings.add(new Booking("Mike", "Jones", "Mike@somedamin.com", "0783454545","Paul Doc", 7899, 1524342535));
    bookings.add(new Booking("Peter", "Smith", "Peter@somedamin.com", "0783454544","Paul Doc", 7800, 1524342535));
    return bookings;
  }

  public class Booking {

    private final String firstname;
    private final String lastname;
    private final String email;
    private final String phone;
    private final String doctor;
    private final double amountDue;
    private final long appointmentDate;

    public Booking() {
      this(null, null, null, null, null, 0, 0);
    }

    public Booking(String firstname, String lastname, String email, String phone, String doctor, double amountDue, long appointmentDate) {
      this.firstname = firstname;
      this.lastname = lastname;
      this.email = email;
      this.phone = phone;
      this.doctor = doctor;
      this.amountDue = amountDue;
      this.appointmentDate = appointmentDate;
    }

    public String getFirstname() {
      return firstname;
    }

    public String getLastname() {
      return lastname;
    }

    public String getEmail() {
      return email;
    }

    public String getPhone() {
      return phone;
    }

    public String getDoctor() {
      return doctor;
    }

    public double getAmountDue() {
      return amountDue;
    }

    public long getAppointmentDate() {
      return appointmentDate;
    }

  }

}
