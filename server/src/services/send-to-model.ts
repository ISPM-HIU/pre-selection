import axios from "axios";

const send_to_model =  async (allPublication: any) => {
    let data = []
    const url = "http://127.0.0.1:8888/chatbot";
    for await (let publication of allPublication) {
        let pub_data =  {
            "id": publication.id,
            "intents": publication.description.split(" "),
            "publicationId": publication.id,
            "response": publication.description
        }
        data.push(pub_data)
    }

    try {
        let response = await axios.post(url, data, {
            headers: {
                "Content-Type": "application/json",
            }
        })
        if(response) {
            console.log("Success:", response.data);
        }
    } catch (error) {
        console.error("Error:", error);
    }
};

export { send_to_model };
