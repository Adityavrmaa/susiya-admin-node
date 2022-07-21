import jwt from 'jsonwebtoken'
import bcryptjs from 'bcryptjs'
import User from "../models/register.js";

//loging controller
export const login_by_user = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!(email && password)) return res.status(400).send({ error: "All input is required" });

    const user = await User.findOne({ email });
    if (user && (await bcryptjs.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
      );

      // user
      res.status(200).json({ user, token })
    } else res.status(400).send({ error: 'user not found please login' });
  } catch (error) {
    res.status(400).send({ error });
  }
}

//register controller
export const register_by_user = async (req, res, next) => {
  console.log(req.body)
  try {
    const { first_name, last_name, email, gender, password, mobile, dob } = req.body;
    const payloadData = req.body
    payloadData.userImage = req.file.path

    // Validate user input
    if (!(email && password && first_name && last_name && gender && mobile && dob)) return res.status(400).send({ error: "All input is required" })

    const oldUser = await User.findOne({ email });
    if (oldUser) return res.status(400).send({ message: "User Already Exist. Please Login" })

    const encryptedPassword = await bcryptjs.hash(password, 10);
    payloadData.password = encryptedPassword

    const data = new User(payloadData);
    const sub = await data.save();

    res.status(200).send({ message: "Data submitted successfully", data: sub });
  } catch (error) {
    res.status(400).json({
      error
    });
  }
}
