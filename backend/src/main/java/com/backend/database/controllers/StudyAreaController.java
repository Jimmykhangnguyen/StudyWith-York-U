package com.backend.database.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
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
	            studyAreaRequest.getLoudness(),
			   new StudyArea.Location(studyAreaRequest.getLocation().getLongitude(), studyAreaRequest.getLocation().getLatitude()),
	            studyAreaRequest.getOpening(),
				studyAreaRequest.getClosing(),
				studyAreaRequest.getBusiness()
	        );
		
		return ResponseEntity.status(201).body(this.studyAreaRepository.save(studyArea));
	}
	
	// create/ add repostitory for user ratings for existing study area objects 
    @PostMapping("/ratings")
    public ResponseEntity<String> rateStudyArea(@RequestParam String id, @RequestParam int rating) {
		if (rating < 1 || rating > 5) {
			return ResponseEntity.status(400).body("Rating must be between 1 and 5.");
		}

        Optional<StudyArea> studyAreaOpt = studyAreaRepository.findById(id);

        if (studyAreaOpt.isPresent()) {
            StudyArea studyArea = studyAreaOpt.get();
            studyArea.addUserRating(rating); 
            studyAreaRepository.save(studyArea);

            return ResponseEntity.status(201).body("Rating submitted successfully.");
        }

        return ResponseEntity.status(404).body("Study area not found.");
    }
	
	// Getting ratings for study areas
	@GetMapping("/ratings")
	public ResponseEntity<String> getRatings(@RequestParam String id) {
		Optional<StudyArea> studyAreaOpt = studyAreaRepository.findById(id);
		if (studyAreaOpt.isPresent()) {
			StudyArea studyArea = studyAreaOpt.get();
			return ResponseEntity.ok("The total rating for this study area is: " + studyArea.getTotalRatingSum() + " and the total number of ratings is: " + studyArea.getTotalRatingCount());
		}
		return ResponseEntity.status(404).body("Study area not found.");
	}
	
}
