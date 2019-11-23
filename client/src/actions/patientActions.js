import axios from "axios";
import { GET_ERRORS, GET_PUBLIC } from "./types";

// Register patient
export const registerPatient = (patientData, history) => dispatch => {
  axios
    .post("/api/patient/register", patientData)
    .then(res => {
      history.push("/login");
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: ""
      })
    );
};

export const getPatientPublic = id => dispatch => {
  axios
    .get(`/api/patient/key/${id}`)
    .then(res =>
      dispatch({
        type: GET_PUBLIC,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: null
      })
    );
};
