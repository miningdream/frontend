import axios from "axios";
import config from "../config.json";

export async function sendEmail(email) {
    let response = await axios.post(`${config.domain}/auth/forget-password`, { email }, { withCredentials: true });
    return response.status;
}

export async function sendVerifiedEmail() {
    let response = await axios.post(`${config.domain}/auth/verify/resend`, null, { withCredentials: true });
    return response.status;
}