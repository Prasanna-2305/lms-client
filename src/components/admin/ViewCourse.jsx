import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAllCourse } from '../../redux/actions/courseAction'
import { FaTrash, FaEdit } from "react-icons/fa"
import { deleteCourse } from '../../redux/actions/courseAction'
import { Link } from 'react-router-dom'
export default function ViewCourse() {
  const allCourses = useSelector((state) => state.course.courses)
  const dispatch = useDispatch()
  const newcourse = Array.from(allCourses)
  useEffect(() => {
    dispatch(getAllCourse())
  }, [])
  return (
    <div>
      <center><br /><br /><br />
        <table className='container table table-striped table-dark'>
          <thead>
            <tr>
              <th scope='col'>Title</th>
              <th scope='col'>Video</th>
              <th scope='col'>Image</th>
              <th scope='col'>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              newcourse && newcourse.map((user, index) => (
                <tr key={index}>
                  <td>{user.title}</td>
                  <td>{user.video}</td>
                  <td>{user.file}</td>
                  <td>
                    <a className="text-danger mr-2"
                      onClick={() => {
                        const confirmBox = window.confirm(
                          "Do you really want to delete " + user.title
                        )
                        if (confirmBox === true) {
                          dispatch(deleteCourse(user._id))
                          dispatch(getAllCourse())
                        }
                      }}> <i><FaTrash /></i> </a>
                    <Link to={`/editcourse/${user._id}`} state={{user:user}}>
                      <i><FaEdit /></i>
                    </Link>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </center>
    </div>
  )
}
