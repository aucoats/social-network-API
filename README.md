# Social Network API
Example backend for a social networking application.

## Description
Using mongoose and express.js, I have set up the back end functionality for a social networking site. Models for users and thoughts have been updated, and a reaction schema has been added so thoughts can be associated with one another. Users are also able to be associated with other users as friends.

API routes have been constructed and are available for full CRUD functionality for User and Thought models. Routes have also been added such that users can be added to, and removed from, other users' friends array. Additionally, thoughts can be added to, and removed from, other thoughts' reactions array. 

## Usage
Invoke `npm install` to install all required npm packages. If installed successfully, user should be able to run the command `npm start` and interact with the database through Insomnia or other similar software. 

## Deployed 
![Gif of functional API calls through Insomnia](./assets/deployed.gif)

[Walkthrough video with sound](https://drive.google.com/file/d/1s2VDk-q_g3T8opqQBjTKk8aa2exB51U3/view)