import axios from "axios";
import { toast } from "react-toastify";
import { toastOptions } from "../../utils/Util";
export const USERREQUEST = 'USERREQUEST';
export const USERSUCCESS = 'USERSUCCESS';
export const USERERROR = 'USERERROR';

const apiEnd = 'http://localhost:8001/users';
export const getUserRequest = () => {
    return {
        type: "GETUSERREQUEST",
    }
}

export const getUserSuccess = (user) => {
    return {
        type: "GETUSERSUCCESS",
        payload: user,
    }
}

export const getUserFailure = (error) => {
    return {
        type: "GETUSERERROR",
        payload: error,
    }
}

export const getAllUser = () => {
    return async (dispatch) => {
        try {
            dispatch(getUserRequest())
            const response = await axios.get(apiEnd + '/read')
            dispatch(getUserSuccess(response.data));
        }
        catch (error) {
            dispatch(getUserFailure(error.message));
        }
    }
}
export const getAllUserById = (_id) => {
    return async (dispatch) => {
        try {
            dispatch(getUserRequest())
            const response = await axios.get(apiEnd + `/view/${_id}`)
            dispatch(getUserSuccess(response.data));
        }
        catch (error) {
            dispatch(getUserFailure(error.message));
        }
    }
}

export const deleteUser = (_id) => {
    return async (dispatch) => {
        try {
            dispatch(getUserRequest())
            const response = await axios.delete(apiEnd + `/delete/${_id}`, _id)
            toast.success('deleted successfully', toastOptions);
        } catch (error) {
            alert(error);
        }
    }
}