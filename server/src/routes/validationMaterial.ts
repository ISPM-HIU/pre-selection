import express from "express"
import { getMaterials } from "../services/getMaterials";
import { getSuggestion } from "../services/get-suggestion";

const router = express.Router();

router.post(
    "/",
    async (req, res)=>{
        let {
            material
        } = req.body
        
        const getMaterial : any = getMaterials(material);
                
        res.status(200).send({material: getMaterial});
    }
)

export default router;