import express from "express";
import {login_by_user, register_by_user} from '../controller/authController.js'

import multer from "multer";

// storage for multer image
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const { first_name, last_name, email, gender, password, mobile, dob } = req.body;
    if (!(email && password && first_name && last_name && gender && mobile && dob)) return res.status(400).send({ error: "All input is required" })
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, req.body.first_name + '-' + file.originalname)

  }
})
const upload = multer({ storage: storage })

const authRouter = express.Router();

// logging
authRouter.post("/login",login_by_user);

// registering
authRouter.post("/register",upload.single('userImage'),register_by_user);

export default authRouter;
