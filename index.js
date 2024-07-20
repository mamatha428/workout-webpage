// require('dotenv').config();
const express = require("express");
const app = express();
const mysql = require("mysql2");
const session = require('express-session');
const nodemailer = require('nodemailer');
const port = 8080;
const path = require("path");

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true
}));

let userData = [
    {
        id: 1,
        name: 'john doe',
        workouts: [
            { type: 'running', minutes: 30 },
            { type: 'cycling', minutes: 60 }
        ]
    },
    {
        id: 2,
        name: 'jane smith',
        workouts: [
            { type: 'running', minutes: 30 },
            { type: 'swimming', minutes: 60 }
        ]
    },
    {
        id: 3,
        name: 'mike johnson',
        workouts: [
            { type: 'yoga', minutes: 30 },
            { type: 'cycling', minutes: 60 }
        ]
    }
];

app.get("/home", (req, res) => {
    res.render("home.ejs", { userData });
});

app.get("/form", (req, res) => {
    res.render("form.ejs");
});

app.post("/addWorkout", (req, res) => {
    const { username, workoutType, workoutMinutes } = req.body;
    
    // Find user by username or create a new one if it doesn't exist
    let user = userData.find(u => u.name.toLowerCase() === username.toLowerCase());
    
    if (!user) {
        user = {
            id: userData.length + 1,
            name: username,
            workouts: []
        };
        userData.push(user);
    }
    
    // Add the new workout to the user's workouts array
    user.workouts.push({
        type: workoutType,
        minutes: parseInt(workoutMinutes)
    });
    
    res.redirect("/home");
});

app.listen(port, () => {
    console.log("listening to the port:8080");
});
