package com.backend.database.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.backend.database.models.Product;

public interface ProductRepository extends MongoRepository<Product, String>{

}
