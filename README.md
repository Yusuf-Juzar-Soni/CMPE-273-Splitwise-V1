# CMPE-273-Splitwise-V1
<p align="center">  
  <img  align="center" src="https://github.com/Yusuf-Juzar-Soni/CMPE-273-Splitwise-V1/blob/main/Frontend/src/Components/assets/splitwise_logo.png">
</p>

To gain a better understanding of the inner workings, tools and technologies used to develop a distributed full-stack application/product. 

## What it does
We have simulated various features present in the original web application like
•	A new user would be able to sign up and will be redirected to his dashboard which shows a summary of his transactions (How much he owes, how much he is owed etc.)
•	Existing users can log in and would be redirected to their respective dashboards.
•	Form based validations have been implemented to check proper inputs
•	The user can see a list of groups he is part of, he can also search within that list of groups if he wishes.
•	The left navbar also contains links to the recent activity page where the user can view a history of who has added bills into the group.
•	The same navbar also contains a link to the invite list page which displays a list of groups the user has been invited to. The user can accept the invitation, only   after accepting the invitation will the group be visible in the users group list.
•	The members list also changes based on the invite status.
•	 A member can create a group by selecting all the users registered in the app.
•	A member can settle up the amount he is owed and the amount he owes.
•	A basic profile page is visible that gets the data from the database and displays the data stored in the backend.


## How it was built
•	React JS was used for frontend coding.
•	Node was used as to implement the API layer etc.
•	My SQL was used to implement the databases.
•	Used React Testing Library to write frontend tests and Mocha to write backend tests to see if system functions as expected.
•	Deployed the application on AWS EC2 instances to leverage easy scalability the cloud platform has to offer.
 
## Features
<p align="center">  
  <img  align="center" src="https://github.com/Yusuf-Juzar-Soni/CMPE-273-Splitwise-V2/blob/main/Frontend/src/Components/assets/img21.jpg">
</p>
<p align="center">  
  <img  align="center" src="https://github.com/Yusuf-Juzar-Soni/CMPE-273-Splitwise-V2/blob/main/Frontend/src/Components/assets/img33.jpg">
</p>
<p align="center">  
  <img  align="center" src="https://github.com/Yusuf-Juzar-Soni/CMPE-273-Splitwise-V2/blob/main/Frontend/src/Components/assets/img34.jpg">
</p>
<p align="center">  
  <img  align="center" src="https://github.com/Yusuf-Juzar-Soni/CMPE-273-Splitwise-V2/blob/main/Frontend/src/Components/assets/img44.jpg">
</p>
<p align="center">  
  <img  align="center" src="https://github.com/Yusuf-Juzar-Soni/CMPE-273-Splitwise-V1/blob/main/Frontend/src/Components/assets/splitwise_logo.png">
</p>


## Tools used 
 ReactJS, NodeJS, ExpressJS, Mongo DB, MySQL, HTML5, PassportJS, Apache Kafka, Redis Caching

## Prerequisites
Before running this locally you must have Node,Apache Kafka (version 2.11),Zookeeper,Redis, MySQL,MongoDB etc.setup. 

## Challenges we ran into
Tricky to implement Kafka for such a large scale application. Multiple zookepers would be needed to ensure smooth functioning.
Integration of various modules led to various merge conflicts.
A larger cloud instance (more then t2. micro capacity) would be needed to ensure a decent reponse time from system.

## Future Scope
Multiple image upload functionality while creating post
Ability to create subreddits.
More granularity in community moderations page.


Client folder refers to Front-end of Reddit application.

Server folder refers to Back-end of Reddit application.

Kafka-Server folder refers to Kafka Message Queue related code of Reddit application.

Ports:

Front-end: 3000
Back-end: 3001

- Instructions to Backend Server can be found in README.md inside ./server folder.

Clone the repository to your machine.
* Go into the Backend folder and run command npm install
* After installation completes run command node server.js
* Connection message and listening on port message will be displayed on successful start

* Go to the Frontend folder and run command npm install
* After installation completes run command npm start
* Go to url http://localhost:3000 to view App
