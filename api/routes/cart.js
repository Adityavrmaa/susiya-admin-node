import express from "express";
import { add_into_cart, delete_from_cart, get_all_cart_data } from "../controller/cartController.js";

const cartRoute = express.Router();

//  total number of item in cart
cartRoute.get("/" , get_all_cart_data);

//  added item in cart
cartRoute.post("/", add_into_cart);

//  remove item from cart
cartRoute.delete("/:itemId", delete_from_cart);

//  total number of item in cart


export default cartRoute;
