import axios from "axios";
import { toast } from "react-toastify";
import { toastOptions } from "../../utils/Util";
export const COMMENT_REQUEST = 'COMMENT_REQUEST';
export const COMMENT_SUCCESS = 'COMMENT_SUCCESS';
export const COMMENT_FAIL = 'COMMENT_FAIL';
const apiEnd = 'http://localhost:8001/addcourse'

export const courseRequest = () => {
  return {
    type: "COURSEREQUEST",
  }
}

export const courseSuccess = (courses) => {
  return {
    type: "COURSESUCCESS",
    payload: courses,
  }
}

export const courseFailure = (error) => {
  return {
    type: "COURSEERROR",
    payload: error,
  }
}



export const getAllCourse = () => {
  return async (dispatch) => {
    try {
      dispatch(courseRequest())
      const response = await axios.get(apiEnd + '/view')
      dispatch(courseSuccess(response.data));
    }
    catch (error) {
      dispatch(courseFailure(error.message));
    }
  }
}

export const getAllCourseById = (_id) => {
  return async (dispatch) => {
    try {
      dispatch(courseRequest())
      const response = await axios.get(apiEnd + `/view/${_id}`)
      dispatch(courseSuccess(response.data))
    }
    catch (error) {
      dispatch(courseFailure(error.message))
    }
  }
}




export const deleteCourse = (_id) => {
  return async (dispatch) => {
    try {
      dispatch(courseRequest())
      const response = await axios.delete(apiEnd + `/delete/${_id}`, _id)
      toast.success('deleted successfully', toastOptions);
    } catch (error) {
      toast.error(error.response?.data, toastOptions);
    }
  }
}

export const commentAction = (texts, allCourses_id, usersName,users_id) => {
  return async (dispatch,) => {
    try {
      dispatch({
        type: COMMENT_REQUEST,
      });
      const token = localStorage.getItem("Token")
      const config = {
        headers: {
          authorization: token,
        },
      };
      const { data } = axios.put(apiEnd + '/comment', {
        texts,
        allCourses_id,
        usersName,
        users_id,
      },
        config
      );
      if (allCourses_id === data._id) {
        dispatch({
          type: COMMENT_SUCCESS,
          payload: data,
        });
      }
    } catch (error) {
      dispatch({
        type: COMMENT_FAIL,
        payload: error.response && error.response.data.message
      });
    }
  };
};
