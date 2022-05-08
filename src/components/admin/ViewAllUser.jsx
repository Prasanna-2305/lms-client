import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAllUser } from '../../redux/actions/getUser';
import {FaTrash} from "react-icons/fa"
import { deleteUser } from '../../redux/actions/getUser';
export default function Viewalluser() {
    const users = useSelector((state) => state.users.user)
    const dispatch = useDispatch();
    const newusers = Array.from(users)
    useEffect(() => {
        dispatch(getAllUser())
    })
    return (
        <div style={{overflowX : 'auto',fontSize: '14px'}}>
            <center><br /><br /><br />
                <table className='container table table-striped table-dark'>
                    <thead>
                        <tr>
                            <th scope='col'>Name</th>
                            <th scope='col'>Email</th>
                            <th scope='col'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            newusers && newusers.map((user, index) => (
                                <tr key={index}>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <a className="text-danger mr-2"
                                            onClick={() => {
                                                const confirmBox = window.confirm(
                                                    "Do you really want to delete " + user.name
                                                )
                                                if (confirmBox === true) {
                                                    dispatch(deleteUser(user._id))
                                                    dispatch(getAllUser())
                                                }
                                            }}> <div><FaTrash /></div> </a>
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
