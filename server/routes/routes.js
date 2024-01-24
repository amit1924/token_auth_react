// routes.js
import express from "express";
import authMiddleware from "./AuthMiddleware.js";

const router = express.Router();

// Protected route that requires authentication
router.get("/dashboard", authMiddleware, (req, res) => {
  res.json({ message: "You have access to the dashboard!", user: req.user });
});

export default router;
