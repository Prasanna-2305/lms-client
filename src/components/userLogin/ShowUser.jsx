import React from 'react'
import { Link } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa'
import { useLocation } from 'react-router-dom';
export default function ShowUser() {
    const location = useLocation()
    const { user } = location.state
    return (
        <div className='row mt-5'>
            <center>
                <div className="col-sm-4">
                    <div className="card bg-black text-white">
                        <div className="card-body">
                            <p> Name  : {user.name}</p>
                            <p> Email : {user.email} </p>
                        </div>
                        <Link to={`/editusers/${user._id}`} state={{ user: user }}>
                            <i className='btn btn-danger'><FaEdit /></i>
                        </Link>
                    </div>
                </div>
            </center>
        </div>
    )
}