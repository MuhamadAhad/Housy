import { GET_HOUSES, GET_HOUSE, CREATE_HOUSE } from "../_constants";

const initialState = {
  data: [],
  loading: false,
  error: false,
};

export const houses = (state = initialState, action) => {
  switch (action.type) {
    case `${GET_HOUSES}_PENDING`:
      return {
        ...state,
        loading: true,
      };
    case `${GET_HOUSES}_FULFILLED`:
      return {
        ...state,
        data: action.payload && action.payload.data,
        loading: false,
      };
    case `'${GET_HOUSES}_REJECTED`:
      return {
        ...state,
        data: [],
        error: true,
      };
    default:
      return state;
  }
};

export const house = (state = initialState, action) => {
  switch (action.type) {
    case `${CREATE_HOUSE}_PENDING`:
    case `${GET_HOUSE}_PENDING`:
      return {
        ...state,
        loading: true,
      };
    case `${CREATE_HOUSE}_FULFILLED`:
    case `${GET_HOUSE}_FULFILLED`:
      return {
        ...state,
        data: action.payload && action.payload.data,
        loading: false,
      };
    case `'${CREATE_HOUSE}_REJECTED`:
    case `'${GET_HOUSE}_REJECTED`:
      return {
        ...state,
        data: [],
        error: true,
      };
    default:
      return state;
  }
};
