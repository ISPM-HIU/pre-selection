import axios, { AxiosError, AxiosHeaders } from "axios";
import { WhatsAppMessage } from "../types/WhatsAppMessage";

/**
 * Send message with Graph API
 * @param message
 */
export async function sendMessage(destination: string, message: string) {
    var headers = new AxiosHeaders(),
        data = {};
    headers.setAuthorization(`Bearer ${process.env.ACCESS_TOKEN}`);

    await axios.post(
        `https://graph.facebook.com/v17.0/${process.env.BUSINESS_ID}/messages`,
        {
            messaging_product: "whatsapp",
            recipient_type: "individual",
            type: "text",
            text: {
                preview_url:false,
                body:message
            },
            to: destination,
        } as WhatsAppMessage,
        {
            headers: headers,
        }
    )
    .then(
        e=>{
            data = e.data
        }
    )
    .catch(
        error=>{
            console.log(error.response)
            data = error.response
        }
    );

    return data
}
