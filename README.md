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
Database - MongoDB
---------------------
Our Group choose to use MongoDB a non-SQL Database. Reason: Easier to implement using the Spring framework. MongoDB's connectors allow us to perform database operations like GET, POST, and DELETE with ease. MongoDB is also much more flexible in handling structured or semi structured data, which allowed us to add or modify the schema with ease (like adding busyness or locations). Also, JSON structure works much easier with Angular. 

Mac
1. brew tap MongoDB/brew
brew install mongodb-community@7.0

Windows
1. Follow the link: https://www.mongodb.com/try/download/community
2. Open backend in Eclipse or VSCode or any prefered IDE
3. If working in Eclipse, install Spring Tools in Eclipse MarketPlace
4. Provide email to group so that we can invite to MongoDB project
5. Right click on project and run as Spring Boot App

# App Features
1. Study Space Information: Get information about each study space on campus. Includes details such as charging outlet availability, loudness level, busyness level, opening/closing time and more!
2. Map of Campus with Directions:  Find the nearest study space to you and find out how to walk there.
3. Filter study areas based on your preferences: Get a list of which spaces have any feature you like.

# Major Changes in Iteration 2
1. Able to get walking directions when a study Area was clicked on. Shows how to get there from the location a user clicks on to the study area location. 
2. Changed the design of filtering process using drop down menu instead of buttons.
3. Junit tests were done for backend components: busyness, locations, studyarea
4. Added more locations to the database.
5. Changed the GUI for displaying study areas and filtering.
6. Structure of the source code stayed the same.
7. New or revised big stories and detailed user stories are updated in the planning document.

# Major Changes in Iteration 3
1. Added more user stories.
2. View specfic addresses of study areas.
3. User can now rate the study spaces based on their expience, ""loudness", "cleaniness" and "busyness".
4. Navigation bar was added to help user easily navigate throught the website.
5. Implemented login and register pages with secure authentification.
6. Narrow down the study areas based on their name using the search bar or their different catergories using the drop down menu.
7. Real time update for study areas "loudness", "cleaniness" and "busyness".
8. Added addresses for study areas to better track location
9. Overhaul for GUI, added more pages to the site
10. Minor fixes for study area locations.


# Architecture

![layered_architecture](https://github.com/user-attachments/assets/1789f06d-3d31-4361-93e6-f4966e8227c4)

# UML Class Diagram
<img width="710" alt="Screenshot 2025-03-07 at 10 29 27 PM" src="https://github.com/user-attachments/assets/f616be4b-7d45-4d05-bf8b-b2abc04bb0a2" />

# MOCKUPS
![IMG_6C74C525F2B1-1](https://github.com/user-attachments/assets/81c8f28a-93f0-4225-b9c0-1628c01d4646)

![IMG_F55A9E3054D0-1](https://github.com/user-attachments/assets/9a99dcee-a557-48a1-93ff-b1aa2d7a86ac)

![IMG_E3C46AC460C4-1](https://github.com/user-attachments/assets/d6420c23-aca7-4e8c-a748-13b6a880c866)


