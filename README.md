# Study With York U!
A simple guide to study spaces on YorkU Keele Campus!

By: Team 6

Emma Accardi,
Kimberly Bonilla,
Jericho Marc Mendoza,
Ngoc Nguyen,
Ashley Thong

# Starting the Project
1. Download the project zip file and open in IDE
2. Run backend folder as Spring Boot project
3. Run frontend through your terminal as an Angular project using the following commands: npm install, then ng serve --open

# Implementation requirements
Frontend - Angular
Backend - Java Spring Boot
Databse - MongoDB
---------------------
Our Group choose to use MongoDB a no SQL Database. Reason: Easier to implement using the Spring framework. It's connectors allow us to preform database operations like GET, POST, and DELETE with ease using MongoDB. MongoDB it also much more flexible in handling structured or semi structured data, which allowed us to add or modify the schema with ease (like adding busyness or locations). Also, JSON structure works much easier with Angular. 

Mac
1. brew tap mongodb/brew
brew install mongodb-community@7.0
Windows
1. follow the link: https://www.mongodb.com/try/download/community
2. Open backend in eclipse or VSCode or any prefered IDE
3. If working in eclipse insatll Spring Tools in Eclpise Market Place
4. Provide email to group so that we can invite to mongoDB project
5. right click on project and run as Spring Boot App

# App Features
1. Study Space Information: Get information about each study space on campus. Includes details such as charging outlet availability, loudness level, business level, opening/closing time and more!
2. Map of Campus with Directions: Find the nearest study space to you and find out how to walk there.
3. Filter study areas based on your preferences: Get a list of which spaces have any feature you like.

# Major Changes in Iteration 2
1. Able to get the directions to work when a study Area was clicked on. Shows how to get there from the location a user clicks on to the study area location. 
2. Had to change the design of filtering process using drop down menu instead of buttons.
3. Added a ratings form. 
4. Changed the data schema for study Area collection in database. Modified to inlcude ratings and busyness.
5. Juinits were added to backend components: Busyness, locations, studyarea
6. Added more locations to the database.
7. Changed the GUI for displaying study areas and filtering.
8. Structure of the source code stayed the same.
9. New or revised big stories and detailed user stories are updated in the planning document. 

# Architecture

![layered_architecture](https://github.com/user-attachments/assets/1789f06d-3d31-4361-93e6-f4966e8227c4)



