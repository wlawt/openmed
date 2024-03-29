import {
  GET_PATIENTS,
  GET_PAYMENTS,
  GET_PUBLICATIONS,
  GET_PUBLIC
} from "../actions/types";

const initialState = {
  patients: null,
  payments: null,
  publications: null,
  public: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PATIENTS:
      return {
        ...state,
        patients: action.payload
      };
    case GET_PAYMENTS:
      return {
        ...state,
        payments: action.payload
      };
    case GET_PUBLICATIONS:
      return {
        ...state,
        publications: action.payload
      };
    case GET_PUBLIC:
      return {
        ...state,
        public: action.payload
      };
    default:
      return state;
  }
}
