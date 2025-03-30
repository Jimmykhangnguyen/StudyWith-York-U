package com.backend.database.controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.backend.database.models.Product;
import com.backend.database.repositories.ProductRepository;
import com.backend.database.resources.ProductRequest;

@RestController
public class ProductController {
    private final ProductRepository productRepository;
    public ProductController(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }
    @GetMapping("/product")
    public ResponseEntity<List<Product>> getAllProducts(){
        return ResponseEntity.ok(this.productRepository.findAll());
    }
    @PostMapping("/product")
    public ResponseEntity<Product> createProduct(@RequestBody ProductRequest productRequest) {
        Product product = new Product(productRequest.getName(), productRequest.getDescription());

        return ResponseEntity.status(201).body(this.productRepository.save(product));
    }
}
