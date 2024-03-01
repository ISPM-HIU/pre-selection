/**
 * Prompt request from the user
 */
export interface ValidationRequest{
    prompt:string;
}

/**
 * Response after validation
 */
export interface ValidationResponse{
    validation:"Success"|"Failure",
    materials:Array<any>,
    message?:string
}