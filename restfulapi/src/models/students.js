const mongoose = require("mongoose");
const validator = require("validator");



// define the Schema
const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3
    },
    email: {
        type: String,
        required: true,
        unique: [true, "Email Id already present."],
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid Email");
            }
        }
    },
    phone:{
        type:Number,
        min:11,
        required:true,
        unique:true
    },
    address:{
        type:String,
        required:true,
    }
})

//create a new collection
const Student = new mongoose.model('Student', studentSchema);

module.exports = Student;