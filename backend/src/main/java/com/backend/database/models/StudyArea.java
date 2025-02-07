package com.backend.database.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("study_areas")
public class StudyArea {
    //StudyArea will be used to Define how study areas are structured
	@Id
	private String id;
	private String name;
	private boolean chargingOutlets; 
	private int cleanlinessRating; //1-5 scale from student ratings
	private boolean accessible; 
	private String loudness; //"Quiet", "Moderate", "Loud" scale from student ratings

	//Constructors 
	public StudyArea() {
		
	}
	public StudyArea(String name, boolean chargingOutlets, int cleanlinessRating, boolean accessible, String loudness) {
		this.name = name;
		this.chargingOutlets = chargingOutlets;
		this.cleanlinessRating = cleanlinessRating;
		this.accessible = accessible;
		this.loudness = loudness;
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
	
	public String getLoudness() {
		return loudness;
	}
	
	public void setLoudness(String loudness) {
		this.loudness = loudness;
	}
	
	
	
	
	
	
	
	
	
}