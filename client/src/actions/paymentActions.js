import axios from "axios";
import { GET_ERRORS } from "./types";

export const addPublication = (data, history) => dispatch => {
  axios
    .get("/api/payment/add_publication", data)
    .then(res => history.push("/"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: null
      })
    );
};
