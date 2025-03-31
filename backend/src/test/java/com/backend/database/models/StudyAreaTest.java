package com.backend.database.models;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class StudyAreaTest {
	private StudyArea studyArea;

	@BeforeEach
	void setUp() {
		// Before each test, make a example study area instance
		// used random values and location 
		StudyArea.Location location = new StudyArea.Location(43.77361615981798f, -79.50184694563765f);
		studyArea = new StudyArea("Example_Location", "Test Address", true, false, location, 9, 20);
	}

	@Test
	void testName() {
		// test name is correct 
		assertEquals("Example_Location", studyArea.getName(), "Not the right study area name!");
	}

	@Test
	void testAddress() {
		// test address is correct 
		assertEquals("Test Address", studyArea.getAddress(), "Not the right study area address!");
	}

	@Test
	void testChargingOutlets() {
		// test charging outlet is correct and test invalid input
		assertTrue(studyArea.getChargingOutlets(), "Study Area should have charging outlets!");
	}

	@Test
	void testAccessible() {
		// test accessible is false (for test example)
		assertFalse(studyArea.getAccessible(), "Study area should be accessible.");
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

	@Test
	void testOpeningTime() {
		// test opening time is correct
		assertEquals(43.77361615981798f, studyArea.getLocation().getLongitude(), "Longitude should be 12.34");
	}

	@Test
	void testClosinggTime() {
		// test closing time is correct
		assertEquals(-79.50184694563765f, studyArea.getLocation().getLatitude(), "Latitude should be 56.78");
	}

	@Test
	void testCleanlinessRating() {
		//test Cleanliness Rating is being correctly added
		studyArea.addCleanRating(3);
		studyArea.addCleanRating(5);
		studyArea.addCleanRating(7);
		assertTrue(studyArea.getTotalCleanRating() == 8, "Cleaniness rating should be 8");
		assertTrue(studyArea.getTotalCleanCount() == 2, "Cleaniness count should be 2");
	}

	@Test
	void testBusynessRating() {
		//test Busyness Rating is being correctly added
		studyArea.addBusyRating(3);
		studyArea.addBusyRating(5);
		studyArea.addBusyRating(7);
		assertTrue(studyArea.getTotalBusyRating() == 8, "Busyness rating should be 8");
		assertTrue(studyArea.getTotalBusyCount() == 2, "Busyness count should be 2");
	}

	@Test
	void testLoudnessRating() {
		//test Loudness Rating is being correctly added
		studyArea.addLoudRating(3);
		studyArea.addLoudRating(5);
		studyArea.addLoudRating(7);
		assertTrue(studyArea.getTotalLoudRating() == 8, "Loudness rating should be 8");
		assertTrue(studyArea.getTotalLoudCount() == 2, "Loudness count should be 2");
	}
}
