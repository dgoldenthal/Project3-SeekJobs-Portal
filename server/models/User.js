import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: {
        type: String,
        required: true
    },
    resume: { 
        type: String,
        default: ''
    },
    image: { 
        type: String, 
        required: true 
    }
});

// Remove _id field - let MongoDB handle it automatically
// This allows for better integration with JWT authentication

const User = mongoose.model('User', userSchema);

export default User;