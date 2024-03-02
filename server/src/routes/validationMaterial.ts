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
        var suggestions = [] as any
        
        const getMaterial : any = getMaterials(material);
        
        if(getMaterial) {
            for await (let materiel of getMaterial) {
                let sug = await getSuggestion(materiel.materiel)
                suggestions.push(sug)
            }
        }
        console.log(suggestions);
        
        res.status(200).send({material: getMaterial, suggestions});
    }
)

export default router;