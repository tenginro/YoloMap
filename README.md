# YoloMap

YoloMap is a clone of Yelp + additional features. You only live once so plan it better. YoloMap is a website to help you make plans within your budget.

Check out [YoloMap](https://yolomap.onrender.com/)

## Index

[MVP Feature List](https://github.com/tenginro/YoloMap/wiki/Features) |
[Database Scheme](https://github.com/tenginro/YoloMap/wiki/Database-Schema-and-Backend-Routes) |
[User Stories](https://github.com/tenginro/YoloMap/wiki/User-Stories) |
[Wire Frames](https://github.com/tenginro/YoloMap/wiki/Wireframes) |

## Technologies Used

<img src="https://img.shields.io/badge/Python-3.9-blue?style=for-the-badge&logo=python&logoColor=white" /><img src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E" /><img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" /><img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" /><img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" /><img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" /><img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" /><img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" /><img src="https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white" /><img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" /><img src="https://img.shields.io/badge/Render-41B883?style=for-the-badge&logo=render&logoColor=white)" />

## Splash Page
![Screenshot 2023-04-24 at 14 03 17](https://user-images.githubusercontent.com/108156588/234081442-4e9c39f9-28bc-4651-ad65-eec34990c0e0.png)
![Screenshot 2023-04-24 at 14 14 58](https://user-images.githubusercontent.com/108156588/234081514-9b2ee038-9c9c-44dc-83d6-1fa174f22b77.png)

## Places
![Screenshot 2023-04-24 at 14 15 21](https://user-images.githubusercontent.com/108156588/234081585-c0c237ba-d851-4c3e-824d-cf57dd1c4fd7.png)

## Place Detail Page with products
![Screenshot 2023-04-24 at 14 15 46](https://user-images.githubusercontent.com/108156588/234081658-6bb78c01-6e31-40c6-b3c5-42cb94f960e9.png)

## Getting started

1. Clone this repository:

   `https://github.com/tenginro/YoloMap.git`

2. Install denpendencies into the Backed and the Frontend by making a terminal for each one and then run the following:

   - `pipenv install -r requirements.txt && pip install email_validator && pipenv install boto3 ` in the root folder
   - `npm install` in the react-app folder

3. Create a **.env** file using the **.envexample** provided

4. Set up your database with information from your .env and then run the following to create your database, migrate, and seed:

   - `npx dotenv sequelize db:create`
   - `npx dotenv sequelize db:migrate`
   - `npx dotenv sequelize db:seed:all`

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

## Future Features

### Google Maps Api

Logged in Users can

- Locate places with Google Maps Api
