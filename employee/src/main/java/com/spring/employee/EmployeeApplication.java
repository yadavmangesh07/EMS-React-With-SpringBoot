package com.spring.employee;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@CrossOrigin(origins = "http://localhost:5173") // CORS for frontend
@SpringBootApplication
public class EmployeeApplication {

    // Logger for the application
    private static final Logger logger = LoggerFactory.getLogger(EmployeeApplication.class);

    public static void main(String[] args) {
        SpringApplication.run(EmployeeApplication.class, args);
        logger.info("Employee application started successfully!");
    }
}
