import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Korisnik = new Schema({
    ImageBuffer: {
        type: Buffer
    },
    imageName: {
        type: String
    },
    username: {
        type: String
    },
    password: {
        type: String
    },
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    phone: {
        type: String
    },
    email: {
        type: String
    },
    type: {
        type: String
    },
    lotNum:{
        type: Number
    },
    Specialization: {
        type: String
    },
    WorksAt: {
        type: String
    },
    adress: {
        type: String
    }

})

export default mongoose.model("KorisnikModel", Korisnik, 'korisnik')