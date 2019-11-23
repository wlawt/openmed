import axios from "axios";
import { GET_PATIENTS, DOWNLOAD } from "./types";

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

export const downloadFile = () => dispatch => {
  axios
    .get("/api/researcher/download")
    .then(res =>
      dispatch({
        type: DOWNLOAD,
        payload: ""
      })
    )
    .catch(err =>
      dispatch({
        type: DOWNLOAD,
        payload: null
      })
    );
};
