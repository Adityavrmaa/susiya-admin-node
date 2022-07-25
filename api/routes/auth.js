import express from "express";
import { login_by_user, register_by_user } from '../controller/authController.js'
import multer from "multer";
import { check, body } from 'express-validator'

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
authRouter.post("/login", [
  check('email')
    .isEmail()
    .withMessage('please provide a valid email address')
    .custom((value, { req }) => {
      if (value === 'test@test.com') {
        throw new Error('This email is forbidden');
      }
      return true;
    })
  , body('password').isLength({ min: 5 }).withMessage('password must be at least 5 characters')
], login_by_user);

// registering
authRouter.post("/register", upload.single('userImage'), register_by_user);

export default authRouter;