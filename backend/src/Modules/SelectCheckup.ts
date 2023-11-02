import mongoose from "mongoose";

const Schema = mongoose.Schema;

let SelectCheckup = new Schema({
    name: {
        type: String
    },
    duration: {
        type: Number
    },
    price: {
        type: Number
    },
    specialization: {
        type: String
    }

})

export default mongoose.model("SelectCheckupModel", SelectCheckup, 'checkup')