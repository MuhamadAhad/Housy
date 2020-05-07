import {
  MODAL_SIGNIN,
  MODAL_SIGNUP,
  MODAL_PASSWORD,
  MODAL_BOOKING,
  MODAL_TRANSACTION,
} from "../_constants";

export const clickModalSignin = () => {
  return {
    type: MODAL_SIGNIN,
  };
};

export const clickModalSignup = () => {
  return {
    type: MODAL_SIGNUP,
  };
};

export const clickModalPassword = () => {
  return {
    type: MODAL_PASSWORD,
  };
};
export const clickModalBooking = () => {
  return {
    type: MODAL_BOOKING,
  };
};
export const clickModalTransaction = () => {
  return {
    type: MODAL_TRANSACTION,
  };
};
