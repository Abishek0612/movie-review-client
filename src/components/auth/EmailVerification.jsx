//spin-button-none it comes from index.css from tailwind css to avoid spin button in the input field
// when it has to accept number 

import { useLocation, useNavigate } from 'react-router-dom';
import React, { useEffect, useRef, useState } from 'react'
import { commonModalClasses } from '../../utils/theme';
import Container from '../Container'
import FormContainer from '../form/FormContainer';
import Submit from '../form/Submit'
import Title from '../form/Title'
import { verifyUserEmail } from '../../api/auth';
import { useAuth, useNotification } from '../../custom-hooks';

const OTP_LENGTH = 6;


// isNan :if it is not a number return true
// parseInt : pass it if its empty string or integer in string format
// this method will handle the valid otp or not
const isValidOTP = (otp) => {
  let valid = false;

  for (let val of otp) {
    valid = !isNaN(parseInt(val))
    if (!valid) break;
  }

  return valid
}

let currentOTPIndex;

export default function EmailVerification() {

  const [otp, setOtp] = useState(new Array(OTP_LENGTH).fill(''));
  const [activeOtpIndex, setActiveOtpIndex] = useState(0)

  const {isAuth, authInfo} =useAuth()
  const {isLoggedIn} = authInfo

  const inputRef = useRef()

  // useNotification coming from custom-hooks /index.js
  const { updateNotification } = useNotification()

  // when ever we want to verify the email we need to verify this user id and we need to verify userid and otp  to verify the email
  const { state } = useLocation();
  const user = state?.user

  const navigate = useNavigate()

  const focusNextInputField = (index) => {
    setActiveOtpIndex(index + 1)
  }

  const focusPrevInputField = (index) => {
    let nextIndex;
    const diff = index - 1
    nextIndex = diff !== 0 ? diff : 0;
    setActiveOtpIndex(nextIndex)
  }

  const handleOtpChange = ({ target }) => {
    const { value } = target;
    const newOtp = [...otp];
    newOtp[currentOTPIndex] = value.substring(value.length - 1, value.length);

    if (!value) focusPrevInputField(currentOTPIndex)
    else focusNextInputField(currentOTPIndex)

    setOtp([...newOtp]);
  }

  useEffect(() => {
    inputRef.current?.focus();
  }, [activeOtpIndex])

  const handleKeyDown = ({ key }, index) => {
    currentOTPIndex = index;
    if (key === 'Backspace') {
      focusPrevInputField(currentOTPIndex)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!isValidOTP(otp)) return updateNotification('error', 'invalid OTP')

    // capital OTP coming from backend we mentioned it in capital  in the backend
    //submit otp
    // inside the userResponse we will be having that token coming from backend
    const { error, message, user: userResponse } = await verifyUserEmail({ OTP: otp.join(''), userId: user.id })
    // "error" coming from NotficationProvider type is error
    if (error) return updateNotification('error', error)

    // "success" coming from NotficationProvider type is error
    updateNotification('success', message)
    localStorage.setItem('auth-token', userResponse.token)
    isAuth();
  }

  // if there is no user it will land in to page not found
  useEffect(() => {
    if (!user) navigate('/not-found')
    // if we log in we will be go to home page isLoggedIn imported at the top
    if (isLoggedIn) navigate('/')
  }, [user, isLoggedIn])

  if (!user) return null;

  return (
    <FormContainer >
      <Container >
        <form onSubmit={handleSubmit} className={commonModalClasses}>
          <div>

            <Title >Please enter the OTP to verify your account</Title>
            <p className='text-center dark:text-dark-subtle text-light-subtle' >OTP has been sent to your email</p>
          </div>

          <div className='flex justify-center items-center space-x-4'>
            {
              otp.map((_, index) => {
                return (
                  <input key={index} type='number' onKeyDown={(e) => handleKeyDown(e, index)} onChange={handleOtpChange}
                    value={otp[index] || ''} ref={activeOtpIndex === index ? inputRef : null}
                    className='w-12 h-12 border-2 dark:border-dark-subtle border-light-subtle
              rounded dark:focus:border-white focus:border-primary 
              bg-transparent outline-none text-center
               dark:text-white text-primary font-semibold
              text-xl spin-button-none' />
                )
              })
            }
          </div>

          <Submit value='Verify Account' />

        </form>
      </Container>
    </FormContainer>
  )
}
