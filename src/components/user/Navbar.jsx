import React from 'react'
import { BsFillSunFill } from "react-icons/bs"
import Container from '../Container'
import { Link } from 'react-router-dom';
import { useAuth, useTheme } from '../../custom-hooks';

const Navbar = () => {
  const { toggleTheme } = useTheme();
  // toggle theme is coming from ThemeProvider.js coz imported ThemeProvider.js inside custom-hooks 
  // so we are importing here like const { toggleTheme} = useTheme( )
  const { authInfo } = useAuth()
  // we are destructuring isLoggedIn coz when we log in we will have log out button
  const { isLoggedIn } = authInfo;

  return (
    <div className="bg-secondary shadow-sm shadow-gray-500 ">
      <Container className="  p-2 ">
        <div className="flex justify-between items-center">

          <Link to='/'>
            <img src='https://tse2.mm.bing.net/th?id=OIP.mEQgtCH7_To-npeBnV_P-gHaE8&pid=Api&P=0' width='30px' className='h-10' alt='' />
          </Link>
          <ul className='flex items-center space-x-4'>
            <li>
              <button className='dark:bg-white bg-dark-subtle p-1 rounded' >
                <BsFillSunFill onClick={toggleTheme} className='text-secondary' size={24} />
              </button>
            </li>
            <input type='text' className='border-2 border-dark-subtle p-1 rounded 
             bg-transparent text-xl outline-none focus:border-white transition text-white'

              placeholder='search...' />
            <li>
              {isLoggedIn ? (
                <button className='text-white font-semibold text-lg'>
                  Log out
                </button> 
                )
                : (
                  <Link className='text-white font-semibold text-lg' to='/auth/signin'>
                    Login
                  </Link>
                )}
            </li>
          </ul>
        </div>
      </Container>
    </div>
  )
}

export default Navbar