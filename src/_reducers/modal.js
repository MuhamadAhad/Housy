import {
  MODAL_SIGNIN,
  MODAL_SIGNUP,
  MODAL_PASSWORD,
  MODAL_BOOKING,
  MODAL_TRANSACTION,
} from "../_constants";

const intialState = {
  modalSignin: false,
  modalSignup: false,
  modalPassword: false,
  modalBooking: false,
  modalTransaction: false,
};

const reducer = (state = intialState, action) => {
  switch (action.type) {
    case MODAL_SIGNIN:
      return {
        ...state,
        modalSignup: false,
        modalSignin: !state.modalSignin,
      };
    case MODAL_SIGNUP:
      return {
        ...state,
        modalSignin: false,
        modalSignup: !state.modalSignup,
      };
    case MODAL_PASSWORD:
      return {
        ...state,
        modalPassword: !state.modalPassword,
      };
    case MODAL_BOOKING:
      return {
        ...state,
        modalBooking: !state.modalBooking,
      };
    case MODAL_TRANSACTION:
      return {
        ...state,
        modalTransaction: !state.modalTransaction,
      };
    default:
      return state;
  }
};
export default reducer;
