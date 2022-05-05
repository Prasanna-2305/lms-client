import {COMMENT_REQUEST, COMMENT_SUCCESS,COMMENT_FAIL  } from '../actions/courseAction'
const initialState = {
  loading: null,
  courses: {},
  error: '',
};


export const courseReducer = (state = initialState, action) => {
  switch (action.type) {
    case "COURSEREQUEST":
      return {
        ...state,
        loading: true,
      };
    case "COURSESUCCESS":
      return {

        loading: false,
        courses: action.payload,
        error: '',
      };
    case "COURSEERROR":
      return {
        loading: false,
        courses: {},
        error: action.payload,
      };
    
    default:
      return state;
  }
};

export const commentReducer = (state = {}, action) => {
  switch (action.type) {
    case COMMENT_REQUEST:
      return {
        loading: true,
      }
    case COMMENT_SUCCESS:
      return {
        commment: action.payload,
        success: true,
      }
    case COMMENT_FAIL:
      return {
        loading: false,
        error: action.payload
      }
    default:
      return state;
  }
}
