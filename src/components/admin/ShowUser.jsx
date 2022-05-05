import React from 'react'
import { useLocation } from 'react-router-dom'

export default function ShowAdminUser() {
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
            </div>
        </div>
    </center>
</div>
  )
}
