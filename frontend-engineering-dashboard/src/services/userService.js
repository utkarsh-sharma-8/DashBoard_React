import axios from "axios";

export const getCurrentUser  = async() => {
    const response = await axios.get("https://jsonplaceholder.typicode.com/users/1");
    return response.data;
}