package com.backend.database.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.backend.database.models.User;

public interface UserRepository extends MongoRepository<User, String>{
	User findByEmail(String email);
}
