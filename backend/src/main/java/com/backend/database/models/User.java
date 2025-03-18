package com.backend.database.models;

import java.util.ArrayList;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "users")
public class User {
    @Id
    private String id;
    private String username;
    private ArrayList<StudyArea> favStudyAreas;

    public User(String username, ArrayList<StudyArea> favStudyAreas) {
        this.username = username;
        this.favStudyAreas = favStudyAreas;
    }

    public String getId() {
        return id;
    }

    public String getName() {
        return username;
    }

    public String setName() {
        return username;
    }

    public void addFavStudySpace(StudyArea favStudyAreas) {
        this.favStudyAreas.add(favStudyAreas);
    }

    public void removeFavStudySpace(StudyArea favStudyAreas) {
        this.favStudyAreas.remove(favStudyAreas);
    }

    public ArrayList<StudyArea> getFavStudyAreas() {
        return favStudyAreas;
    }
}
