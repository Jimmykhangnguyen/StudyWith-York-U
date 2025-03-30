package com.backend.database.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "study_areas")
public class StudyArea {
    //StudyArea will be used to Define how study areas are structured
	@Id
	private String id;
	private String name;
	private String address;
	private boolean chargingOutlets; 
	private int cleanlinessRating; //1-5 scale from student ratings
	private boolean accessible; 
	private int loudness; //1-5 scale from student ratings
	private int busyness; // Rating from 0-5 based on time & ratings(coming in ITR2) (0 is closed, 1 is less busy, 5 is very busy)
	private int openingTime; 
	private int closingTime; 
	private Location location; //will store the longitude and latitude of each study area
	private int totalRatingSum;  // Sum of all ratings given
    private int totalRatingCount; // Number of ratings given
	private int totalBusynessCount; 
	private double avgRating; 
	private int totalCleanCount; 
	private int totalLoudCount; 
	private int totalBusynessRating;
	private int totalCleanRating; 
	private int totalLoudnessRating; 

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
	public StudyArea(String name, boolean chargingOutlets, int cleanlinessRating, boolean accessible, int loudness, Location location, int openingTime, int closingTime, int busyness, String address) {
		//if cleanliness and loudness fall out of rating range throw an exception
		if(cleanlinessRating < 1 || cleanlinessRating > 5) {
			throw new IllegalArgumentException("Cleanliness rating must be between 1 and 5");
		}
		
		if(loudness < 1 || loudness > 5) {
			throw new IllegalArgumentException("loudness rating must be between 1 and 5");
		}
		
		this.name = name;
		this.chargingOutlets = chargingOutlets;
		this.cleanlinessRating = cleanlinessRating;
		this.accessible = accessible;
		this.loudness = loudness;
		this.location = location;
		this.openingTime = openingTime;
		this.closingTime = closingTime; 
		this.busyness = busyness; 
		this.address = address; 
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
	
	public int getBusyness(){
		// Calendar cal = Calendar.getInstance(); 
		// int hour = cal.get(Calendar.HOUR_OF_DAY);

		// if (this.loudness <= 3){
		// 	if (hour < this.openingTime){
		// 		this.business = 0; 
		// 	} else if (hour <= 10 && hour < this.closingTime){ // Early morning, before 10 AM
		// 		this.business = 1; 
		// 	} else if (hour <= 13 && hour < this.closingTime){ //Lunchtime, between 11 AM and 1 PM
		// 		this.business = 4;
		// 	} else if (hour <= 18 && hour < this.closingTime){ // Afternoon, between 2 and 6 PM
		// 		this.business = 5; 
		// 	} else if (hour <= 21 && hour < this.closingTime){ // Evening, between 7PM and close
		// 		this.business = 3; 
		// 	} else{
		// 		this.business = 0; 
		// 	}
		// } else {
		// 	if (hour < this.openingTime){
		// 		this.business = 0; 
		// 	} else if (hour <= 10 && hour < this.closingTime){ //Early morning, before 10 AM
		// 		this.business = 2; 
		// 	} else if (hour <= 13 && hour < this.closingTime){ //Lunchtime, between 11 AM and 1 PM
		// 		this.business = 5;
		// 	} else if (hour <= 18 && hour < this.closingTime){ //Afternoon, between 2 and 6 PM
		// 		this.business = 4; 
		// 	} else if (hour <= 21 && hour < this.closingTime){ //Evening, between 7 PM and closing time
		// 		this.business = 2; 
		// 	} else{
		// 		this.business = 0; 
		// }
		// }
		return this.busyness; 
	
	}

	public String getAddress(){
		return this.address; 
	}

	public void setAddress(String address){
		this.address = address; 
	}
	
	public void addUserRating(int rating) {
		if(rating>=1 && rating<=5) {
			this.totalRatingSum += rating;
	        this.totalRatingCount++;
		}
	}
	public void addBusynessRating(int rating){
		if(rating>=1 && rating<=5) {
			this.totalBusynessRating = rating;
			this.totalBusynessCount++; 
	}
}

	public double getAvgBusynessRating(){
		if (this.totalBusynessCount == 0){
			return 1;
		} else {
			return this.totalBusynessRating;
		}
	}

	public void addCleanlinessRating(int rating){
		if(rating>=1 && rating<=5) {
			this.totalCleanRating = rating;
	        this.totalCleanCount++; 
	}
}
    public double getAvgClean(){
		if (totalCleanCount == 0){
			return 1; 
		} else {
			return totalCleanRating; 
		}
}

	public int getBusynessCount(){
		return totalBusynessCount; 
	}
public int getCleanCount(){
	return totalCleanCount; 
}

	public int getTotalRatingSum() {
		return totalRatingSum;
	}

	public int getTotalRatingCount() {
		return totalRatingCount;
	}

	public double getAverageUserRating() {
		if(totalRatingCount==0) {
			return 0.0;
		} else {
			avgRating = (double) totalRatingSum/totalRatingCount; 
			return avgRating;	//calculate avg of ratings as new ones are added by the users 
		}
	}

	public void addLoudRating(int rating){
		if(rating>=1 && rating<=5) {
			this.totalLoudnessRating = rating;
	        this.totalLoudCount++; 
	}
	}

	public int getLoudCount(){
		return totalLoudCount; 
	}

	public double getAvgLoud(){
		if (totalLoudCount == 0){
			return 1; 
		} else{
			return this.totalLoudnessRating;
		}
	}

	public int getTotalBusyRatings(){
		return totalBusynessRating; 
	}

	public int getTotalCleanRatings(){
		return totalCleanRating; 
	}

	public int getTotalLoudRatings(){
		return totalLoudnessRating; 
	}

	public int getOpening(){
		return this.openingTime;
	}

	public int getClosing(){
		return this.closingTime; 
	}
	public void setOpening(int opening){
		this.openingTime = opening; 
	}
	public void setClosing(int closing){
		this.closingTime = closing; 
	}
	
}
