import express from "express"
import { isValid } from "../../midlleware/middleware"
import controller from "../controllers/likes"

const router = express.Router()

router.post("/", controller.sendLike)

export default router