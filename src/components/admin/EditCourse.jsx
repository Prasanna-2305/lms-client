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
    const users = location.state.user;
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
        <div className='container-wrapper'>
            <div className='app-cont-wrapper'>
                <div className='title'><h2>EditCourse</h2></div><br />
                <form className='form-wrapper'>
                    <div className='title'>
                        <input
                            id='title'
                            className='input-course'
                            type='text'
                            placeholder='Title'
                            name='title'
                            value={title}
                            onChange={e => onChange(e)}
                        />
                    </div>

                    <div className='content'>
                        <textarea
                            id='content'
                            className='input-course-textarea'
                            type='textarea'
                            placeholder='type content'
                            name='content'
                            value={content}
                            onChange={e => onChange(e)}
                        />

                    </div>

                    <div className='video'>
                        <input
                            id='video'
                            className='input-course'
                            type='text'
                            placeholder='Video link'
                            name='video'
                            value={video}
                            onChange={e => onChange(e)}
                        />
                    </div>

                    <div className='file'>
                        <input
                            id='file'
                            className='input'
                            type='file'
                            placeholder='file'
                            name='file'
                            filename="image"
                            onChange={e => onFileChange(e)}
                        />
                        {
                        <img src={users.file} height={50} width={50}></img>
                        }
                    </div>
                  
                    <div>
                        <button className='submit' onClick={onSubmit} encType="multipart/form-data" >Edit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}