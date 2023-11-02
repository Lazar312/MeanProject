import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Notification = new Schema({
    text: {
        type: String
    },
    read: {
        type: Boolean
    },
    patient: {
        type: String
    },
    timeMiliseconds: {
        type: Number
    }

})

export default mongoose.model("NotificationModel", Notification, 'notifications')