import axios from "axios";
import config from "../config.json";

export async function getNews() {
    let response = await axios.get(`${config.domain}/api/news`, { withCredentials: true });
    return response.data;
}