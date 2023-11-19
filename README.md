# ☀️Radiate: Mental Health Web Application


This is the documentation for a web application which developed for Independent Capstone Project Fullstack Engineering path on Generasi GIGIH 3.0 Program.

In this project, we utilize MERN as the tech stack. Node.js and Express.js are used for building the API(s), MongoDB for the database, and React.js for building the user interfaces. We also use Chakra UI as the component library.


## 📚 Table of Contents
-    Overview
-    Features
-    Technology
-    How to Install and Run the Project
-    How to Run the Container

## 📃 Overview 
Radiate is a web application dedicated to fostering mental well-being by providing users with essential tools to manage and improve their mental health. Empowering individuals to understand, express, and seek support, Radiate combines a mood tracker, journal writing, appointment booking with a licensed psychologist, and a chatbot.

Radiate also provides psychologist with the flexibility to add their schedules, check on the booked appointments, as well as a dashboard to help them organize their work.

Aside from the users and psychologists, Radiate is complemented with an admin-role feature to manage users, psychologists, and the chatbot.

Radiate is developed with the hope of helping people to be concerned and appreciate more about what they feel and what they have in mind, moreover, to encourage people to seek help from professionals for a better mental state and achieve peace.


---

## 🗄️ Features
Radiate has 3 roles that consist of user, psychologist, and admin. Every role has their own features.

* ### 👥 User
* **1. Dashboard**
    * The Dashboard provides users with an overview of their mental health. It prominently displays mood charts, offering a visual representation of mood fluctuations over time. Additionally, it includes a mood log history, allowing users to reflect on their emotional well-being trends.

* **2. Mood Tracker**
    * The Mood Tracker feature empowers users to actively monitor and record their emotional states. Users can log their moods by selecting from a range of options, and they can also note the social and activity circumstances surrounding their mood at a given time. Furthermore, users have the option to add a short description or note to provide context or details about their feelings.
    
* **3. Chatbot**
    * The Chatbot feature is designed to support users in their mental health journey. The chatbot is tailored to address mental health concerns, offering guidance, resources, and a supportive interaction to enhance the user's well-being.

* ### ❤️‍🩹 Psychologist
* **1. Dashboard** 
    * The Dashboard provide psychologists a comprehensive overview of their appointments, schedules, and relevant statistics.
* **2. Schedule**
    * The Schedule feature helps psychologists to efficiently manage their schedules: organizing appointments and availability for counseling sessions.
* **3. Appointment**
    * The Appointment feature enables psychologists to view, schedule, and manage counseling appointments with users.
* **4. Profile**
    * The Profile allows psychologists to maintain and update their professional profiles, including details such as qualifications, expertise, specialties, and other relevant information.

* ### 🛡️ Admin
* **1. Dashboard**
    * The Dashboard for administrators offers an overview of the platform's activity. It displays key metrics such as the number of registered users and psychologists. Additionally, it includes a table that provides details on scheduled appointments between psychologists and users, facilitating efficient management of appointments.

* **2. User Management**
    * The User Management feature allows admins to manage user accounts, overseeing user registration, authentication, and access control.

* **3. Psychologists Management**
    * The Psychologists Management feature allows admins to manage psychologist profiles, ensuring accurate information and overseeing the allocation of counseling resources.

* **4. QNA (Chatbot Management)**
    * The QNA (Chatbot Management) feature allows admins to manage the chatbot's content and responses, ensuring users receive relevant and accurate information.

---
## 🌐 Technology
1. React.js
2. Vite
3. Chakra UI
4. Redux

---

## 🛠️ Installation Steps
1. Clone the Repository
Clone the backend repository using Git:
    ```
    git clone https://github.com/Radiate-Mental-Health-App/front-end.git
    ```
2. Install Dependencies
Navigate to the project directory and install the required dependencies:
    ```
    cd front-end
    npm install
    ```
3. Start the Server
Initiate the server by running the following command:
    ```
    npm run dev
    ```
    The server should be running on http://localhost:5173

---

## 🧰 How to Run the Container
Make sure you have the following installed on your machine:
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
1. Clone the repository:

   ```bash
   git clone https://github.com/Radiate-Mental-Health-App/front-end.git
   cd front-end
2. Create a .env file in the root of the project with the necessary environment variables. Refer to the provided .env.example for guidance.
3. Build and start the Docker containers:
    ```bash
    docker-compose up --build
4. To stop the running containers, press `Ctrl + C` in the terminal where ``docker-compose up`` is running.
5. To remove the containers and associated resources, run:
    ```
    docker-compose down
