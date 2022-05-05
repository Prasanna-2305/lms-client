import React, { useState } from 'react'
import './addCourse.css';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from "react-toastify";
import { toastOptions } from '../../utils/Util';
const apiEnd = 'http://localhost:8001/addcourse';

export default function AddCourse() {
    const allCourses = useSelector((state) => state.course.courses);
    const dispatch = useDispatch();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [video, setVideo] = useState("");
    const [file, setFile] = useState("");

    const onChange = e => {
        setFile(e.target.files[0]);
    }

    const addCourse = {
        title,
        content,
        video,
    }

    const handleSubmit = (e) => {
        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", content);
        formData.append("video", video);
        formData.append("image", file)

        setTitle("");
        setContent("");
        setVideo("");
        e.preventDefault();
        dispatch(fetchCourse(formData))
    };

    const fetchCourse = (formData,_id) => {
        return async () => {
            try {
                const token = localStorage.getItem("Token")
                const response = await axios.post(apiEnd + '/create', formData,{
                    headers: {
                        authorization : token,
                    }
                });
                toast.success('Successfully Added', toastOptions);
                return { create: true }
            }
            catch (error) {
                toast.error(error.response?.data, toastOptions);
                return { create: false }
            }
        }
    }
    return (
        <div className='container-wrapper'>
            <div className='app-cont-wrapper'>
                <div className='title'><h2>AddCourse</h2></div><br />
                <form className='form-wrapper'>
                    <div className='title'>
                        <input
                            id='title'
                            className='input-course'
                            type='text'
                            placeholder='Title'
                            name='title'
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
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
                            onChange={(e) => setContent(e.target.value)}
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
                            onChange={(e) => setVideo(e.target.value)}
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
                            onChange={onChange}
                        />
                    </div>

                    <div>
                        <button className='submit' onClick={handleSubmit} encType="multipart/form-data" >Create</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
