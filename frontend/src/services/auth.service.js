import axios from "axios";

const API_URL = "http://localhost:3000/api/";

const register = (username, email, password) => {
  return axios.post(API_URL + "signup", {
    username,
    email,
    password,
  });
};

const login = (email, password) => {
  return axios
    .post(API_URL + "login", {
      email,
      password,
    })
    .then((response) => {
      if (response.data.token) {
        sessionStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
};

const getCurrentUser = () => {
  return JSON.parse(sessionStorage.getItem("user"));
};

export default {
  register,
  login,
  getCurrentUser,
};