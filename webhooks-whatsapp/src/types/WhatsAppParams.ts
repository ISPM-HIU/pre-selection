import type { ParsedUrlQuery } from "querystring";
/**
 * Parameters required for the WhatsApp webhook
 */
export interface WhatsAppParams extends ParsedUrlQuery{
    "hub.verify_token"?:string;
    "hub.mode"?:string;
    "hub.challenge":string
}