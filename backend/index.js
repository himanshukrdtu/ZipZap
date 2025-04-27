import express from "express"; // Import the express module for creating the web server
import cookieParser from "cookie-parser"; // Import the cookie-parser middleware for handling cookies
import cors from "cors"; // Import the cors middleware to enable Cross-Origin Resource Sharing (CORS)
import dotenv from "dotenv"; // Import dotenv to load environment variables from a .env file
import connectDB from "./config/db.js"; // Import the database connection function
import userRoute from "./routes/user.routes.js"; // Import the user routes for handling API requests related to users

dotenv.config({}); // Load environment variables from the .env file into `process.env`

const app = express(); // Create an Express application

// middleware
app.use(express.json()); // You're telling Express to automatically convert the incoming JSON data from the request into a JavaScript object.
app.use(express.urlencoded({ extended: true })); // You're telling Express to automatically convert the incoming URL-encoded data (typically from form submissions) into a JavaScript object.
app.use(cookieParser()); // Middleware to parse cookies from incoming requests

// CORS configuration
const corsOptions = {
    origin: 'http://localhost:5173', // Specify the allowed origin (frontend URL)
    credentials: true // Allow cookies to be sent with requests
}

app.use(cors(corsOptions)); // Apply the CORS configuration to the app

const PORT = process.env.PORT || 3000; // Set the port for the server to listen on, default to 3000 if not specified in environment variables

// API routes
app.use("/api/v1/user", userRoute); // Mount the user routes at the "/api/v1/user" endpoint

// Start the server
app.listen(PORT, () => {
    connectDB(); // Connect to the database when the server starts
    console.log(`Server running at port ${PORT}`); // Log a message indicating the server is running and listening
})
