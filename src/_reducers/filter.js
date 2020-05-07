import { TYPERENT, BEDROOM, BATHROOM, PRICE, AMENITIES } from "../_constants";

const initialState = {
  typeRent: null,
  bedRoom: null,
  bathRoom: null,
  belowPrice: null,
  amenities: {
    furnished: false,
    pet: false,
    shared: false,
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPERENT:
      return {
        ...state,
        typeRent: state.typeRent === action.payload ? null : action.payload,
      };
    case BEDROOM:
      return {
        ...state,
        bedRoom: state.bedRoom === action.payload ? null : action.payload,
      };
    case BATHROOM:
      return {
        ...state,
        bathRoom: state.bathRoom === action.payload ? null : action.payload,
      };
    case AMENITIES:
      return {
        ...state,
        amenities: action.payload,
      };
    case PRICE:
      return {
        ...state,
        belowPrice: action.payload,
      };
    default:
      return state;
  }
};
export default reducer;
