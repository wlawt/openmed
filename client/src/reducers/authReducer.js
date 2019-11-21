import {
  SET_CURRENT_USER,
  CLEAR_USER,
  SET_ACCOUNT_ID,
  SET_PKEY,
  SET_TYPE
} from "../actions/types";
import isEmpty from "../validation/is-empty";

const initialState = {
  isAuthenticated: false,
  user: {},
  accId: "",
  acc_pkey: "",
  type: ""
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload), // Depends if the payload is empty or not
        user: action.payload
      };
    case CLEAR_USER:
      return {
        ...state,
        user: null
      };
    case SET_ACCOUNT_ID:
      return {
        ...state,
        accId: action.payload
      };
    case SET_PKEY:
      return {
        ...state,
        acc_pkey: action.payload
      };
    case SET_TYPE:
      return {
        ...state,
        type: action.payload
      };
    default:
      return state;
  }
}
