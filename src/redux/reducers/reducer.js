import { USERSUCCESS, USERERROR, USERREQUEST } from '../actions';

const initialState = {
  loading: null,
  user: {},
  error: '',
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case "USERREQUEST":
      return {
        ...state,
        loading: true,
      };
    case "USERSUCCESS":
      return {

        loading: false,
        user: action.payload,
        error: '',
      };
    case "USERERROR":
      return {
        loading: false,
        user: {},
        error: action.payload,
      };
    default:
      return state;
  }
};



export default loginReducer;