import mongoose from "mongoose";

const UserCart = new mongoose.Schema({
  cartItem: {
    type: Object,
    required: [true, "item must be required"],
  },
});

const userCart = mongoose.model("UserCart", UserCart);

export default userCart;