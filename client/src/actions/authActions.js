import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import {
  GET_ERRORS,
  SET_CURRENT_USER,
  CLEAR_USER,
  SET_ACCOUNT_ID,
  SET_PKEY,
  SET_TYPE
} from "./types";

// Login - Get user token
export const loginPatient = loginData => dispatch => {
  axios
    .post("/api/patient/login", loginData)
    .then(res => {
      // Save to localStorage
      const { token } = res.data;
      // Set token to localStorage
      localStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Login - Get researcher token
export const loginResearcher = loginData => dispatch => {
  axios
    .post("/api/register/login", loginData)
    .then(res => {
      // Save to localStorage
      const { token } = res.data;
      // Set token to localStorage
      localStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// Log user out
export const logoutUser = () => dispatch => {
  // Remove token from localStorage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future request
  setAuthToken(false);
  // Set current user to empty object which will set isAutheticated to false
  dispatch(setCurrentUser({}));
};

export const setAccountID = id => {
  return {
    type: SET_ACCOUNT_ID,
    payload: id
  };
};

export const set_pkey = key => {
  return {
    type: SET_PKEY,
    payload: key
  };
};

export const set_type = type => {
  return {
    type: SET_TYPE,
    payload: type
  };
};

// Clear user (goes with logout)
export const clearCurrentUser = () => {
  return {
    type: CLEAR_USER
  };
};
