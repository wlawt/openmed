import axios from "axios";
import { GET_PATIENTS } from "./types";

export const getPatients = () => dispatch => {
  axios
    .get("/api/patient/all")
    .then(res =>
      dispatch({
        type: GET_PATIENTS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PATIENTS,
        payload: null
      })
    );
};
