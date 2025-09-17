package com.cimb.wealth;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class CimbWealthApplication {

    public static void main(String[] args) {
        SpringApplication.run(CimbWealthApplication.class, args);
    }
}
