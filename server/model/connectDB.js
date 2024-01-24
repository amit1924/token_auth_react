import mongoose from "mongoose";

const URL = "mongodb://localhost:27017";

const connectDB = () => {
  try {
    const connect = mongoose.connect(URL);
    console.log("Connection to database is successful");
  } catch {
    console.log("cant connect to database");
  }
};

export default connectDB;
