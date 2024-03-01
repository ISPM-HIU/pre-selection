import axios from "axios";

const send_to_model =  async (allPublication: any) => {
    let data = {
        "intents": [] as any
    }
    const url = "http://localhost:8888/load-to-model";
    for await (let publication of allPublication) {
        let pub_data =  {
            "tag": publication.product_name,
            "patterns": [publication.products, publication.description],
            "publicationId": publication.id,
            "responses": [
                publication.description
            ]
            }
            data.intents.push(pub_data)
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
