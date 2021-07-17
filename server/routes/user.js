import express from "express";
const router = express.Router();

import { signinController, signupController } from "../controllers/user.js";

router.post("/signin", signinController);
router.post("/signup", signupController);

export default router;