import mongoose from 'mongoose';

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
  phone: {
    type: String,
    minlength: 11,
    maxlength: 11,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
});

const User = mongoose.model('Users', userSchema);
export default User;
