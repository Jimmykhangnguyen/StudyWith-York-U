package com.backend.database.resources;

public class ProductRequest {
    
    private String name;
    private String description;

    public ProductRequest() {
    }

    public ProductRequest(String name, String description) {
        this.name = name;
        this.description = description;
    }

    public String getName() {
        return this.name;
    }

    public String getDescription() {
        return this.description;
    }
}
