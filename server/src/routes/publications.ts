import express from "express"
import controller from "../controllers/publications"

const router = express.Router()

router.get("/", controller.getAll)
router.get("/:id", controller.getOne)
router.get("/for-user/:userId", controller.getForUser)
router.post("/", controller.create)
router.post("/action", controller.action)
router.delete("/:id", controller.delete)

export default router