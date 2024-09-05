import { HIDE_LOADER, SHOW_LOADER } from "./action";

const initialState = {
  user: {},
  userCheck: false,
  role: "",
  appDetails: {},
  isLoading: false,
   
};
const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case "USER_DATA":
      return {
        ...state,
        user: action.payload,
      };
    case "LOADING_DATA":
      return {
        ...state,
        isLoading: action.payload,
      };
    case "USER_CHECK":
      return {
        ...state,
        userCheck: action.payload,
      };
    case "APP_DETAILS":
      return {
        ...state,
        appDetails: action.payload,
      };
      case SHOW_LOADER:
        return {
          ...state,
          isLoading: true,
        };
      case HIDE_LOADER:
        return {
          ...state,
          isLoading: false,
        };
    default:
      return state;
  }
};

export default UserReducer;


