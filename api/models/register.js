import mongoose from "mongoose";

const UserRegisterSchema = new mongoose.Schema({
    first_name: {
    type: String,
    required: [true, 'first_name required']
  },
  last_name: {
    type: String,
    required: [true, 'last_name required']
  },
  dob: {
    type: Date,
    required: [true, 'dob required']
  },
  gender: {
    type: String,
    required: [true, 'gender required']
  },
  email: {
    type: String,
    required: [true, 'email required'],
    unique: true,
  },
  mobile: {
    type: Number,
    required: [true, 'mobile required']
  },
  password: {
    type: String,
    required: [true, 'password required']
  },
  userImage: {
    type: String,
    required: [true, 'userImage required']
  },
});

const User = mongoose.model("UserRegisterSchema", UserRegisterSchema);

export default User;