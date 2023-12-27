import React from 'react'

const accessDenied = () => {
  return (
    <div className='d-flex justify-content-center'>
        <img width="50%"  src={`${process.env.REACT_APP_PORT}/error/AccessDeniedImage.jpg`} />
    </div>
  )
}

export default accessDenied