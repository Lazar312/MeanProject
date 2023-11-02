import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Checkup = new Schema({
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
    }

})

export default mongoose.model("CheckupModel", Checkup, 'checkups')