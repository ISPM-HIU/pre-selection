import axios from "axios";

const getSuggestion =  async (materiel: any) => {
    return new Promise(async (resolve, reject) => {
        const url = "http://127.0.0.1:8888/chatbot"; 
        console.log({question: materiel})
        try {
            let response = await axios.post(url, {"question": materiel}, {
                headers: {
                    "Content-Type": "application/json",
                }
            })
            if(response) {
                resolve(response.data);
            }
        } catch (error) {
            console.log(error)
            reject(new Error("Error"));
        }
    })
};

export { getSuggestion };
