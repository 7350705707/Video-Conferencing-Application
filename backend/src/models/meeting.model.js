import { Schema, model } from "mongoose";


const meetingSchema = new Schema({
    user_id: {
      type:String,
        required: true
    },
    meetingCode: {
        type: String,
        required: true,
        unique: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
});


const meetingModel = model("Meeting", meetingSchema);


export default meetingModel;