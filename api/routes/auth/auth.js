import express from "express";
import authController from "../../controller/authController.js"

const authRouter = express.Router();

// logging
authRouter.post("/login",authController.loginContoller);

// registering
authRouter.post("/register",authController.registerContoller);

export default authRouter;
