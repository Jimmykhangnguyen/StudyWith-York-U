package com.backend.database.models;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("filter")
public class Filter {
    @Id
    private static List<StudyArea> studyAreas; //study spaces on York campus
    private static List<StudyArea> filterResults;
    private static List<String> filtersChecked;
            
    //Constructors
    public Filter(List<StudyArea> studyAreas) {
        this.studyAreas = studyAreas;
    }
            
    //checks if spaces have charging outlets and displays the ones that do and hides the ones that don't 
    public void checkedHasChargingOutlet() {
            
        filtersChecked.add("ChargingOutlets");
                    
        for (int i = 0; i < studyAreas.size(); i++){
            boolean hasChargingOutlet = studyAreas.get(i).getChargingOutlets();
            if (hasChargingOutlet == true){
                filterResults.add(studyAreas.get(i));
            }
        }
            
        //display StudyArea
        displayStudyArea(filterResults);
            
    }
            
    //checks if spaces have do not have charging outlets and displays spaces that do and don't 
    public void uncheckedHasChargingOutlet() {
                    
        filtersChecked.remove("ChargingOutlets");
                    
        for (int i = 0; i < studyAreas.size(); i++){
            boolean hasChargingOutlet = studyAreas.get(i).getChargingOutlets();
            if (hasChargingOutlet != true){
                for(int j = 0; j < filtersChecked.size(); j++){
                                
                }
            }
        }
            
        //display StudyArea
        displayStudyArea(filterResults);
            
    }
            
    //checks if spaces are clean and displays the ones that are
    public void hasCleanliness() {
                    
        for (int i = 0; i < studyAreas.size(); i++){
            if (studyAreas.get(i).getCleanlinessRating() <= 3) {
                    studyAreas.remove(i);
            }
        }
            
        //display StudyArea
        displayStudyArea(studyAreas);
            
    }
            
    //checks if spaces are accessible and displays the ones that are
    public void checkhasAccessible() {
                    
        for (int i = 0; i < studyAreas.size(); i++){
            boolean hasAccessible = studyAreas.get(i).getAccessible();
            if (hasAccessible != true){
                studyAreas.remove(i);
            }
        }
            
    //display StudyArea
    displayStudyArea(studyAreas);
            
    }
        
    public void unCheckhasAccessible() {
                    
        for (int i = 0; i < studyAreas.size(); i++){
            boolean hasAccessible = studyAreas.get(i).getAccessible();
            if (hasAccessible != true){
                    studyAreas.remove(i);
            }
        }
            
        //display StudyArea
        displayStudyArea(studyAreas);
            
    }
            
    //checks if spaces are quiet and displays the ones that are
    public void hasQuietness() {
                    
        for (int i = 0; i < studyAreas.size(); i++){
            if (studyAreas.get(i).getLoudness() >= 3) {
                studyAreas.remove(i);
            }
        }
            
        //display StudyArea
        displayStudyArea(studyAreas);
            
    }
            
    //checks if spaces are busy and displays the ones that aren't
    public void hasBusyness() {
                    
        for (int i = 0; i < studyAreas.size(); i++){
            if (studyAreas.get(i).getBusiness() >= 3) {
                studyAreas.remove(i);
            }
        }
            
        //display StudyArea
        displayStudyArea(studyAreas);
            
    }
            
    //method that checks all filters
    public static void checkRemainingFilters (int x) {
        
        for(int i = 0; i < filtersChecked.size(); i++){
            switch(filtersChecked.get(i)){
                case "Accessible":
                    if(studyAreas.get(x).getAccessible() == true){
                        filterResults.add(studyAreas.get(x));
                    }
                    break;
            }
        }
    }

    //method that displays study area
    public static void displayStudyArea (List<StudyArea> studyAreas) {

        for (int i = 0; i < studyAreas.size(); i++){
            System.out.println(studyAreas.get(i).getName());
       }

    }

}
