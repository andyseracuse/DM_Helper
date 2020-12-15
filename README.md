# Raje Tech Brick And Click Product Info

>When running a tabletop game, a common problem that presents itself to the game master is management of NPC's. What did their voices sound like?  What group did they each belong to? Were they with, against, or nuetral to the party?  Keeping this all in your head can become troublesome if not impossible! 
>
>DM Helper aims to solve this problem.  This is a full stack application with firebase authentication that helps tabletop game masters manage their NPC's with an intuative, and beautiful UI. Users can add multiple campaigns, NPC groups, and NPC's.  Each NPC can store pictures, character sheets, voice information, and more!

## Demo

http://thedmhelper.com

## Coming Soon
- HTTPS 
- mobile compatibility 

## Demo

- Campaigns

![Imgur](https://i.imgur.com/QrIS1m0.gif)

- Groups

![Imgur](https://i.imgur.com/BftCXhG.gif)

- Members

![Imgur](https://i.imgur.com/IeFYt6j.gif)

- Sign Up

![Imgur](https://i.imgur.com/9uGmDvT.gif)

- Login and Forgot Password

![Imgur](https://i.imgur.com/hA9a9bV.gif)

## Tech Frameworks Used
#### Built With
- react
- reactstrap
- material UI
- react router
- node.js
- express
- mongoDB
- mongoose
- react hook form
- firebase
#### Compiled and Transpiled with
- webpack 
- babel
## Required Dependancies
- mongoDB
- node.js
## Installation
1. clone this repo
2. run npm install in the root directory
3. create a new file in the root directory called keys.js
4. build the following object in the keys.js file
```
module.exports = {
  REACT_APP_FIREBASE_API_KEY: <apiKey>,
  REACT_APP_FIREBASE_AUTH_DOMAIN: <authDomain>,
  REACT_APP_FIREBASE_DATABASE_URL: <projectId>,
  REACT_APP_FIREBASE_PROJECT_ID: "dm-helper-5fadb",
  REACT_APP_FIREBASE_STORAGE_BUCKET: "dm-helper-5fadb.appspot.com",
  REACT_APP_FIREBASE_MESSAGING_SENDER_ID: <storageBucket>,
  REACT_APP_FIREBASE_APP_ID: <messagingSenderId>,
  db_connection_string: <dbConnectionString>,
  baseURL:<baseURL>
}
```
5. create a nev firebase project and enable email and password authentication (see docs here https://firebase.google.com/docs/projects/learn-more)
6. add a new app to your project using the web-app option
7. copy firebase config info into corresponding values in the keys.js file
8. set the value of db_connection_string in the keys.js file to 'mongodb://localhost:27017/DM_Helper' (or your own MongoDB connection string)
9. set the value of baseURL to 'http://localhost:3000'
10. run npm start to start the server on port 3000
11. navigate to http://localhost:3000/index.html to view the DM Helper!

## License
[MIT](https://choosealicense.com/licenses/mit/)
