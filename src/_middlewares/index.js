import {
  FILTER_SEARCH,
  GET_HOUSES,
  SIGNIN,
  SIGNUP,
  DATASIGN,
} from "../_constants";
import promise from "redux-promise-middleware";
import { API } from "../config/API";

export const searchFilter = ({ getState, dispatch }) => {
  return (next) => {
    return (action) => {
      if (action.type === FILTER_SEARCH) {
        const state = getState();
        let query = [];
        for (const key in state.filter) {
          if (state.filter[key] !== "" && state.filter[key] !== null) {
            if (key === "typeRent") {
              let type = "";
              switch (state.filter[key]) {
                case 1:
                  type = "day";
                  break;
                case 2:
                  type = "month";
                  break;
                case 3:
                  type = "year";
                  break;
                default:
                  break;
              }
              query.push(`${key}=${type}`);
            } else if (key === "amenities") {
              let words = [];
              for (const k in state.filter[key]) {
                if (k === "furnished" && state.filter[key][k] === true) {
                  words.push("Furnished");
                } else if (k === "pet" && state.filter[key][k] === true) {
                  words.push("Pet Allowed");
                } else if (k === "shared" && state.filter[key][k] === true) {
                  words.push("Shared Accommodation");
                }
              }
              if (words.length > 0) query.push(`${key}=${words.join(";")}`);
            } else {
              query.push(`${key}=${state.filter[key]}`);
            }
          }
        }
        return dispatch({
          type: GET_HOUSES,
          payload: async () => {
            try {
              let houses = {};
              if (query.length > 0) {
                houses = await API.get(`/houses?${query.join("&")}`);
              } else {
                houses = await API.get("/houses");
              }
              return houses.data;
            } catch (error) {
              console.log(error);
            }
          },
        });
      } else {
        return next(action);
      }
    };
  };
};

export const processSign = () => {
  return (next) => {
    return async (action) => {
      if (action.type === `${SIGNIN}_FULFILLED` || `${SIGNUP}_FULFILLED`) {
        let found = false;
        for (const key in action.payload) {
          if (key === "data") {
            found = true;
            break;
          }
        }
        if (found === true) {
          for (let key in action.payload.data) {
            localStorage.setItem(key, action.payload.data[key]);
          }
        }
      }
      return next(action);
    };
  };
};

export const checkDataSign = () => {
  return (next) => {
    return (action) => {
      if (action.type === DATASIGN) {
        let signIn = true;
        action.payload = {
          level: localStorage.getItem("level"),
          userName: localStorage.getItem("userName"),
          token: localStorage.getItem("token"),
        };
        for (const key in action.payload) {
          if (action.payload[key] === null) {
            signIn = false;
            break;
          }
        }
        action.payload.signIn = signIn;
      }
      return next(action);
    };
  };
};

export { promise };
