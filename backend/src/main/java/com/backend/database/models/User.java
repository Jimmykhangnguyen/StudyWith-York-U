 package com.backend.database.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "users")
public class User {
	//user model for students
	@Id
	private String id;
	private String username;
	private String email;
	private String password; 
	private String[] favourites = new String[10]; 
	private int numFavourites = 0;
  
	//Constructors
	public User() {
    
	}
  
	public User(String username, String email, String password) {
		this.username = username;
		this.email = email;
		this.password = password;
	}
  
	//getters and setters
	public String getID() {
		return id;
	}

	public void setID(String id) {
		this.id = id;
	}

	public String getUserName() {
		return username;
	}

	public void setUserName(String username) {
		this.username = username;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}
  
	public void setPassword(String password) {
		this.password = password;
	}
  
	public String[] getFavourites() {
		return favourites; 
	}

	public int getNumFavourites() {
		return numFavourites;
	}
  
	public void addFavourite(String id) {
		favourites[numFavourites] = id;
		numFavourites++; 
	}

	public void resetFavourites() {
		favourites = new String[10]; 
		numFavourites = 0;
	}
}
