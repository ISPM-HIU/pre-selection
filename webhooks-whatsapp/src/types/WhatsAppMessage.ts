/**
 * Object type for sending a message
 */
export interface WhatsAppMessage{
    "messaging_product": "whatsapp",
    "recipient_type": "individual",
    "to": string,
    "type": "text",
    "text": { 
        "preview_url": false,
        "body": string
        }
}