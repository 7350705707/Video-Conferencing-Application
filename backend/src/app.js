import express from 'express';
import { createServer } from 'http';   
import dotenv from 'dotenv';
dotenv.config(); 
import cors from "cors"
import mongoose from 'mongoose';
import { connectToSocket } from './controlllers/socket.Manager.js';
import userRouter from './routes/user.route.js'; // Assuming you have a user route


const app = express();
const server = createServer(app);

const io = connectToSocket(server);


app.set("port", process.env.PORT || 8000);
app.use(cors());

app.use(express.json({limit:"40kb"}));
app.use(express.urlencoded({limit:"40kb", extended: true}));
app.use('/api/v1/users', userRouter);









app.use((req, res) => {
    res.status(404).json({ message: 'URL not found' });
});


// Handle socket connection
   io.on("connection", (socket) => {
        console.log(`New client connected: ${socket.id}`);

        socket.on("disconnect", () => {
            console.log(`Client disconnected: ${socket.id}`);
        });
    });
// Start the server and connect to MongoDB
// This is the main entry point of the application

const start = async () => {
    const connectionDb = await mongoose.connect(process.env.DB_URI);

    console.log("Connected to MongoDB");


    server.listen(app.get("port"), () => {
        console.log('Server is running on port', app.get("port"));
    });
}


start().catch((err) => {
    console.error('Error starting the server:', err);
});