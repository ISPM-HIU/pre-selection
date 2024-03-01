import { Response, Request } from "express"
import { generateToken } from '../services/services'
import model from "../models/notifications"
import publicationModel from "../models/publications"

const controller = {
    getAll: async (req: Request, res: Response) => {
        const userId = parseInt(req.body.userId)
        try {
            let allPub = await publicationModel.getForUser(userId)
            if(allPub) {
                let data : any = []

                for await (let pub of allPub) {
                    let notif = await model.getAll(pub.id)
                    data.push(...notif)
                }

                if(data.length)
                    res.status(200).send(data)
                else
                    res.status(200).send([])
            }
            else 
                res.status(500).send("Erreur")
        }
        catch (error: any) {
            console.log(error)
            res.status(500).send(error.message)
        }
    },
}

export default controller