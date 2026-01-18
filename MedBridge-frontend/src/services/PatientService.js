import axios from "axios";
import { getToken } from "./tokenService";


export function fetchAllPatients(organ) {
    return axios.get(`http://localhost:6200/patient/${organ}`, {
        headers: { 'Authorization': `Bearer ${getToken()}` }
    });
}

export function fetchaAlldetails(id) {
    return axios.get(`http://localhost:6200/patient/det/${id}`, {
        headers: { 'Authorization': `Bearer ${getToken()}` }
    });
}

export function registerPatient(formData) {
    return axios.post("http://localhost:6200/patient", formData, {
        headers: { 'Authorization': `Bearer ${getToken()}` }
    });
}

export function deletePatient(id) {
    return axios.delete(`http://localhost:6200/patient/${id}`, {
        headers: { 'Authorization': `Bearer ${getToken()}` }
    });
}
// export const fetchPatientDetails = (id) => axios.get(`/api/patients/${id}`);
export const updatePatient = (id, data) => axios.put(`http://localhost:6200/patient/${id}`, data,
    {headers: { 'Authorization': `Bearer ${getToken()}`}});

// import axios from "axios";

// export function fetchAllPatients(organ){
// // export function fetchAllPatients(){
//     return axios.get(`http://localhost:6200/patient/${organ}`);
//     // return axios.get(`http://localhost:6200/patient/Liver`);
// }
// export function fetchaAlldetails(id){
//     return axios.get(`http://localhost:6200/patient/det/${id}`);
// }

// export function registerPatient(formData){
//     return axios.post("http://localhost:6200/patient",formData);
// }
// export function deletePatient(id){
//     return axios.delete(`http://localhost:6200/patient/${id}`);
// }