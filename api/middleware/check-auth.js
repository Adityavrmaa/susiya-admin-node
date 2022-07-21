import jwt from "jsonwebtoken";

export const checkAuth = (req, res, next) => {
  try {
    const decoded = jwt.verify(req.body.token, process.env.TOKEN_KEY);
    req.userData = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Auth failed!" });
  }
};
