package com.backend.database.models;

<<<<<<< HEAD
=======
import java.util.ArrayList;

>>>>>>> origin/main
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "users")
public class User {
<<<<<<< HEAD
	//user model for students
	@Id
	private String id;
	private String username;
	private String email;
	private String password; 

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
}




























=======
    @Id
    private String id;
    private String username;
    private ArrayList<StudyArea> favStudyAreas;

    public User(String username, ArrayList<StudyArea> favStudyAreas) {
        this.username = username;
        this.favStudyAreas = favStudyAreas;
    }

    public String getId() {
        return id;
    }

    public String getName() {
        return username;
    }

    public String setName() {
        return username;
    }

    public void addFavStudySpace(StudyArea favStudyAreas) {
        this.favStudyAreas.add(favStudyAreas);
    }

    public void removeFavStudySpace(StudyArea favStudyAreas) {
        this.favStudyAreas.remove(favStudyAreas);
    }

    public ArrayList<StudyArea> getFavStudyAreas() {
        return favStudyAreas;
    }
}
>>>>>>> origin/main
