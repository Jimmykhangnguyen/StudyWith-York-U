package com.backend.database.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.backend.database.models.User;
import com.backend.database.repositories.UserRepository;
import com.backend.database.resources.UserRequest;

@RestController
public class UserController {

	private final UserRepository userRepository; 

	public UserController(UserRepository userRepository) {
		this.userRepository = userRepository;
	}

	//get all the User stored in database
	@GetMapping("/users")
	public ResponseEntity<List<User>> getAllUsers(){
		return ResponseEntity.ok(this.userRepository.findAll());
	}

	//create a User area object
	@PostMapping("/register")
	public ResponseEntity<User> registerUser(@RequestBody UserRequest userRequest){
		User user = new User(  
				userRequest.getUsername(),
				userRequest.getEmail(),
				userRequest.getPassword()
				);

		return ResponseEntity.status(201).body(this.userRepository.save(user));
	}



}