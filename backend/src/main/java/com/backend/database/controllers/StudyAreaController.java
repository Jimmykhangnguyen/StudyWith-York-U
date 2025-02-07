package com.backend.database.controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.backend.database.models.StudyArea;
import com.backend.database.repositories.StudyAreaRepository;
import com.backend.database.resources.StudyAreaRequest;

@RestController
public class StudyAreaController {

	private final StudyAreaRepository studyAreaRepository; 
	
	public StudyAreaController(StudyAreaRepository studyAreaRepository) {
		this.studyAreaRepository = studyAreaRepository;
	}
	
	//get all the study areas of York University
	@GetMapping("/study_areas")
	public ResponseEntity<List<StudyArea>> getAllStudyAreas(){
		return ResponseEntity.ok(this.studyAreaRepository.findAll());
	}
	
	//create a new study area object
	@PostMapping("/study_areas")
	public ResponseEntity<StudyArea> createStudyArea(@RequestBody StudyAreaRequest studyAreaRequest){
		StudyArea studyArea = new StudyArea(         
				studyAreaRequest.getName(),
	            studyAreaRequest.getChargingOutlets(),
	            studyAreaRequest.getCleanlinessRating(),
	            studyAreaRequest.getAccessible(),
	            studyAreaRequest.getLoudness()
	        );
		
		return ResponseEntity.status(201).body(this.studyAreaRepository.save(studyArea));
	}
	
}
