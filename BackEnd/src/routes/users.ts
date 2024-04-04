import express from "express";
import * as userController from "../contollers/users"
import {RequestAuth} from "../Middleware/auth";

const router = express.Router();

router.get("/",RequestAuth,  userController.GetLoggedInUser)

router.post("/signUp", userController.signUp)

router.post("/login", userController.Login)

router.post("/logout", userController.LogOut)

export default router