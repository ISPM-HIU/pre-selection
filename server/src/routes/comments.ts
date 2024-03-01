import express from "express"
import { isValid } from "../../midlleware/middleware"
import controller from "../controllers/comments"

const router = express.Router()

router.post("/", controller.sendComment)

export default router