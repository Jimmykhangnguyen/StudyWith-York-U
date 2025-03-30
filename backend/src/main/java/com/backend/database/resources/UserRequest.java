package com.backend.database.resources;
import com.backend.database.models.StudyArea; 

public class UserRequest {
	private String username;
	private String email;
	private String password;
	private StudyArea[] favourites; 


	//constructors
	public UserRequest() {

	}
	public UserRequest(String username, String email, String password, StudyArea[] favourites) {
		this.username = username;
		this.email = email;
		this.password = password;
		this.favourites = favourites; 
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

	public StudyArea[] favourites(){
		return favourites; 
	}


    
    @Override
    public String toString() {
        return "UserRequest{email='" + email + "password= ****";
    }
    
    

}











