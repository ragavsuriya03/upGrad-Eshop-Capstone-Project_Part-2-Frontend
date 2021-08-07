import jwt_decode from "jwt-decode";
import xhrService from "./http.service";

const doAuth = async (email, password) => {
  let response = await xhrService.post("http://localhost:8080/api/auth", {
    email,
    password,
  });

  localStorage.setItem("token", response.headers["x-auth-token"]);

  xhrService.setToken(response.headers['x-auth-header']);

  //debugger;
  return response;
};

const isLoggedIn = () => {
  const data = localStorage.getItem("token");
  if (!data) {
    return false;
  }
  return true;
};

const getToken = () => {
  return localStorage.getItem("token");
};

const isAdmin = () => {
  //console.log(getUser())
  return  getUser();
};

const getUser = () => {
  try {
const decoded = jwt_decode(localStorage.getItem("token"));
 return decoded.isAdmin;
  } catch (ex) {
    return null;
  }
};

const doLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("isAuthenticated");
  window.location = "/login";
};

export default {
  doAuth,
  isLoggedIn,
  isAdmin,
  doLogout,
  getToken,
  getUser
};
