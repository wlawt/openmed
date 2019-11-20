import axios from "axios";
import { GET_ERRORS } from "./types";

// Register patient
export const registerPatient = (patientData, history) => dispatch => {
  axios
    .post("/api/patient/register", patientData)
    .then(res => {
      history.push("/");
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: ""
      })
    );
};
