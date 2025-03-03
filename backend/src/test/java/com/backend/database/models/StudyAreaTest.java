package com.backend.database.models;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class StudyAreaTest {

	private StudyArea studyArea;

	@BeforeEach
	void setUp() {
		//Before each test, make a example study area instance
		//used random values and location 
		StudyArea.Location location = new StudyArea.Location(43.77361615981798f, -79.50184694563765f);
		studyArea = new StudyArea(
				"Example_Location", true, 3, false, 4, location, 9, 20 );
		
	}

	@Test
	void testName() {
		//test name is correct 
		assertEquals("Example_Location", studyArea.getName(), "Not the right study area name!");
	}

	@Test
	void testCharghingOutlets() {
		//test charging outlet is correct and test invalid input
		assertTrue(studyArea.getChargingOutlets(), "Study Area should have charging outlets!");
	}

	@Test
	void testCleanlinessRating() {
		//test Cleanliness Rating is in correct range (1-5) 
		assertTrue(studyArea.getCleanlinessRating() >= 1 && studyArea.getCleanlinessRating() <= 5, "Cleaniness rating should be in range 1-5!");
		//throw exception when valid is out of range
		assertThrows(IllegalArgumentException.class, () -> new StudyArea(
				"Example_Location", true, -1, false, 4, studyArea.getLocation(), 9, 20 ));
	}

	@Test
	void testAccessible() {
		// test accessible is false (for test example)
		assertFalse(studyArea.getAccessible(), "Study area should be accessible.");
	}

	@Test
	void testLoudness() {
		// test if loudness rating is within range (1-5)
		assertTrue(studyArea.getLoudness() >= 1 && studyArea.getLoudness() <= 5, 
				"Loudness should be between 1 and 5.");
	   //throw exception when valid is out of range 
		assertThrows(IllegalArgumentException.class, () -> new StudyArea(
				"Example_Location", true, 3, false, 6, studyArea.getLocation(), 9, 20 ));
	}

	@Test
	void testLocationLongitude() {
		// test location's longitude is correct
		assertEquals(43.77361615981798f, studyArea.getLocation().getLongitude(), "Longitude should be 12.34");
	}

	@Test
	void testLocationLatitude() {
		// test if location's latitude is correct
		assertEquals(-79.50184694563765f, studyArea.getLocation().getLatitude(), "Latitude should be 56.78");
	}

}
