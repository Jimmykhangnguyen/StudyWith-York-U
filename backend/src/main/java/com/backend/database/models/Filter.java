package com.backend.database.models;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("filter")
public class Filter {
    @Id
	private List<StudyArea> studyAreas; //study spaces on York campus
    private static List<StudyArea> filterResults; //List of study areas to display after filter configurations
    private static List<String> filtersChecked; //List of filters selected
            
    //Constructors
    public Filter(List<StudyArea> studyAreas) {
        this.studyAreas = studyAreas;
        filterResults = new ArrayList<>();
        filtersChecked = new ArrayList<>();
    }
            
    //checks if spaces have charging outlets and displays the ones that do and hides the ones that don't 
    //(with consideration of other filters)
    public void checkHasChargingOutlet() {
            
        filtersChecked.add("ChargingOutlets"); //adds to the list of filters selected
                    
        for (int i = 0; i < studyAreas.size(); i++){ //goes through each study area
        	
        	checkRemainingFiltersAdd(studyAreas.get(i));
        }
            
      //display Study Areas with current filters
        displayStudyArea(filterResults);
            
    }
            
    //checks if spaces do not have charging outlets and displays spaces that do AND don't 
    //(with consideration of other filters)
    public void uncheckHasChargingOutlet() {
                    
        filtersChecked.remove("ChargingOutlets");
                    
        for (int i = 0; i < studyAreas.size(); i++){
        	checkRemainingFiltersRemove(studyAreas.get(i));
        }
            
        //display Study Areas with current filters
        displayStudyArea(filterResults);
            
    }
            
    //checks if spaces are clean and displays the ones that are
    //(with consideration of other filters)
    public void checkHasCleanliness() {

        filtersChecked.add("Cleanliness");
                    
        for (int i = 0; i < studyAreas.size(); i++){
            checkRemainingFiltersAdd(studyAreas.get(i));
        }
            
        //display Study Areas with current filters
        displayStudyArea(filterResults);
            
    }
            
    //checks if spaces do not have cleanliness and displays spaces that do AND don't 
    //(with consideration of other filters)
    public void uncheckHasCleanliness() {

        filtersChecked.remove("Cleanliness");
                    
        for (int i = 0; i < studyAreas.size(); i++){
            if (studyAreas.get(i).getCleanlinessRating() <= 3) {
                checkRemainingFiltersRemove(studyAreas.get(i));
            }
        }
            
        //display Study Areas with current filters
        displayStudyArea(filterResults);
            
    }

    //checks if spaces are accessible and displays the ones that are
    //(with consideration of other filters)
    public void checkHasAccessible() {
                    
        filtersChecked.add("Accessible");
        
        for (int i = 0; i < studyAreas.size(); i++){
            checkRemainingFiltersAdd(studyAreas.get(i));
            
        }
            
        //display Study Areas with current filters
        displayStudyArea(filterResults);
            
    }
    
    //checks if spaces are not accessible and displays the ones that are AND aren't
    //(with consideration of other filters)
    public void uncheckHasAccessible() {
                    
        filtersChecked.remove("Accessible");
                    
        for (int i = 0; i < studyAreas.size(); i++){
            if (studyAreas.get(i).getAccessible() != true) {
                checkRemainingFiltersRemove(studyAreas.get(i));
            }
        }
            
      //display Study Areas with current filters
        displayStudyArea(filterResults);
            
    }
            
    //checks if spaces are quiet and displays the ones that are
    //(with consideration of other filters)
    public void checkHasQuietness() {
        
        filtersChecked.add("Quietness");
                    
        for (int i = 0; i < studyAreas.size(); i++){
         
        	checkRemainingFiltersAdd(studyAreas.get(i));
            
        }
        
        //display Study Areas with current filters
        displayStudyArea(filterResults);
            
    }
    
    //checks if spaces are not quiet and displays the ones that are AND aren't
    //(with consideration of other filters)
    public void uncheckHasQuietness() {
                    
        filtersChecked.remove("Quietness");
                    
        for (int i = 0; i < studyAreas.size(); i++){
            if (studyAreas.get(i).getLoudness() >= 3) {
                checkRemainingFiltersRemove(studyAreas.get(i));
            }
        }
            
        //display Study Areas with current filters
        displayStudyArea(filterResults);
            
    }
            
