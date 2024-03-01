import { Response, Request } from "express"
import { generateToken } from '../services/services'
import model from "../models/comments"

const controller = {
    sendComment: async (req: Request, res: Response) => {
        let { publicationId, userId, text } = req.body
        try {
            let data = await model.sendComment(parseInt(publicationId), parseInt(userId), text)
            
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
}

export default controller