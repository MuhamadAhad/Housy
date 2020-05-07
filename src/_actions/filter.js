import {
  TYPERENT,
  BEDROOM,
  BATHROOM,
  PRICE,
  FILTER_SEARCH,
  AMENITIES,
} from "../_constants";

export const pickAmenities = (data) => {
  return {
    type: AMENITIES,
    payload: data,
  };
};

export const clickTypeRent = (value) => {
  return {
    type: TYPERENT,
    payload: value,
  };
};

export const clickBedRoom = (value) => {
  return {
    type: BEDROOM,
    payload: value,
  };
};

export const clickBathRoom = (value) => {
  return {
    type: BATHROOM,
    payload: value,
  };
};

export const changePrice = (value) => {
  return {
    type: PRICE,
    payload:
      value === ""
        ? null
        : parseFloat(value.split(".").join("").replace(/,/, ".")),
  };
};

export const clickApply = () => {
  return {
    type: FILTER_SEARCH,
  };
};
