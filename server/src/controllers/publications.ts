import { Response, Request } from "express"
import { generateToken, uploadFile } from '../services/services'
import model from "../models/publications"
import { send_to_model } from "../services/send-to-model"
const stripe = require('stripe')('sk_test_51OpkT1RuHF7sMfYGjjY3nfwPoJilLItIsbYLlELODliugCY2okhZHpB63Q81w5EwPa6QgFFqpAAID2DyUF8vXFZb00ngSRtDqw');import axios from "axios"

const controller = {
    getAll: async (req: Request, res: Response) => {
        try {
            let data = await model.getAll()

            if (data)
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

            if (data)
                res.status(200).send(data)
            else
                res.status(200).send({})
        }
        catch (error: any) {
            console.log(error)
            res.status(500).send(error.message)
        }
    },
    getForUser: async (req: Request, res: Response) => {
        let userId = parseInt(req.params.userId)

        try {
            let data = await model.getForUser(userId)

            if (data)
                res.status(200).send(data)
            else
                res.status(200).send({})
        }
        catch (error: any) {
            console.log(error)
            res.status(500).send(error.message)
        }
    },
    action: async (req: Request, res: Response) => {
        let { publicationId, userId, actionType } = req.body

        try {
            let data = await model.action(parseInt(publicationId), parseInt(userId), actionType)

            if (data)
                res.status(200).send(data)
            else
                res.status(200).send([])
        }
        catch (error: any) {
            console.log(error)
            res.status(500).send(error.message)
        }
    },
    create: async (req: any, res: any) => {
        let {
            description,
            products,
            product_name,
            type
        } = req.body
        let url_image = null
        let price = parseInt(req.body.price)
        let userId = parseInt(req.body.userId)
        try {
            if (req.files && req.files.image) {
                const src = await uploadFile('./uploads/', req.files.image)
                if (src) {
                    url_image = src
                }
            }

            const product = await stripe.products.create({
                name: product_name,
                images: [url_image]
            });
            const prices = await stripe.prices.create({
                currency: 'mga',
                unit_amount: price,
                recurring: {
                    interval: 'month',
                },
                product_data: {
                    name: product.name,
                },
            });
            const link = await stripe.paymentLinks.create({
                line_items: [
                    {
                        price: prices.id,
                        quantity: 1,
                    },
                ],
            });
            let response = await model.create(
                description,
                products,
                url_image,
                type,
                userId,
                product_name,
                link.url,
                price
            )
            if (response) {
                let allPublication = await model.getAll()
                send_to_model(allPublication)
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
    getBotResponse:  async (req: Request, res: Response) => {
        let question = req.body.question
        console.log(question)
        try { 

            let allPublication = await model.getAll()
            let data = []
            const url = "http://127.0.0.1:8888/chatbot";
            for await (let publication of allPublication) {
                let pub_data = {
                    "id": publication.id,
                    "intents": publication?.description?.split(" "),
                    "publicationId": publication.id,
                    "response": publication.description
                }
                data.push(pub_data)
            }
            try {
                let response = await axios.post(url, {model:data, question}, {
                    headers: {
                        "Content-Type": "application/json",
                    }
                })
                if(response) {
                    res.status(200).send(response.data);
                }
            } catch (error) {
                console.error("Error:", error);
            }
        }
        catch (error: any) {
            console.log(error)
            res.status(500).send(error.message)
        }
    },
}

export default controller