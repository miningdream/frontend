import axios from "axios";
import config from "../config.json";

export async function getCourses() {
    let response = await axios.get(`${config.domain}/api/courses`, { withCredentials: true });
    return response.data;
}

export async function findCourses(query) {
    let response = await axios.get(`${config.domain}/api/courses${query.length ? `?q=${query.split(" ").join("+")}` : ""}`, { withCredentials: true });
    return response.data;
}