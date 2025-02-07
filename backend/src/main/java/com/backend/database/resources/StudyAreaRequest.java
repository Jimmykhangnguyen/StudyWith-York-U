package com.backend.database.resources;

public class StudyAreaRequest {
//this class is used to prevent exposing and to validate StudyArea class
	private String id;
	private String name;
	private boolean chargingOutlets; 
	private int cleanlinessRating; //1-5 scale from student ratings
	private boolean accessible; 
	private String loudness; //"Quiet", "Moderate", "Loud" scale from student ratings

	//Constructors 
	public StudyAreaRequest() {
		
	}
	public StudyAreaRequest(String name, boolean chargingOutlets, int cleanlinessRating, boolean accessible, String loudness) {
		this.name = name;
		this.chargingOutlets = chargingOutlets;
		this.cleanlinessRating = cleanlinessRating;
		this.accessible = accessible;
		this.loudness = loudness;
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
	

	
	public String getLoudness() {
		return loudness;
	}

	

	
	
}