    //checks if spaces aren't busy and displays them
    //(with consideration of other filters)
    public void checkHasLessBusy() {

        filtersChecked.add("LessBusy");

        for (int i = 0; i < studyAreas.size(); i++){
            if (studyAreas.get(i).getBusiness() < 3) {
                checkRemainingFiltersAdd(studyAreas.get(i));
            }
        }
            
        //display Study Areas with current filters
        displayStudyArea(filterResults);
            
    }
    
    //checks if spaces are busy and displays the ones that are AND aren't
    //(with consideration of other filters)
    public void uncheckHasLessBusy() {

        filtersChecked.remove("LessBusy");

        for (int i = 0; i < studyAreas.size(); i++){
            if (studyAreas.get(i).getBusiness() >= 3) {
                checkRemainingFiltersRemove(studyAreas.get(i));
            }
        }
            
        //display Study Areas with current filters
        displayStudyArea(filterResults);
            
    }
    
    public void checkFilter() {
    	 for (int i = 0; i < filtersChecked.size(); i++){
             System.out.println(filtersChecked.get(i));
        }
    }
            
    //method that checks all filters and removes selected filters to be ready for display
    public static void checkRemainingFiltersRemove (StudyArea studyArea) {

        boolean remove = true;
        int tracker = 0;
        
        for(int i = 0; i < filtersChecked.size(); i++){
            switch(filtersChecked.get(i)){
                case "Accessible":
                    if(studyArea.getAccessible() == true){
                        remove = false;
                        break; 
                    } else {
                    	tracker++;
                       break; 
                    }
                case "Cleanliness":
                if(studyArea.getCleanlinessRating() >= 3){
                    remove = false;
                    break; 
                } else {
                	tracker++;
                   break; 
                }
                case "ChargingOutlets":
                if(studyArea.getChargingOutlets() == true){
                    remove = false;
                    break; 
                } else {
                	tracker++;
                   break; 
                }
                case "Quietness":
                if(studyArea.getLoudness() <= 3){
                    remove = false;
                    break; 
                } else {
                	tracker++;
                   break; 
                }
                case "LessBusy":
                if(studyArea.getBusiness() <= 3){
                    remove = false;
                    break; 
                } else {
                	tracker++;
                   break; 
                }
            }
            
            if (tracker > 0) {
            	remove = true;
            }
        }

        if (remove == true && filterResults.contains(studyArea)) {
            filterResults.remove(studyArea);
        } else if (remove == false && !filterResults.contains(studyArea)){
        	filterResults.add(studyArea);
        } else if (filtersChecked.isEmpty()){
        	filterResults.add(studyArea);
        }
    }
    
    //method that checks all filters and adds selected filters to be ready for display
    public static void checkRemainingFiltersAdd (StudyArea studyArea) {

        boolean add = true;
        
        for(int i = 0; i < filtersChecked.size(); i++){
            switch(filtersChecked.get(i)){
                case "Accessible":
                    if(studyArea.getAccessible() != true){
                        add = false;
                        break; 
                    } else {
                       break; 
                    }
                case "Cleanliness":
                    if(studyArea.getCleanlinessRating() <= 3){
                        add = false;
                        break; 
                    } else {
                        break; 
                    }
                case "ChargingOutlets":
                    if(studyArea.getChargingOutlets() != true){
                        add = false;
                        break; 
                    } else {
                        break; 
                    }
                case "Quietness":
                    if(studyArea.getLoudness() >= 3){
                        add = false;
                        break; 
                    } else {
                        break; 
                    }
                case "LessBusy":
                    if(studyArea.getBusiness() >= 3){
                        add = false;
                        break; 
                    } else {
                        break; 
                    }
            }
        }

        if (add == true && !filterResults.contains(studyArea)) {
        	filterResults.add(studyArea);
        } else if (add == false && filterResults.contains(studyArea)) {
        	filterResults.remove(studyArea);
        } else if (filtersChecked.isEmpty()){
        	filterResults.remove(studyArea);
        }
    }

    //method that displays study area
    public static void displayStudyArea (List<StudyArea> studyAreas) {

        for (int i = 0; i < studyAreas.size(); i++){
            System.out.println(studyAreas.get(i).getName());
       }
       if (filtersChecked.isEmpty()) {
    	   filterResults.clear();
       }

    }

}
