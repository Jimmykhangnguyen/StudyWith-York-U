package com.backend.database.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.backend.database.models.StudyArea;

public interface StudyAreaRepository extends MongoRepository<StudyArea, String>{

}

