import mongoose from "mongoose";

const authorsSchema = mongoose.Schema({
    name: String,
    dob: String,
    age: Number
})

const authorsModel = mongoose.model('Authors', authorsSchema);

export default authorsModel;