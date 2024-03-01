import express from "express"
import { isValid } from "../../midlleware/middleware"
import controller from "../controllers/notifications"

const router = express.Router()

router.get("/:userId", controller.getAll)

export default router