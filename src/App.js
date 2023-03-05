import { Route, Routes } from 'react-router-dom';
import './App.css';
import ConfirmPassword from './components/auth/ConfirmPassword';
import EmailVerification from './components/auth/EmailVerification';
import ForgetPassword from './components/auth/ForgetPassword';
import Signin from './components/auth/Signin';
import Signup from './components/auth/Signup';
import NotFound from './components/NotFound';
import Navbar from './components/user/Navbar';
import Home from './Home';

function App() {
  return (
    <>
      <Navbar />
      
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/auth/signin' element={<Signin />} />
        <Route path='/auth/signup' element={<Signup />} />
        <Route path='/auth/verification' element={<EmailVerification />} />
        <Route path='/auth/forget-password' element={<ForgetPassword />} />
        <Route path='/auth/confirm-password' element={<ConfirmPassword />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>

  )
}

export default App;
