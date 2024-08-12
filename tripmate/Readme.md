# Tripmate

Tripmate is a ride-sharing application designed to connect drivers and passengers seamlessly. Users can offer a ride or join an existing one, making travel more convenient and efficient. The application is built with a tech stack that ensures a robust and scalable solution.

## Features

- **User Authentication:** Sign-up and login pages for users authenticated with JWT tokens. Passwords for both users and admin are encrypted using bcrypt.
- **Offer a Ride:** Users can offer a ride, specifying details such as departure location, arrival location, route, stops, vehicle details, and available seats.
- **Join a Ride:** Users can search for and join available rides based on their travel preferences.
- **Ride Display and Booking:** A section displays all rides, and users can book rides listed in the search results for a specific date. After booking, the ride is listed in the ride history.
- **Ride History:** View and manage your booked rides, including a section for messages related to booked rides and another for booking histories.
- **Profile Management:** Manage and edit your login details through a user-friendly profile section.
- **Offered Rides:** View and manage all rides you have offered.
- **Complaint Registration:** Register complaints related to rides directly through the app.
- **Admin Panel:** The admin can log in, delete users violating the rules, and view and analyze complaints given by users.
- **Logout:** A logout button clears cookies stored in the browser and exits the page.


## Tech Stack

- **Frontend:** ReactJS
- **Backend:** Node.js with ExpressJS
- **Database:** MongoDB
- **Containerization:** Docker

## Installation and Running

- **Build and start the Docker containers:**
```
sudo docker compose up --build
```
- **Open your web browser and navigate to**
```
http://localhost:3000
```
**to view the application.**
- **To stop the Docker containers:**
```
sudo docker compose down
```

## Admin Panel

- **Open your web browser and navigate to**

```
http://localhost:3000/admin/login
```

- **Username:** admin
- **Password:** 1234567890

## Screen Record Link
```
https://drive.google.com/file/d/1XhK-IO0kayp9ZCFKCDm_Ausy4fOQ3jJs/view?usp=sharing
```