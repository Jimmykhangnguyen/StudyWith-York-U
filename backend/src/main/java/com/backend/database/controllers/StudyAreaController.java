package com.backend.database.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
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
				studyAreaRequest.getBusyness()
	        );
		
		return ResponseEntity.status(201).body(this.studyAreaRepository.save(studyArea));
	}
	
	// create / add repository for user ratings for existing study area objects
	@CrossOrigin(origins = "http://localhost:4200")
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
	@CrossOrigin(origins = "http://localhost:4200")
	@GetMapping("/ratings")
	public ResponseEntity<Map<String, Object>> getRatings(@RequestParam String id) {
		Optional<StudyArea> studyAreaOpt = studyAreaRepository.findById(id);
		if (studyAreaOpt.isPresent()) {
			StudyArea studyArea = studyAreaOpt.get();
			Map<String, Object> response = new HashMap<>();
			response.put("totalRatingSum", studyArea.getTotalRatingSum());
			response.put("totalRatingCount", studyArea.getTotalRatingCount());
			response.put("avgRating", studyArea.getAverageUserRating()); 
			response.put("totalBusynessRating", studyArea.getTotalBusyRatings()); 
			response.put("totalBusynessCount", studyArea.getBusynessCount());
			response.put("avgBusynessRating", studyArea.getAvgBusynessRating()); 
			response.put("totalCleanliness", studyArea.getTotalCleanRatings());
			response.put("totalCleanlinessCount", studyArea.getCleanCount()); 
			response.put("avgCleanRating", studyArea.getAvgClean());
			response.put("totalLoudness", studyArea.getTotalLoudRatings());
			response.put("totalLoudnessCount", studyArea.getLoudCount());
			response.put("avgLoudRating", studyArea.getAvgLoud()); 
			return ResponseEntity.ok(response);
		}
		return ResponseEntity.status(404).body(Map.of("error", "Study area not found."));
	}

	
}
