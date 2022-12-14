import userCart from "../models/cartSchema.js";
const ITEM_PER_PAGE = 2
//get cart all item controller
export const get_all_cart_data = async (req, res, next) => {
  try {
    const page = req.query.page
    console.log('page', page)

    const data = await userCart.find().skip((page - 1) * ITEM_PER_PAGE).limit(ITEM_PER_PAGE);
    return res
      .status(200)
      .send({ message: "User Already Exist. Please Login", data });
  } catch (error) {
    return res.status(400).send({ error: error.error });
  }
}

//add item in to cart controller
export const add_into_cart = async (req, res, next) => {
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
}

// delete_from_cart
export const delete_from_cart = async (req, res, next) => {
  try {
    const cartitem = await userCart.remove({ _id: req.params.itemId });
    return res.status(200).send({ message: "Item removed in cart successfully", data: cartitem });
  } catch (error) {
    return res.status(400).send({ error });
  }
}