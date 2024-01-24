import jwt from "jsonwebtoken";
import userModel from "./model/dbSchema.js";

const secretkey = "amit!@#$%^&*123456789";

const authMiddleware = async (req, res, next) => {
  try {
    // Get token from request headers
    const token =
      req.headers.authorization && req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Invalid authorization" });
    }

    //   Verify the token
    const decoded = jwt.verify(token, secretkey);

    //check if user exist in database
    const user = await userModel.findById(decode.id);

    if (!user) {
      return res.status(401).json({ message: "Unauthenticated-invalid token" });
    }
    req.user = user;
    next();
  } catch (err) {
    console.error(`Authenticated error: ${err.message}`);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default authMiddleware;
