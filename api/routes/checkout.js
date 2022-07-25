import express from "express";
import { getCheckout } from "../controller/checkoutController.js";
import { checkAuth } from "../middleware/check-auth.js";

const checkoutRoute = express.Router();

checkoutRoute.get('/' , getCheckout)
// checkoutRoute.get('/success' , getCheckout)
// checkoutRoute.get('/cancle' , getCheckout)

export default checkoutRoute