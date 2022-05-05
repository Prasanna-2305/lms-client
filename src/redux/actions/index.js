import axios from "axios";
import { toast } from "react-toastify";
import { toastOptions } from "../../utils/Util";

export const USERREQUEST = 'USERREQUEST';
export const USERSUCCESS = 'USERSUCCESS';
export const USERERROR = 'USERERROR';

const apiEnd = 'http://localhost:8001/users';

export const userRequest = () => {
    return {
        type: "USERREQUEST",
    }
}

export const userSuccess = (user) => {
    return {
        type: "USERSUCCESS",
        payload: user,
    }
}

export const userFailure = (error) => {
    return {
        type: "USERERROR",
        payload: error,
    }
}

export const userFetch = (data) => {
    return async () => {
        try {
            const response = await axios.post(apiEnd + '/register', data);
            toast.success('Successfully Register', toastOptions);
            return { register: true }
        }
        catch (error) {
            toast.error(error.response.data, toastOptions);
            return { register: false }
        }
    }
}

export const userLogin = (userData) => {
    return async (dispatch) => {
        try {
            dispatch(userRequest());
            const { data } = await axios.post(apiEnd + '/login', userData)
            const { token, user } = data;
            localStorage.setItem('Token', token);
            //decode
            dispatch(userSuccess(user));
            return { login: true }
        }
        catch (error) {
            dispatch(userFailure(error))
            toast.error(error.response?.data, toastOptions);
            return { login: false }
        }
    }
}


