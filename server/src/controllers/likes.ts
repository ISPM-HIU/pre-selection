import { Response, Request } from "express"
import { generateToken } from '../services/services'
import model from "../models/likes"

const controller = {
    sendLike: async (req: Request, res: Response) => {
        let { publicationId, userId } = req.body
        try {
            let data = await model.sendLike(parseInt(publicationId), parseInt(userId))

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