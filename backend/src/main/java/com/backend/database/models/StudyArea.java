package com.backend.database.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "study_areas")
public class StudyArea {
    //StudyArea will be used to define how study areas are structured
	@Id
	private String id;
	private String name;
	private String address;
	private boolean chargingOutlets;
	private boolean accessible;
	private int openingTime;
	private int closingTime;
	private Location location; //will store the longitude and latitude of each study area
	private int totalRating;
    private int totalRatingCount;
	private int totalBusyRating;
	private int totalBusyCount;
	private int totalCleanRating;
	private int totalCleanCount;
	private int totalLoudRating;
	private int totalLoudCount;

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

	public StudyArea(String name, String address, boolean chargingOutlets, boolean accessible, Location location, int openingTime, int closingTime) {
		this.name = name;
		this.address = address;
		this.chargingOutlets = chargingOutlets;
		this.accessible = accessible;
		this.location = location;
		this.openingTime = openingTime;
		this.closingTime = closingTime;
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

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}
	
	public boolean getChargingOutlets() {
		return chargingOutlets;
	}
	
	public void setChargingOutlets(boolean chargingOutlets) {
		this.chargingOutlets = chargingOutlets;
	}
	
	public boolean getAccessible() {
		return accessible;
	}
	
	public void setAccessible(boolean accessible) {
		this.accessible = accessible;
	}
	
	public Location getLocation() {
		return location;
	}
	
	public void setLocation(Location location) {
		this.location = location;
	}

	public int getOpening() {
		return openingTime;
	}

	public void setOpening(int opening) {
		this.openingTime = opening;
	}

	public int getClosing() {
		return closingTime;
	}
	
	public void setClosing(int closing) {
		this.closingTime = closing;
	}

	public int getTotalRating() {
		return totalRating;
	}

	public int getTotalRatingCount() {
		return totalRatingCount;
	}
	
	public void addRating(int rating) {
		if (rating >= 1 && rating <= 5) {
			this.totalRating = rating;
	        this.totalRatingCount++;
		}
	}

	public int getTotalBusyRating() {
		return totalBusyRating;
	}

	public int getTotalBusyCount() {
		return totalBusyCount;
	}

	public void addBusyRating(int rating) {
		if (rating >= 1 && rating <= 5) {
			this.totalBusyRating = rating;
			this.totalBusyCount++;
		}
	}

	public int getTotalCleanRating() {
		return totalCleanRating;
	}

	public int getTotalCleanCount() {
		return totalCleanCount;
	}

	public void addCleanRating(int rating) {
		if (rating >= 1 && rating <= 5) {
			this.totalCleanRating = rating;
	        this.totalCleanCount++;
		}
	}

	public int getTotalLoudRating() {
		return totalLoudRating;
	}

	public int getTotalLoudCount() {
		return totalLoudCount;
	}

	public void addLoudRating(int rating) {
		if (rating >= 1 && rating <= 5) {
			this.totalLoudRating += rating;
	        this.totalLoudCount++; 
		}
	}

	public void resetRatings() {
		totalRating = 0;
    	totalRatingCount = 0;
		totalBusyRating = 0;
		totalBusyCount = 0;
		totalCleanRating = 0;
		totalCleanCount = 0;
		totalLoudRating = 0;
		totalLoudCount = 0;
	}
}
