import express, { response } from "express";
import { config, parse } from "dotenv";
import { WhatsAppParams } from "./types/WhatsAppParams";
import { sendMessage } from "./actions/action";
import { WhatsAppResponse } from "./types/WhatsAppResponse";
import axios from "axios";

const app = express();
const dotenv = config();
const port = process.env.PORT;
app.use(express.json());

app.get("/webhook", (req, res) => {
    console.log("Verification API");
    const verify_token = process.env.VERIFY_TOKEN;
    const query = req.query as WhatsAppParams;
    const challenge = parseInt(query["hub.challenge"]);
    if (query["hub.mode"] && query["hub.verify_token"]) {
        // Check the mode and token sent are correct
        if (
            query["hub.mode"] === "subscribe" &&
            query["hub.verify_token"] === verify_token
        ) {
            // Respond with 200 OK and challenge token from the request
            console.log("WEBHOOK_VERIFIED");
            res.status(200).json(challenge);
        } else {
            // Responds with '403 Forbidden' if verify tokens do not match
            res.sendStatus(403);
        }
    }
});

app.post("/webhook", async (req, res) => {
    const request = req.body as WhatsAppResponse;
    console.log(`Init action from ${process.env.BUSINESS_ID} - Action ${request.object}`);

    if (request) {
        if (request.entry) {
            if (request.entry[0].changes) {
                if (request.entry[0].changes[0].value.messages) {
                    if (
                        request.entry[0].changes[0].value.messages[0].text.body &&
                        request.entry[0].changes[0].field === "messages"
                    ) {
                        console.log(
                            `Message sent by ${request.entry[0].changes[0].value.contacts[0].profile.name} `
                        );
                        const message =
                            request.entry[0].changes[0].value.messages[0].text.body;
                        const number =
                            request.entry[0].changes[0].value.contacts[0].wa_id;

                        // Set your action here (API Request for example)
                        const url = "http://127.0.0.1:9090/api/publications/get-bot-response";
                            await axios.post(url, { "question": message }, {
                                headers: {
                                    "Content-Type": "application/json",
                                }
                            }).then(async(response)=>{
                                console.log(response.data.response);
                                
                                const res_message = await sendMessage(
                                    number,
                                    response.data.response
                                );
                            }).catch((err)=>{
                                console.log(err);
                                
                            })
                            // if (response) {
                            //     return response.data.question;
                            // }
                                             
                        res.status(200).json(request);
                    } else {
                        console.log(request);
                        res.status(400).json("Fuck you");
                    }
                }
            }
        }
    }
});



app.listen(port, () => {
    console.log("Server are starting at " + port);
});
