import mongoose from "mongoose";

const Schema = mongoose.Schema;

let CheckupRequested = new Schema({
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
    specialization: {   
        type: String
    }

})

export default mongoose.model("CheckupRequestedModel", CheckupRequested, 'checkup_requested')