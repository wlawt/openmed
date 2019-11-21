import axios from "axios";
import { GET_PUBLICATIONS } from "./types";

export const getPublications = () => dispatch => {
  axios
    .get("/api/payment/all_pub")
    .then(res =>
      dispatch({
        type: GET_PUBLICATIONS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PUBLICATIONS,
        payload: null
      })
    );
};
