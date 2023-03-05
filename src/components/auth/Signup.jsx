import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createUser } from '../../api/auth'
import { useNotification } from '../../custom-hooks'
import { commonModalClasses } from '../../utils/theme'
import Container from '../Container'
import CustomLink from '../CustomLink'
import FormContainer from '../form/FormContainer'
import FormInput from '../form/FormInput'
import Submit from '../form/Submit'
import Title from '../form/Title'


const validateUserInfo = ({ name, email, password }) => {

  const isValidEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const isValidName = /^[a-z A-Z]+$/;

  if (!name.trim()) return { ok: false, error: 'Name is missing!' }
  if (!isValidName.test(name)) return { ok: false, error: 'Invalid name!' }

  if (!email.trim()) return { ok: false, error: 'Email is missing!' }
  if (!isValidEmail.test(email)) return { ok: false, error: 'Invalid email!' }

  if (!password.trim()) return { ok: false, error: 'Password is missing!' };
  if (password.length < 8) return { ok: false, error: "Password must be 8 characters long!" }

  return { ok: true }
}


export default function Signup() {

  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate()

  // useNotification coming from custom-hooks /index.js
  const {updateNotification} = useNotification();

  const handleChange = ({ target }) => {
    const { value, name } = target;
    setUserInfo({ ...userInfo, [name]: value })
    // console.log(target.value, target.name)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { ok, error } = validateUserInfo(userInfo)

    // "error" coming from NotficationProvider type is error
    if (!ok) return updateNotification("error" ,error)

    const response = await createUser(userInfo)
    if (response.error) return console.log(response.error);

                                        //  coming from backend
    navigate('/auth/verification', { state: { user: response.user }, replace: true})
    
  }
  //destructure it to pass it to formInputs as value
  const { name, email, password } = userInfo


  return (
    <FormContainer >
      <Container >
        <form onSubmit={handleSubmit} className={commonModalClasses + ' w-72'} >
          <Title >Sign up</Title>
          <FormInput value={name} onChange={handleChange}
            label='Name' placeholder='Abi'
            name='name' />

          <FormInput value={email} label='Email' onChange={handleChange}
            placeholder='abi@email.com'
            name='email' />

          <FormInput value={password} label='Password'
            placeholder='********' type='password' onChange={handleChange}
            name='password' />

          <Submit value='Sign up' />

          <div className="flex justify-between">
            <CustomLink to='/auth/forget-password' >Forget password</CustomLink>
            <CustomLink to='/auth/signin' >Sign in</CustomLink>


          </div>
        </form>
      </Container>
    </FormContainer>
  )
}
