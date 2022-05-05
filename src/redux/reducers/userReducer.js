import { USERSUCCESS, USERERROR, USERREQUEST } from '../actions';

const initialState = {
  loading: null,
  user: {},
  error: '',
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GETUSERREQUEST":
      return {
        ...state,
        loading: true,
      };
    case "GETUSERSUCCESS":
      return {

        loading: false,
        user: action.payload,
        error: '',
      };
    case "GETUSERERROR":
      return {
        loading: false,
        user: {},
        error: action.payload,
      };
    default:
      return state;
  }
};



export default userReducer;