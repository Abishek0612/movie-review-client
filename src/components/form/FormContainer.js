import React from 'react'

export default function FormContainer ({  children }) {
  return (
    <div className='fixed inset-0  dark:bg-primary -z-10 flex 
    justify-center bg-white  items-center'>
        {children}
    </div>
  )
}
