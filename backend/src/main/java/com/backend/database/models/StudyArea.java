package com.backend.database.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "study_areas")
public class StudyArea {
    //StudyArea will be used to Define how study areas are structured
	@Id
	private String id;
	private String name;
	private boolean chargingOutlets; 
	private int cleanlinessRating; //1-5 scale from student ratings
	private boolean accessible; 
	private int loudness; //1-5 scale from student ratings
	private Location location; //will store the longitude and latitude of each study area

	//Nested static class for location, to access the location  longitude and latitude to avoid creating an instance of location class
	public static class Location {
        private float longitude; 
        private float latitude; 
        
        //constructors
        public Location(float longitude, float latitude) {
        	this.longitude = longitude;
        	this.latitude = latitude;
        }
        
        //Getters and setters for location 
        public float getLongitude() {
        	return longitude;
        }
        
        public void setLongitude(float longitude) {
        	this.longitude = longitude;
        }
        
        public float getLatitude() {
        	return latitude; 
        }
        public void setLatitude(float latitude) {
        	this.latitude = latitude;
        }
    }
	
	
	//Constructors 
	public StudyArea() {
		
	}
	public StudyArea(String name, boolean chargingOutlets, int cleanlinessRating, boolean accessible, int loudness, Location location) {
		this.name = name;
		this.chargingOutlets = chargingOutlets;
		this.cleanlinessRating = cleanlinessRating;
		this.accessible = accessible;
		this.loudness = loudness;
		this.location = location;
	}
	
	//getters and setters
	public String getId() {
		return id;
	}
	
	public void setId(String id) {
		this.id = id;
	}
	

	public String getName() {
		return name;
	}
	
	public void setName(String name) {
		this.name = name;
	}
	
	public boolean getChargingOutlets() {
		return chargingOutlets;
	}
	
	public void setChargingOutlets(boolean chargingOutlets) {
		this.chargingOutlets = chargingOutlets;
	}
	
	public int getCleanlinessRating() {
		return cleanlinessRating;
	}
	
	public void setCleanlinessrating(int cleanlinessRating) {
		this.cleanlinessRating = cleanlinessRating;
	}
	
	public boolean getAccessible() {
		return accessible;
	}
	
	public void setAccessible(boolean accessible) {
		this.accessible = accessible;
	}
	
	public int getLoudness() {
		return loudness;
	}
	
	public void setLoudness(int loudness) {
		this.loudness = loudness;
	}
	
	public Location getLocation() {
		return location;
	}
	
	public void setLocation(Location location) {
		this.location = location;
	}
	
	
	
	
	
}