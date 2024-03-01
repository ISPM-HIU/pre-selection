import express from "express"
import { getEntities } from "../services/nlp-processing"
import { ValidationRequest, ValidationResponse } from "../utils/validation_object"
import { isValidate } from "../services/validationService"

// Router for the validation prompt
const router = express.Router()

router.post(
    "/",
    async (req,res)=>{
        const body = req.body as ValidationRequest
        const materials_list = getEntities(body.prompt)
        const response = isValidate(materials_list);
        res.json({
            validation:response.validation?"Success":"Failure",
            materials:materials_list,
            message:response.message
        } as ValidationResponse)
    }
)

export default router