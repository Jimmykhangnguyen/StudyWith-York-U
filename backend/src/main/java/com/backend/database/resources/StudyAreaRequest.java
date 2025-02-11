package com.backend.database.resources;

public class StudyAreaRequest {
//this class is used to prevent exposing and to validate StudyArea class
	private String id;
	private String name;
	private boolean chargingOutlets; 
	private int cleanlinessRating; //1-5 scale from student ratings
	private boolean accessible; 
	private int loudness; //1-5 scale from student ratings
	private Location location;

	//Location static nested class for longitude and latitude request
	public static class Location {
        private float longitude; 
        private float latitude; 
        
        //constructors
        public Location(float longitude, float latitude) {
        	this.longitude = longitude;
        	this.latitude = latitude;
        }
        
        //Getters for location 
        public float getLongitude() {
        	return longitude;
        }
        
        public float getLatitude() {
        	return latitude; 
        }
      
    }
	
	//Constructors 
	public StudyAreaRequest() {
		
	}
	public StudyAreaRequest(String name, boolean chargingOutlets, int cleanlinessRating, boolean accessible, int loudness, Location location) {
		this.name = name;
		this.chargingOutlets = chargingOutlets;
		this.cleanlinessRating = cleanlinessRating;
		this.accessible = accessible;
		this.loudness = loudness;
		this.location = location;
	}
	
	//getters

	public String getName() {
		return name;
	}
	
	public boolean getChargingOutlets() {
		return chargingOutlets;
	}

	
	public int getCleanlinessRating() {
		return cleanlinessRating;
	}

	
	public boolean getAccessible() {
		return accessible;
	}
	
	public int getLoudness() {
		return loudness;
	}
	
	public Location getLocation() {
		return location;
	}

	

	
	
}