import express from "express";

const cartRoute = express.Router();

//  total number of item in cart
cartRoute.get("/" , async (req, res, next) => {
  try {
    const data = await userCart.find();
    return res
      .status(200)
      .send({ message: "User Already Exist. Please Login", data });
  } catch (error) {
    return res.status(400).send({ error: error.error });
  }
});

//  added item in cart
cartRoute.post("/", async (req, res, next) => {
  try {
    const { id } = req.body.cartItem;
    const cartitem = await userCart.find();
    const exst = cartitem.filter((exp) => exp.cartItem.id === id);
    if (exst.length)
      return res
        .status(400)
        .send({ message: "Item Already Exist." });
    else {
      const data = new userCart(req.body);
      const dataSave = await data.save();
      return res
        .status(200)
        .send({ message: "Item added in cart successfully", data: dataSave });
    }
  } catch (error) {
    return res.status(400).send({ error });
  }
});

//  remove item from cart
cartRoute.delete("/:itemId", async (req, res, next) => {
    try {
      const cartitem = await userCart.remove({_id:req.params.itemId});
        return res.status(200).send({ message: "Item removed in cart successfully", data: dataSave });
    } catch (error) {
      return res.status(400).send({ error });
    }
  });

//  total number of item in cart
cartRoute.patch("/incriment:id", async (req, res, next) => {
    try {
      const data = await userCart.find();
      return res
        .status(200)
        .send({ message: "User Already Exist. Please Login", data });
    } catch (error) {
      return res.status(400).send({ error: error.error });
    }
  });

export default cartRoute;
