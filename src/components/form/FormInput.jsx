import React from 'react'

export default function FormInput({name,placeholder, label,...rest}) {
  return (
    <div>
         {/* for reversing label to top in tailwind css */}
         <div className='flex flex-col-reverse'>
                    <input  name={name}  className='bg-transparent rounded border-2
                     dark:border-dark-subtle border-light-subtle w-full text-lg
                      outline-none dark:focus:border-white focus:border-primary p-1 dark:text-white peer transition'
                       placeholder={placeholder} {...rest}/>

                    <label className='font-semibold dark:text-dark-subtle :text-light-subtle text-light-subtle
                     dark:peer-focus:text-white peer-focus:text-primary transition   self-start' htmlFor='email' >{label}</label>
                    

                </div>
    </div>
  )
}
