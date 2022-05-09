import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import ReactPlayer from 'react-player';
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css'
import './CourseContent.css'
import { FaThumbsUp, FaComment } from 'react-icons/fa'
import { getAllCourseById } from '../../redux/actions/courseAction';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { getAllUserById } from '../../redux/actions/getUser';
import { commentAction } from '../../redux/actions/courseAction'

export default function CourseContent() {
  const apiEnd = 'http://localhost:8001/addcourse'
  let location = useLocation()
  let { _id } = useParams()
  const courses = location.state;
  const allCourses = useSelector((state) => state.course.courses)
  const users = useSelector((state) => state.login.user)

  const [like, setLike] = useState(allCourses?.likes?.length);
  const [isLiked, setIsLiked] = useState(false);
  const [comment, setComment] = useState(false)
  const [blankcomment, setBlankcomment] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllCourseById(_id))
  })


  const makeComment = (texts) => {
    if (texts === '') {
      setBlankcomment(true)
    } else {
      dispatch(commentAction(texts, allCourses._id, users.name, users._id))
      setComment(true);
      setBlankcomment(false);
    }
  }

  useEffect(() => {
    if (courses?.likes?.length > 0) {
      setIsLiked(allCourses.likes.includes(users._id));
    }
  }, [users._id, allCourses.likes]);

  const likeHandler = async () => {
    try {
      const response = await axios.put(apiEnd + `/like/${_id}`, { userId: users._id })
      if (response === response.status) {
        dispatch(getAllUserById(_id))
      }
    } catch (error) {
      alert(error);
    }
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  }
  return (


    <div className='container'>
      <h1>{allCourses.title}</h1>
      <div className='row'>
        <div className='col-md-6 col-lg-6 col-xl-6'>
          <center><ReactPlayer url={allCourses.video} width={300} height={200} /></center>
          <pre>{allCourses.content} </pre>
          <img src={allCourses.file} width={300} height={280} />
        </div>
        <div className='col border border-black'>
          <div>
            <h2> Please! Like & comment  &nbsp;
              <button className='btn btn-primary' onClick={likeHandler}><FaThumbsUp /> {allCourses?.likes?.length} </button></h2>
          </div>
          <br />
          <div className='container'>
            <form className='form' onSubmit={(e) => {
              e.preventDefault()
              makeComment(e.target[0].value)
            }}>
              <textarea className="form-control" style={{ marginRight: "80px", width:"70"}} col="400" rows="2"></textarea><br />
              <button className="btn btn-primary"  type='submit'> <FaComment /></button>
            </form>

            <div className="w-100 scrollbar scrollbar-primary force-overflow-bg-black">
              {allCourses.comments === undefined || null ? <h3>No Comments Yet</h3>
                :
                allCourses.comments.map(record => {
                  return (
                    <div className="d-flex justify-content-between align-items-center mb-3" key={record._id}>
                      <span className="text-secondary fw-bold mb-0">{record.postedBy} &#8226; &nbsp; {record.text}</span>
                      <span className="text-dark ms-2">{record.date}</span>
                    </div>
                  )
                })
              }
            </div>
          </div>
        </div>
      </div>
    </div>


  )
}

