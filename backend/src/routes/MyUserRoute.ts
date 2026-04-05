import express from "express";
import MyUserController from "../controllers/MyUserController.ts";

const router = express.Router();

// /api/my/users
router.post("/", MyUserController.createCurrentUser);

export default router;
