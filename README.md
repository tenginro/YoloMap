# YoloMap

YoloMap is a clone of Yelp plus additional features. You only live once so plan it better with our App. YoloMap is a website to help you make plans within your budget.

Check out [YoloMap](https://yolomap.onrender.com/)

## Index

[MVP Feature List](https://github.com/tenginro/YoloMap/wiki/Features) |
[Database Scheme](https://github.com/tenginro/YoloMap/wiki/Database-Schema-and-Backend-Routes) |
[User Stories](https://github.com/tenginro/YoloMap/wiki/User-Stories) |
[Wire Frames](https://github.com/tenginro/YoloMap/wiki/Wireframes) |

## Technologies Used

<img src="https://img.shields.io/badge/Python-3.9-blue?style=for-the-badge&logo=python&logoColor=white" /><img src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E" /><img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" /><img src="https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white" />
<img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" /><img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" /><img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" /><img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" /><img src="https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white" /><img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" /><img src="https://img.shields.io/badge/Render-41B883?style=for-the-badge&logo=render&logoColor=white)" />

## Splash Page

![Screenshot 2023-06-09 at 13 25 18](https://github.com/tenginro/YoloMap/assets/108156588/56c6a935-dfbe-4643-bc84-7245a5dd5e3d)
![Screenshot 2023-06-09 at 13 25 25](https://github.com/tenginro/YoloMap/assets/108156588/38ee1da2-d0eb-4acb-b710-c74a575d7f57)


## Places

![Screenshot 2023-04-24 at 14 15 21](https://user-images.githubusercontent.com/108156588/234081585-c0c237ba-d851-4c3e-824d-cf57dd1c4fd7.png)

## Place Detail Page with products, reviews
![Screenshot 2023-06-09 at 13 26 20](https://github.com/tenginro/YoloMap/assets/108156588/dbc19c63-a782-4ddb-9c05-a4adb194624b)
![Screenshot 2023-06-09 at 13 26 28](https://github.com/tenginro/YoloMap/assets/108156588/81565f59-aa79-46c7-824d-cebd9245fdc5)



## Getting started

1. Clone this repository:

   `https://github.com/tenginro/YoloMap.git`

2. Install dependencies into the Backed and the Frontend by making a terminal for each one and then run the following:

   - `pipenv install -r requirements.txt && pip install email_validator && pipenv install boto3 ` in the root folder
   - `npm install` in the react-app folder

3. Create a **.env** file using the **.envexample** provided

4. Set up your database with information from your .env and then run the following to create your database, migrate, and seed:

   - `flask db upgrade`
   - `flask seed all`

5. Start the app for both backend and frontend using:

   - `flask run` in the root folder
   - `npm start` in the react-app folder

6. Now you can use the Demo User or Create an account

## Amazon Web Services S3

- For setting up your AWS refer to this [guide](https://github.com/jdrichardsappacad/aws-s3-pern-demo)

---

# Features

## Places

- Users can create a Place
- Users can read/view other Places
- Users can update their Places
- Users can delete their Places

## Products

- Users can create Products on Places
- users can read/view all of the Products on a Place
- Users can delete their Product(s) on a Place

## Cart

Logged-in Users can

- Add a product to their cart
- Remove a product from their cart
- Read all of their cartItems

## AWS

Logged-in Users can

- Upload an images of their profile cover picture to AWS S3
- Upload an images of their place cover picture to AWS S3
- Upload an images of their product cover picture to AWS S3

## Google Maps Api

Logged in Users can

- Locate places with Google Maps Api
