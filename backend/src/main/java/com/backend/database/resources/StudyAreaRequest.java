package com.backend.database.resources;

import com.backend.database.resources.StudyAreaRequest.Location;

public class StudyAreaRequest {
//this class is used to prevent exposing and to validate StudyArea class
	private String id;
	private String name;
	private boolean chargingOutlets; 
	private int cleanlinessRating; //1-5 scale from student ratings
	private boolean accessible; 
	private int loudness; //1-5 scale from student ratings
	private Location location;
	private int openingTime;
	private int closingTime; 
	private int business; 
	private int totalRatingSum;  // Sum of all ratings given
	private int totalRatingCount; // Number of ratings given

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
	public StudyAreaRequest(String id, String name, boolean chargingOutlets, int cleanlinessRating, boolean accessible, int loudness, Location location, int openingTime, int closingTime, int business, int totalRatingSum, int totalRatingCount) {
		this.id = id;
		this.name = name;
		this.chargingOutlets = chargingOutlets;
		this.cleanlinessRating = cleanlinessRating;
		this.accessible = accessible;
		this.loudness = loudness;
		this.location = location;
		this.openingTime = openingTime;
		this.closingTime = closingTime; 
		this.business = business; 
		this.totalRatingSum = totalRatingSum;
		this.totalRatingCount = totalRatingCount;
	}
	
	//getters

	public String getName() {
		return name;
	}
	
	public boolean getChargingOutlets() {
		return chargingOutlets;
	}

	public String getId() {
		return id;
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

	public int getOpening(){
		return this.openingTime;
	}
	
	public int getClosing(){
		return this.closingTime; 
	}

	public int getBusiness(){
		return this.business; 
	}
	
	public int getTotalRatingSum() {
		return totalRatingSum;
	}
	
	public int getTotalRatingCount() {
		return totalRatingCount;
	}	
}