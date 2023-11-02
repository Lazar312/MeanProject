import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Report = new Schema({
    diagnose: {
        type: String
    },
    cause: {
        type: String
    },
    specialization: {
        type: String
    },
    doctor: {
        type: String
    },
    date:{
        type: String
    },
    time: { 
        type: String
    },
    teraphy: {
        type: String
    },
    dateControl: {
        type: String
    },
    patient: {
        type: String
    }
})

export default mongoose.model("ReportsModel", Report, 'reports')