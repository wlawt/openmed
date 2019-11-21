import axios from "axios";
import { GET_ERRORS, GET_PAYMENTS } from "./types";

export const addPublication = (data, history) => dispatch => {
  axios
    .get("/api/payment/add_publication", data)
    .then(res => history.push("/wallet"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: null
      })
    );
};

export const getPayments = () => dispatch => {
  axios
    .get("/api/payment/all")
    .then(res =>
      dispatch({
        type: GET_PAYMENTS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PAYMENTS,
        payload: null
      })
    );
};
