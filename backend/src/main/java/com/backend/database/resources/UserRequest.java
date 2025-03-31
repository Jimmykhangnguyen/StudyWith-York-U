package com.backend.database.resources;

public class UserRequest {
	private String username;
	private String email;
	private String password;
	private String[] favourites;
	private int numFavourites = 0;

	//constructors
	public UserRequest() {
		
	}
  
	public UserRequest(String username, String email, String password, String[] favourites) {
		this.username = username;
		this.email = email;
		this.password = password;
	}

	//getters and setter without id for encapsulation
	public String getUsername() {
        return username;
  }

	public String getEmail() {
        return email;
  }

  public String getPassword() {
      return password;
  }
  
	public String[] getFavourites(){
		return favourites; 
	}

	public int getNumFavourites() {
		return numFavourites;
	}
  
	public void addFavourite(String id) {
		favourites[numFavourites] = id;
		numFavourites++; 
	}
  
  	@Override
  	public String toString() {
      return "UserRequest{email='" + email + "password= ****";
	}
}
