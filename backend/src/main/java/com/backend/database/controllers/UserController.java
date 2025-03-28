package com.backend.database.controllers;

import org.mindrot.jbcrypt.BCrypt;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.backend.database.models.User;
import com.backend.database.repositories.UserRepository;
import com.backend.database.resources.UserRequest;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200") // Allow POST request from front end 
public class UserController {

    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(this.userRepository.findAll());
    }

    @PostMapping("/register")
    public ResponseEntity<User> registerUser(@RequestBody UserRequest userRequest) {
        String password = userRequest.getPassword();
        String email = userRequest.getEmail();

        if (!isPasswordValid(password) || !isEmailUnique(email)) {
            return ResponseEntity.badRequest().body(null);
        }

        // Password is Hased using BCrypt, if password is valid and email is unique 
        String hashedPassword = BCrypt.hashpw(password, BCrypt.gensalt());

        User user = new User(
                userRequest.getUsername(),
                userRequest.getEmail(),
                hashedPassword
        );

        return ResponseEntity.status(201).body(this.userRepository.save(user));
    }

    // Login user will check if password matches the hashed password
    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@RequestBody UserRequest userRequest) {
        System.out.println("Received login data: " + userRequest);
        User user = userRepository.findByEmail(userRequest.getEmail());

        if (user != null) {
            System.out.println("Stored hashed password: " + user.getPassword());
            boolean passwordMatch = BCrypt.checkpw(userRequest.getPassword(), user.getPassword());
            System.out.println("Password match result: " + passwordMatch);

            if (passwordMatch) {
                return ResponseEntity.ok("Login successful");
            } else {
                return ResponseEntity.status(401).body("Invalid credentials");
            }
        } else {
            return ResponseEntity.status(401).body("User not found");
        }
    }
    
    //end-point to check for email uniqueness
    @GetMapping("/check-email")
    public ResponseEntity<Boolean> checkEmail(@RequestParam String email) {
        return ResponseEntity.ok(isEmailUnique(email));
    }

    // Password must be 8 - 20 chars long, one capital, and at least one number.
    private boolean isPasswordValid(String password) {
        return password.length() >= 8 &&
               password.length() <= 20 &&
               password.matches(".*[A-Z].*") && 
               password.matches(".*[0-9].*");
    }
    
 // Email must be unique and include a @ and .com or .ca
    private boolean isEmailUnique(String email) {
    	  if (!email.matches(".*[@].*") || (!email.matches(".*\\.com$") && !email.matches(".*\\.ca$"))) {
    	        return false;  
    	    }
    	  User userExist = userRepository.findByEmail(email);
		return userExist == null; 
        
    }
}
