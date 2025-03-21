package com.backend.database.resources;

public class UserRequest {
	private String username;
	private String email;
	private String password;


	//constructors
	public UserRequest() {

	}
	public UserRequest(String username, String email, String password) {
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
    
    @Override
    public String toString() {
        return "UserRequest{email='" + email + "password= ****";
    }
    
    

}











