import React, { useState } from 'react'
import { forgetPassword } from '../../api/auth'
import { useNotification } from '../../custom-hooks'
import { isValidEmail } from '../../utils/helper'
import { commonModalClasses } from '../../utils/theme'
import Container from '../Container'
import CustomLink from '../CustomLink'
import FormContainer from '../form/FormContainer'
import FormInput from '../form/FormInput'
import Submit from '../form/Submit'
import Title from '../form/Title'

export default function ForgetPassword() {

  const [email, setEmail] = useState('')

  const handleChange = ({ target }) => {
    const { value } = target;
    setEmail(value)
  }

  const { updateNotification } = useNotification()

  const handleSubmit = async (e) => {
    e.preventDefault()
    //forgetpassword coming from api/auth.js
    if (!isValidEmail(email)) return updateNotification('error', 'Invalid email!')
    const { error, message } = await forgetPassword(email)

    if(error) return updateNotification('error', error);

    updateNotification('success', message)
  }



  return (
    <FormContainer>
      <Container >
        <form onSubmit={handleSubmit} className={commonModalClasses + ' w-96'}>
          <Title >Please Enter Your Email </Title>
          <FormInput onChange={handleChange} value={email} label='Email' placeholder='abi@email.com' name='email' />
          <Submit value='Send Link' />

          <div className="flex justify-between">
            <CustomLink to='/auth/signin' >Sign in</CustomLink>
            <CustomLink to='/auth/signup' >Sign up</CustomLink>


          </div>
        </form>
      </Container>
    </FormContainer>
  )
}
