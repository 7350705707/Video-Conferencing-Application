import httpStatus from 'http-status';
import crypto from 'crypto';
import {userModel} from '../models/user.model.js';
import meetingModel from '../models/meeting.model.js';

const registerUser = async (req, res) => {
    const {name,username,password} = req.body;
    if (!name || !username || !password) {
        return res.status(httpStatus.BAD_REQUEST).json({ error: "All fields are required" });
    }

    try {
        const existingUser = await userModel.findOne({ username });
        if (existingUser) {
            return res.status(httpStatus.CONFLICT).json({ error: "User already exists" });
        }
        const newUser = await userModel.create({ name, username, password });
        return res.status(httpStatus.CREATED).json({ message: "User registered successfully", user: newUser });
    } catch (error) {
        console.error("Error registering user:", error);
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: "Internal server error" });
    }
};



const loginUser = async (req,res) => {
    const {username, password} = req.body;
    if(!username || !password){
        return res.status(httpStatus.BAD_REQUEST).json({ error: "Username and password are required" });
    }

    try{
        const user = await userModel.findOne({ username });
        if(!user){
            return res.status(httpStatus.UNAUTHORIZED).json({ error: "Invalid username" });
        }
        
        const isMatch = await user.comparePassword(password);
        if(!isMatch){
            return res.status(httpStatus.UNAUTHORIZED).json({ error: "Invalid  password" });
        }

        let token = crypto.randomBytes(16).toString('hex'); // Generate a random token
        user.token = token; // Store the token in the user document
        await user.save(); // Save the updated user document

        return res.status(httpStatus.OK).json({ message: "Login successful", token: user.token });
    } catch (error) {
        console.error("Error logging in user:", error);
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: "Internal server error" });
    }
}


const getUserHistory = async (req, res) => {
    const {token} = req.query;


    try{
        const user = await userModel.findOne({ token });
        const meetings = await meetingModel.find({user_id: user._id});

        res.status(httpStatus.OK).json({ meetings });
        if(!user){
            return res.status(httpStatus.UNAUTHORIZED).json({ error: "Invalid token" });
        }
    } catch (error) {
        console.error("Error fetching user history:", error);
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: "Internal server error" });
    }
}


const addToHistory = async (req, res) => {
    const { token, meetingId } = req.body;

    if (!token || !meetingId) {
        return res.status(httpStatus.BAD_REQUEST).json({ error: "Token and meetingId are required" });
    }

    try {
        const user = await userModel.findOne({ token });
        if (!user) {
            return res.status(httpStatus.UNAUTHORIZED).json({ error: "Invalid token" });
        }

      const newMeeting = await meetingModel(
        {
            meetingCode: meetingId,
            user_id: user._id
        }
      );
        await newMeeting.save();



        return res.status(httpStatus.CREATED).json({ message: "Meeting added to history" });
    } catch (error) {
        console.error("Error adding to user history:", error);
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: "Internal server error" });
    }
}

export { registerUser, loginUser, getUserHistory, addToHistory };