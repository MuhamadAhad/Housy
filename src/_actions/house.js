import { GET_HOUSES, GET_HOUSE, CREATE_HOUSE } from "../_constants";
import { API, setAuthToken } from "../config/API";

export const getHouses = () => {
  return {
    type: GET_HOUSES,
    payload: async () => {
      try {
        const houses = await API.get("/houses");
        return houses.data;
      } catch (error) {
        console.log(error);
      }
    },
  };
};

export const getHouse = (id) => {
  return {
    type: GET_HOUSE,
    payload: async () => {
      try {
        const house = await API.get(`/house/${id}`);
        return house.data;
      } catch (error) {
        console.log(error);
      }
    },
  };
};

export const createHouse = (data) => {
  return {
    type: CREATE_HOUSE,
    payload: async () => {
      try {
        setAuthToken(localStorage.getItem("token"));
        const house = await API.post("/house", data);
        return house.data;
      } catch (error) {
        console.log(error);
      }
    },
  };
};
