import { Response, Request } from "express"
import { generateToken, uploadFile } from '../services/services'
import model from "../models/publications"

const controller = {
    getAll: async (req: Request, res: Response) => {
        try {
            let data = await model.getAll()

            if(data)
                res.status(200).send(data)
            else
                res.status(200).send([])
        }
        catch (error: any) {
            console.log(error)
            res.status(500).send(error.message)
        }
    },
    getOne: async (req: Request, res: Response) => {
        let id = parseInt(req.params.id)

        try { 
            let data = await model.getOne(id)
           
            if(data)
                res.status(200).send(data)
            else
                res.status(200).send({})
        }
        catch (error: any) {
            console.log(error)
            res.status(500).send(error.message)
        }
    },
    getForUser:  async (req: Request, res: Response) => {
        let userId = parseInt(req.params.userId)

        try { 
            let data = await model.getForUser(userId)
           
            if(data)
                res.status(200).send(data)
            else
                res.status(200).send({})
        }
        catch (error: any) {
            console.log(error)
            res.status(500).send(error.message)
        }
    },
    action:  async (req: Request, res: Response) => {
        let { publicationId, userId, actionType } = req.body

        try { 
            let data = await model.action(publicationId, userId, actionType)

            if(data)
                res.status(200).send(data)
            else
                res.status(200).send([])
        }
        catch (error: any) {
            console.log(error)
            res.status(500).send(error.message)
        }
    },
    create: async (req: any, res: Response) => {
        let { 
            description,
            products,
            product_name,
            type    
        } = req.body
        let url_image = null

        try {

            if(req.files && req.files.image && req.files.image.name){
                const src = await uploadFile('./uploads/',req.files.image)
                if(src){
                    url_image = src
                }
            }

            let userId = parseInt(req.body.userId)
            let response = await model.create(
                description,
                products,
                url_image,
                type,
                userId,
                product_name
            )
            if(response) {
                res.status(200).send(response)
            }
            else res.status(500).send("Creation failed")
            
        }
        catch (error: any) {
            console.log(error)
            res.status(500).send(error)
        }
    },
    delete: async (req: Request, res: Response) => {
        let id = parseInt(req.params.id)

        try { 
            let data = await model.delete(id)
            res.status(200).send(data)
        }
        catch (error: any) {
            console.log(error)
            res.status(500).send(error.message)
        }
    },
}

export default controller