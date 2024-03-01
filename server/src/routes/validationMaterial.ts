import express from "express"
import { getMaterials } from "../services/getMaterials";

const router = express.Router();

router.post(
    "/",
    async (req, res)=>{
        let {
            material
        } = req.body
        const getMaterial = getMaterials(material);
        res.status(200).send(getMaterial);
    }
)

export default router;