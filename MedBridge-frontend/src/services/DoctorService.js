import axios from "axios";
import { getToken } from "./tokenService";


export function fetchAllDonors(organ) {
    return axios.get(`http://localhost:6200/donor/${organ}`, {
        headers: { 'Authorization': `Bearer ${getToken()}` }
    });
}

export function fetchAllDetailsDonors(id) {
    return axios.get(`http://localhost:6200/donor/det/${id}`, {
        headers: { 'Authorization': `Bearer ${getToken()}` }
    });
}

export function registerDonor(formData) {
    return axios.post("http://localhost:6200/donor", formData, {
        headers: { 'Authorization': `Bearer ${getToken()}` }
    });
}

export function DeleteDonor(id) {
    return axios.delete(`http://localhost:6200/donor/${id}`, {
        headers: { 'Authorization': `Bearer ${getToken()}` }
    });
}

export function UpdateDonor(id, updatedData) {
    return axios.put(`http://localhost:6200/donor/${id}`, updatedData, {
        headers: { 'Authorization': `Bearer ${getToken()}` }
    });
}
