import { decode as jwtDecode } from "jsonwebtoken";

const checkExpiredToken = (jwt) => {
  const user = jwtDecode(jwt);
  return user.exp * 1000 < Date.now();
};

export const setLocalStorageJWT = (jwt) => {
  localStorage.setItem("jwt", jwt);
};

export const getLoggedInUser = () => {
  const jwt = localStorage.getItem("jwt");

  if (!jwt || checkExpiredToken(jwt)) {
    removeLoggedInUser();
    return null;
  }

  const user = jwtDecode(jwt);
  return user;
};

export const removeLoggedInUser = () => localStorage.removeItem("jwt");
