import axios from "axios";
import config from "../config.json";

export async function getUser() {
    let response = await axios.get(`${config.domain}/auth`, { withCredentials: true });
    return response.data;
}

export async function authenticationUser(body) {
    let response = await axios.post(`${config.domain}/auth`, body, { withCredentials: true });
    return response.data;
}

export async function authenticationEditUser(body) {
    let response = await axios.put(`${config.domain}/auth`, body, {
        headers: {
            "Content-Type": "multipart/form-data"
        },
        withCredentials: true
    });
    return response.data;
}

export async function authenticationLogOutUser() {
    window.sessionStorage.clear();
    await axios.delete(`${config.domain}/auth`, { withCredentials: true });
}

export async function authenticationCreateUser(body) {
    let response = await axios.post(`${config.domain}/auth/create`, body, { withCredentials: true });
    return response.data;
}

export async function authenticationDeleteUser() {
    await axios.delete(`${config.domain}/auth/delete`, { withCredentials: true });
}

/**
 * 
 * @param {string} key 
 * @param {string} id 
 * @returns 
 */
export async function authenticationGetPassword(key, id) {
    let response = await axios.get(`${config.domain}/auth/forget-password?key=${key}&id=${id}`, { withCredentials: true });
    return response.status;
}

/**
 * 
 * @param {string} key 
 * @param {string} id 
 * @param {string} password 
 * @returns 
 */
export async function authenticationChangePassword(key, id, password) {
    let response = await axios.patch(`${config.domain}/auth/forget-password?key=${key}&id=${id}`, { password }, { withCredentials: true });
    return response.status;
}

/**
 * 
 * @param {object} body 
 */
export async function setUserNotification(body) {
    await axios.patch(`${config.domain}/auth/notification`, body, { withCredentials: true });
}

export { getNews } from "./news";
export { sendEmail, sendVerifiedEmail } from "./email";