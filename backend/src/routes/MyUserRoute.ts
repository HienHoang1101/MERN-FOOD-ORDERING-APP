import express from "express";
import MyUserController from "../controllers/MyUserController.ts";
import { jwtCheck, jwtParse } from "../middleware/auth.ts";
import { validateMyUserRequest } from "../middleware/validation.ts";

const router = express.Router();

// /api/my/users
router.get("/", jwtCheck, jwtParse, MyUserController.getCurrentUser);
router.post("/", jwtCheck, MyUserController.createCurrentUser);
router.put(
  "/",
  jwtCheck,
  jwtParse,
  validateMyUserRequest,
  MyUserController.updateCurrentUser,
);

export default router;
