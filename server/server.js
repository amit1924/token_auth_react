import express from "express";
import userModel from "./model/dbSchema.js";
import connectDB from "./model/connectDB.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cors from "cors";

const app = express();
app.use(express.json());
// Use the cors middleware
app.use(cors());

const port = 8000;
const secretkey = "amit!@#$%^&*123456789";

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const hashPassword = await bcrypt.hash(String(password), 10);

    const create = await userModel.create({
      name,
      email,
      password: hashPassword,
    });

    res.status(200).send("Registration successful");
  } catch (err) {
    console.log(`Registration failed: ${err}`);
    res.status(500).send("Registration failed");
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Verify user credentials
    const user = await userModel.findOne({ email });

    if (
      !user ||
      !(await bcrypt.compare(String(password), String(user.password)))
    ) {
      return res.status(403).json({ message: "Invalid user or password" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id, email: user.email }, secretkey, {
      expiresIn: "1h",
    });

    // set the token as a cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
    });

    // Send token to the client
    res.status(200).json({ token });
    console.log("Login successful", token);
  } catch (err) {
    console.log(`Login failed ${err}`);
    res.status(500).json({ message: "Login failed" });
  }
});

const connectDatabase = async () => {
  try {
    await connectDB();
    console.log(`Database connected`);
  } catch (error) {
    console.log(`Can't connect to database: ${error}`);
  }
};

connectDatabase();

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
