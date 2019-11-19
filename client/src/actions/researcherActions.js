import axios from "axios";
import { GET_ERRORS } from "./types";

// Register researcher
export const registerResearcher = (researcherData, history) => dispatch => {
  axios
    .post("/api/researcher/register", researcherData)
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
