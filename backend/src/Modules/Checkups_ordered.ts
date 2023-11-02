import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Checkup_ordered = new Schema({
    name: {
        type: String
    },
    duration: {
        type: Number
    },
    price: {
        type: Number
    },
    doctor: {
        type: String
    },
    date: {
        type: String
    },
    time: {
        type: String
    },
    patient: {
        type: String
    }

})

export default mongoose.model("Checkups_opderedModule", Checkup_ordered, 'checkups_ordered')