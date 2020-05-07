import {
  GET_TRANSACTIONS,
  initialState,
  GET_TRANSACTION,
  UPDATE_TRANSACTION,
  CREATE_TRANSACTION,
} from "../_constants";

export const transactions = (state = initialState, action) => {
  switch (action.type) {
    case `${GET_TRANSACTIONS}_PENDING`:
      return {
        ...state,
        loading: true,
      };
    case `${GET_TRANSACTIONS}_FULFILLED`:
      return {
        ...state,
        loading: false,
        data: action.payload && action.payload.data,
      };
    case `${GET_TRANSACTIONS}_REJECTED`:
      return {
        ...state,
        loading: false,
        error: true,
      };
    default:
      return state;
  }
};

export const transaction = (state = initialState, action) => {
  switch (action.type) {
    case `${CREATE_TRANSACTION}_PENDING`:
    case `${UPDATE_TRANSACTION}_PENDING`:
    case `${GET_TRANSACTION}_PENDING`:
      return {
        ...state,
        loading: true,
      };
    case `${CREATE_TRANSACTION}_FULFILLED`:
    case `${UPDATE_TRANSACTION}_FULFILLED`:
    case `${GET_TRANSACTION}_FULFILLED`:
      return {
        ...state,
        loading: false,
        data: action.payload && action.payload.data,
      };
    case `${CREATE_TRANSACTION}_REJECTED`:
    case `${UPDATE_TRANSACTION}_REJECTED`:
    case `${GET_TRANSACTION}_REJECTED`:
      return {
        ...state,
        loading: false,
        error: true,
      };
    default:
      return state;
  }
};
