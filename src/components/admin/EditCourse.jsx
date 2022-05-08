import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import './addCourse.css'
import { courseRequest, courseSuccess, courseFailure } from "../../redux/actions/courseAction";
import { toast } from "react-toastify";
import { toastOptions } from "../../utils/Util";

const apiEnd = 'http://localhost:8001/addcourse';

export default function EditCourse() {
    let location = useLocation();
    const {_id} = useParams();
    const courses = location.state.course;
    const selector = useSelector((state)=> state.course.courses)
    const dispatch = useDispatch();
    const [userData, setUserData] = useState({
        title:"",
        content:"",
        video:"",
    })
    const [file, setFile] = useState('')

    const {title, content, video } = userData;

    const onChange = e  => {
        setUserData({...userData, [e.target.name]: e.target.value});
    }
    const onFileChange = e => {
        setFile(e.target.files[0])
    }

    useEffect(()=> {
        dispatch(getAllCourseById())
    },[])

    const updateCourse = (data) => {
        return async () => {
            try {
                const response = await axios.put(apiEnd + `/update/${_id}`, data);
                toast.success('Successfully updated',toastOptions);
                return { update: true }
            }
            catch (error) {
                toast.error(error.response?.data, toastOptions);
                return { update : false }
            }
        }
    }

    const onSubmit = e => {
        e.preventDefault();
        const { title, content, video } = userData;
        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", content);
        formData.append("video", video);
        formData.append("image", file)

        dispatch(updateCourse(formData))
    }

    const getAllCourseById = () => {
        return async (dispatch) => {
            try {
                dispatch(courseRequest())
                const response = await axios.get(apiEnd + `/view/${_id}`)
                dispatch(courseSuccess(response.data));
                setUserData({
                    _id: _id,
                    update: true,
                    title: response.data.title,
                    content: response.data.content,
                    video: response.data.video,
                    file: response.data.file
                })
            }
            catch (error) {
                dispatch(courseFailure(error.message));
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
                                        <p>Add Course</p>
                                        <div className="form-outline mb-4">
                                            <input
                                                id='form2Example10'
                                                className='form-control'
                                                type='text'
                                                placeholder='Title'
                                                name='title'
                                                value={title}
                                                onChange={e => onChange(e)}
                                            />
                                        </div>
                                        <div className="form-outline mb-4">
                                            <textarea
                                                type="textarea"
                                                id="form2Example11"
                                                className="form-control"
                                                placeholder="Content"
                                                name='content'
                                                value={content}
                                                onChange={e => onChange(e)}
                                            />
                                        </div>

                                        <div className="form-outline mb-4">
                                            <input
                                                type="text"
                                                id="form2Example22"
                                                className="form-control"
                                                placeholder='video'
                                                name='video'
                                                value={video}
                                                onChange={e => onChange(e)}
                                            />
                                        </div>

                                        <div className="form-outline mb-4">
                                            <input
                                                type="file"
                                                id="form2Example32"
                                                className='form-control'
                                                name='file'
                                                filename="image"
                                                onChange={e => onFileChange(e)}
                                                />
                                                {
                                                    <img src={courses.file} height={50} width={50}></img>
                                                }
                                        </div>

                                        <div className="text-center pt-1  pb-1">
                                            <button className="btn btn-outline-primary"
                                                type="button"
                                                onClick={onSubmit} encType="multipart/form-data">
                                                Edit
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
        // <div className='container-wrapper'>
        //     <div className='app-cont-wrapper'>
        //         <div className='title'><h2>EditCourse</h2></div><br />
        //         <form className='form-wrapper'>
        //             <div className='title'>
        //                 <input
        //                     id='title'
        //                     className='input-course'
        //                     type='text'
        //                     placeholder='Title'
        //                     name='title'
        //                     value={title}
        //                     onChange={e => onChange(e)}
        //                 />
        //             </div>

        //             <div className='content'>
        //                 <textarea
        //                     id='content'
        //                     className='input-course-textarea'
        //                     type='textarea'
        //                     placeholder='type content'
        //                     name='content'
        //                     value={content}
        //                     onChange={e => onChange(e)}
        //                 />

        //             </div>

        //             <div className='video'>
        //                 <input
        //                     id='video'
        //                     className='input-course'
        //                     type='text'
        //                     placeholder='Video link'
        //                     name='video'
        //                     value={video}
        //                     onChange={e => onChange(e)}
        //                 />
        //             </div>

        //             <div className='file'>
        //                 <input
        //                     id='file'
        //                     className='input'
        //                     type='file'
        //                     placeholder='file'
        //                     name='file'
        //                     filename="image"
        //                     onChange={e => onFileChange(e)}
        //                 />
        //                 {
        //                 <img src={users.file} height={50} width={50}></img>
        //                 }
        //             </div>
                  
        //             <div>
        //                 <button className='submit' onClick={onSubmit} encType="multipart/form-data" >Edit</button>
        //             </div>
        //         </form>
        //     </div>
        // </div>
    )
}