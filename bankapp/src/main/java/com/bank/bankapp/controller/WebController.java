package com.bank.bankapp.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller // This is crucial for serving HTML views
public class WebController {

    @GetMapping("/") // Maps the root URL to the "home" view
    public String home() {
        return "home"; // This tells Spring to look for 'home.html'
    }

    @GetMapping("/login") // Maps /login to the "login" view
    public String login() {
        return "login"; // This tells Spring to look for 'login.html'
    }
}