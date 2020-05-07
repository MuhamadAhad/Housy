import { GET_CITIES, initialState } from "../_constants";

export const cities = (state = initialState, action) => {
  switch (action.type) {
    case `${GET_CITIES}_PENDING`:
      return {
        ...state,
        loading: true,
      };
    case `${GET_CITIES}_FULFILLED`:
      return {
        ...state,
        loading: false,
        data: action.payload && action.payload.data,
      };
    case `${GET_CITIES}_REJECTED`:
      return {
        ...state,
        loading: false,
        error: true,
      };
    default:
      return state;
  }
};
