import React from 'react'
import image from '../userLogin/Welcome.jpg'
export default function Welcome() {
  return (
    <div>
        <img src={image} className="img-fluid w-50 h-20" alt="welcome"/>
    </div>
  )
}
