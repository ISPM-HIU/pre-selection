/**
 * Object Response after a event is sent and set as request for the post metho
 */
export interface WhatsAppResponse {
  object: "whatsapp_business_account";
  entry: [
    {
      id: "181516905049198";
      changes: [
        {
          value: {
            messaging_product: "whatsapp";
            metadata: {
              display_phone_number: "15550580082";
              phone_number_id: "178882625313110";
            };
            contacts: [
              {
                profile: {
                  name: string; /// Name of the user
                };
                wa_id: string; /// Number of the user
              }
            ];
            messages: [
              {
                from: string;
                id: string;
                timestamp: "1708633044";
                text: {
                  body: string; /// Value of the messages
                };
                type: "text";
              }
            ];
          };
          field: string | "messages";
        }
      ];
    }
  ];
}
