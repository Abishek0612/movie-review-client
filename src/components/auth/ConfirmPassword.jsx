import React, { useEffect, useState } from 'react'
import { ImSpinner3 } from 'react-icons/im'
// this hook useSearchParams is used for extract  the token and the Id from the url
import { useNavigate, useSearchParams } from 'react-router-dom'
import { resetPassword, verifyPassResetToken } from '../../api/auth'
import { useNotification } from '../../custom-hooks'
import { commonModalClasses } from '../../utils/theme'
import Container from '../Container'
import FormContainer from '../form/FormContainer'
import FormInput from '../form/FormInput'
import Submit from '../form/Submit'
import Title from '../form/Title'

// confirm password is for reset password
export default function ConfirmPassword() {
  //for seting up new password we will use setPassword
  const [password, setPassword] = useState({
    one: '',
    two: ''
  })

  // if it is verifying
  const [isVerifying, setIsVerifying] = useState(true)
  const [isValid, setIsValid] = useState(false)
  const [searchParams] = useSearchParams()
  // inside the search  params we will use .notation coz it is an object inside it as many properties
  const token = searchParams.get('token')
  const id = searchParams.get('id')
  // console.log(token, id);

  const { updateNotification } = useNotification()

  const navigate = useNavigate()
  // wen we give forgot password we will get a token like this to reset password
  // http://localhost:3000/reset-password?token=1d494b6a7ab0f43800e63b14a1d3734e323560e05a25a18e315d0ebd4afb&id=6403aa4a122bda45bf4ff108


  useEffect(() => {
    isValidToken()
  }, [])

  // lets check the token isValid
  // error coming from backend
  const isValidToken = async () => {
    const { error, valid } = await verifyPassResetToken(token, id) //verifyPassResetToken coming from api/auth.js
    setIsVerifying(false);
    if (error) {
      navigate('/auth/reset-password', { replace: true })
      return updateNotification('error', error)
    }

    if (!valid) {
      setIsValid(false)
      setIsVerifying(false);
      return navigate('/auth/reset-password', { replace: true })
    }

    // already we are returning so dont need else block
    setIsValid(true)
  }

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setPassword({ ...password, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!password.one.trim())
      return updateNotification('error', 'Password is missing!')

    if (password.one.trim().length < 8)
      return updateNotification('error', 'Password must be 8 characters long!')

    if (password.one !== password.two)
      return updateNotification('error', 'Password do not match!')

    //resetpassword coming from auth/api.js , newPassword and userId coming from backend 
    const { error, message } = await resetPassword({ newPassword: password.one, userId: id, token })

    if (error)
      return updateNotification("error", error)

    updateNotification('success', message)
    navigate('/auth/signin', { replace: true })
  };

  // if it is verifying we will render this <h1>
  if (isVerifying) return (
    <FormContainer>
      <Container>
        <div className='flex space-x-2 items-center'>
          <h1 className='text-4xl font-semibold dark:text-white text-primary'>
            Please wait we are verifying your token</h1>
          <ImSpinner3 className='animate-spin text-4xl  dark:text-white text-primary' />
        </div>
      </Container>
    </FormContainer>
  )

  // if the token is not valid we will render it
  if (!isValid) return (
    <FormContainer>
      <Container>
        <h1 className='text-4xl font-semibold dark:text-white text-primary'>
          Sorry the token is invalid!</h1>
      </Container>
    </FormContainer>
  )

  // if everything is fine we will render this form to reset new password
  //password and one and two coming from top from useState
  return (
    <FormContainer >
      <Container>
        <form onSubmit={handleSubmit} className={commonModalClasses + ' w-96 '}>
          <Title >Enter New Password</Title>
          <FormInput label='New Password' value={password.one} onChange={handleChange}
            placeholder='********' name='one' type='password' />

          <FormInput label='Confirm Password' value={password.two} onChange={handleChange}
            placeholder='********' name='two' type='password' />

          <Submit value='Confirm Password' />
        </form>
      </Container>
    </FormContainer>
  )
}
