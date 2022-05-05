import React, { useState } from 'react'
import "./Login.css"
import { userFetch } from '../../redux/actions';
import { FaUser } from "react-icons/fa"
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import image from "../navbar/logo.png"
export default function Registration() {
    const Userregister = {
        name: "",
        email: "",
        password: ""
    };
    const [values, setValues] = useState(
        Userregister
    );

    const user = useSelector((state) => state.login.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onChange = (e) => {
        setValues((values) => ({
            ...values,
            [e.target.name]: e.target.value
        }))
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const registerRes = await dispatch(userFetch(values))
        if (registerRes.register) {
            navigate('/');
        }
    };
    return (
        <div className="h-500 gradient-form" style={{ backgroundcolor: "#eee" }}>
            <div className="container py-2 h-60">
                <div className="row d-flex justify-content-center align-items-center h-50">
                    <div className="col-xl-5">
                        <div className="card rounded-3 text-black">
                            <div className="row g-0">
                                <div>
                                    <div className="card-body p-md-5 mx-md-4">

                                        <div className="text-center">
                                            <img src={image}
                                                style={{ width: "80px", height: "65px" }} alt="logo"></img>
                                            <h4 className="mt-1 pb-1">Welcome to Lms</h4>
                                        </div>

                                        <form>
                                            <p>Please login to your account</p>
                                            <div className="form-outline mb-4">
                                                <input
                                                    id='form2Example10'
                                                    className='form-control'
                                                    type='text'
                                                    placeholder='Name'
                                                    name='name'
                                                    value={values.name}
                                                    onChange={onChange}
                                                />
                                            </div>
                                            <div className="form-outline mb-4">
                                                <input
                                                    type="email"
                                                    id="form2Example11"
                                                    className="form-control"
                                                    placeholder="Email address"
                                                    name='email'
                                                    value={values.email}
                                                    onChange={onChange}
                                                />
                                            </div>

                                            <div className="form-outline mb-4">
                                                <input type="password"
                                                    id="form2Example22"
                                                    className="form-control"
                                                    placeholder='Password'
                                                    name='password'
                                                    value={values.password}
                                                    onChange={onChange}
                                                />
                                            </div>

                                            <div className="text-center pt-1  pb-1">
                                                <button className="btn btn-outline-primary"
                                                    type="button"
                                                    onClick={handleSubmit}>
                                                    <FaUser />REGISTER
                                                </button>
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
