require('dotenv').config(); // This loads environment variables from .env file into process.env.
console.log("MONGO_URI:", process.env.MONGO_URI); // Add this line to check if MONGO_URI is loaded

const express = require("express"); // Creates a web server
const cors = require("cors"); // This is good for preventing malicious attacks that can be directed to your website. It can also allow requests from different origins.
const mongoose = require("mongoose"); // Connects and manages the MongoDB database

// Creates express.js app
const app = express(); // This is a tool to connect middleware, handle requests, refine routes
//middleware for cors and json
app.use(cors()); // Allows external clients to access the server
app.use(express.json()); // Parses incoming JSON request bodies automatically and creates a JS data structure

mongoose.connect(process.env.MONGO_URI, {
})
    .then(() => {
        const authRoutes = require("./api/routes/auth"); // Update the path to reflect the new structure

        // this is how you use the routes
        app.use("/api/auth", authRoutes);

        app.get("/", (req, res) => {
            res.send("Server is running!");
        });

        const PORT = process.env.PORT || 8080;
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

        console.log("Connected to MongoDB");
    })
    .catch(err => {
        console.log("Error connecting to MongoDB:", err);
        process.exit(1); // Exit the process if the connection fails
    });