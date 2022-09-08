import express from "express"
import {
    login, register, logout
} from "../controllers/authenticationController.js"
import validateToken from "../middleware/validateToken.js";

const router = express.Router()

router.post("/login", login)
router.post("/register", register)
router.post("/logout", validateToken, logout)

export default router
