import axios from "axios";

const API_URL = "http://localhost:8080/api/chat";

export const sendMessage = async (message) => {
    try {

        const response = await axios.post(API_URL, {
            message: message
        });

        return response.data.response;

    } catch (error) {

        console.error(error);

        return "Sorry! AI is unavailable.";

    }
};