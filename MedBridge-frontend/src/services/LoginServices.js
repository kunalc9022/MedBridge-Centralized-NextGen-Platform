import axios from "axios";

export function registerAsDoctor(values) {
  console.log(values);
  return axios.post("http://localhost:8080/api/doctors/signup", values, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: false, // usually false if using JWT and no cookies
  });
}
export function loginAsDoctor(data) {
  return axios.post("http://localhost:8080/api/auth/doctor/signin", data);
}
export function loginAsPatient(data) {
  return axios.post("http://localhost:6200/home/login", data);
}
export function registerAsPatient(data) {
  return axios.post("http://localhost:6200/home/patientLogin", data);
}
