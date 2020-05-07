import { GET_CITIES } from "../_constants";
import { API } from "../config/API";

export const getCities = () => {
  return {
    type: GET_CITIES,
    payload: async () => {
      try {
        const cities = await API.get("/cities");
        return cities.data;
      } catch (error) {
        console.log(error);
      }
    },
  };
};
