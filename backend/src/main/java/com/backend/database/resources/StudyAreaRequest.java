package com.backend.database.resources;

public class StudyAreaRequest {
	// this class is used to prevent exposing and to validate StudyArea class
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
	private int totalCleanRating;
	private int totalLoudRating;

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
	public StudyAreaRequest(String id, String name, String address, boolean chargingOutlets, boolean accessible, Location location, int openingTime, int closingTime) {
		this.id = id;
		this.name = name;
		this.address = address;
		this.chargingOutlets = chargingOutlets;
		this.accessible = accessible;
		this.location = location;
		this.openingTime = openingTime;
		this.closingTime = closingTime;
	}
	
	//getters
	public String getId() {
		return id;
	}

	public String getName() {
		return name;
	}

	public String getAddress() {
		return address; 
	}	
	
	public boolean getChargingOutlets() {
		return chargingOutlets;
	}
	
	public boolean getAccessible() {
		return accessible;
	}
	
	public Location getLocation() {
		return location;
	}

	public int getOpening() {
		return this.openingTime;
	}
	
	public int getClosing() {
		return this.closingTime; 
	}
	
	public int getTotalRating() {
		return totalRating;
	}
	
	public int getTotalRatingCount() {
		return totalRatingCount;
	}
	
	public int getTotalBusyRatings() {
		return totalBusyRating;
	}

	public int getTotalCleanRatings() {
		return totalCleanRating;
	}

	public int getTotalLoudRatings() {
		return totalLoudRating; 
	}
}	
