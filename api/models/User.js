import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {  
    type: String,
    required: true,
    unique: true,
  },
  phone:{
    type: String,
    minlength: 11,
    maxlength: 11,
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

const User = mongoose.model("Users", userSchema);
export default User;