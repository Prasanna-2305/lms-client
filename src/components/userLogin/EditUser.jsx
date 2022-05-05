import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { getUserRequest, getUserSuccess, getUserFailure } from "../../redux/actions/getUser";
import axios from "axios";
import '../admin/addCourse.css'
const apiEnd = 'http://localhost:8001/users';
export default function EditUser() {
    let location = useLocation()
    const { _id } = useParams()
    const users = location.state;
    const selector = useSelector((state) => state.users.user)
    const dispatch = useDispatch()
    const [values, setValues] = useState({
        name: "",
        email: "",
        password: ""
    })
    const { name, email, password } = values;

    const onChange = e => {
        setValues({ ...values, [e.target.name]: e.target.value });
    }

    useEffect(() => {
        dispatch(getAllUserById())
    }, [])

    const updateUser = () => {
        return async () => {

            try {
                const response = await axios.put(apiEnd + `/update/${_id}`, values)
                alert("User Edited successfully")
                return { update: true }
            } catch (error) {
                alert(error);
                return { update: false }
            }
        }
    }

    const onSubmit = e => {
        e.preventDefault();
        dispatch(updateUser())
    }
    const getAllUserById = () => {
        return async (dispatch) => {
            try {
                dispatch(getUserRequest())
                const response = await axios.get(apiEnd + `/view/${_id}`)
                dispatch(getUserSuccess(response.data));
                setValues({
                    _id: _id,
                    update: true,
                    name: response.data.name,
                    email: response.data.email,
                    password: response.data.password,
                })
            }
            catch (error) {
                dispatch(getUserFailure(error.message));
            }
        }
    }
    return (
        <div className="h-500 gradient-form" style={{ backgroundcolor: "#eee" }}>
            <div className="container py-2 h-60">
                <div className="row d-flex justify-content-center align-items-center h-50">
                    <div className="col-xl-5">
                        <div className="card rounded-3 text-black">
                            <div className="row g-0">
                                <div>
                                    <div className="card-body p-md-5 mx-md-4">
                                        <form>
                                            <p>Edit your profile</p>
                                            <div className="form-outline mb-4">
                                                <input
                                                    id='form2Example10'
                                                    className='form-control'
                                                    type='text'
                                                    placeholder='Name'
                                                    name='name'
                                                    value={name}
                                                    onChange={e => onChange(e)}
                                                />
                                            </div>
                                            <div className="form-outline mb-4">
                                                <input
                                                    type="email"
                                                    id="form2Example11"
                                                    className="form-control"
                                                    placeholder="Email address"
                                                    name='email'
                                                    value={email}
                                                    onChange={e => onChange(e)}
                                                />
                                            </div>

                                            <div className="form-outline mb-4">
                                                <input
                                                    type="password"
                                                    id="form2Example22"
                                                    className="form-control"
                                                    placeholder='Password'
                                                    name='password'
                                                    value={password}
                                                    onChange={e => onChange(e)}
                                                />
                                            </div>

                                            <div className="text-center pt-1  pb-1">
                                                <button className="btn btn-primary"
                                                    type="button"
                                                    onClick={onSubmit}>
                                                    <FaEdit />Edit</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}



