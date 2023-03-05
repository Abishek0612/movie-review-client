import React, { useState } from 'react'
import { createContext } from 'react'

export  const NotificationContext = createContext()

// we created this timeoutId variable coz there will be lag in setTimeout 
// (what lag: if u click constantly notification gets disappear automatically)
// so to stop that if u click constantly notification stays there so we are using if statement
let timeoutId  ;
export default function NotificationProvider({children}) {
  const [notification, setNotification] = useState('')
  const [classes, setClasses] = useState('')

  const updateNotification = (type, value) => {
    if(timeoutId) clearTimeout(timeoutId);
    
    switch (type) {
      case "error":
        setClasses('bg-red-500');
        break;
      case "success":
        setClasses('bg-green-500');
        break;
      case "warning":
        setClasses('bg-orange-500');
        break;
      default: setClasses("bg-red-500");
    }
    setNotification(value)
   timeoutId = setTimeout(() => {
      setNotification('')
    }, 3000)
  }


  return (
    <NotificationContext.Provider value={{ updateNotification }}>
      {children}
      {
        notification && (
          <div className='fixed left-1/2 -translate-x-1/2 top-24 '>
            <div className='bounce-custom shadow-md   shadow-gray-400 rounded'>
              <p className={classes + ' text-white px-4 py-2 font-semibold '}>{notification}</p>

            </div>
          </div>
        )
      }
    </NotificationContext.Provider>
  )
}


// we are creating setNotification using useState
// we are creating setClasses using useState
// we are passing type and value in updateNotification
// type will be that error message
// value will be notification which we are passing to <p> tag
// seting setTimeout for 3sec after 3 sec it willl automatically disappear
// so we are setting setNotification to empty string to disappear after 3 sec
// notification && () we are using this coz if there is notification we will render it
