import React, { createContext, useEffect, useState } from 'react'
import { getIsAuth, signInUser } from '../api/auth'

// AuthProvider.js is for sign in purpose ...i mean this file only
// exporting it to custom-hooks/index.js
export const AuthContext = createContext()

const defaultAuthInfo = {
    profile: null,
    isLoggedIn: false,
    isPending: false,
    error: ''
}

export default function AuthProvider({ children }) {

    const [authInfo, setAuthInfo] = useState({ ...defaultAuthInfo })


    // signInUser coming from api/auth.js
    //  we are passing email and password inside signInUser coz from backend we are accepting inside body email and password in controllers.js in backend
    // isPending : if we want to render any indicator wen ever we are in the pending state so isPending is used
    const handleLogin = async (email, password) => {
        setAuthInfo({ ...authInfo, isPending: true })
        const { error, user } = await signInUser({ email, password })
        if (error) {
            return setAuthInfo({ ...authInfo, isPending: false, error });
        }

        setAuthInfo({ profile: { ...user }, isPending: false, isLoggedIn: 'true', error: '' })

        // token coming from backend
        localStorage.setItem('auth-token', user.token)
    }

    const isAuth = async () => {
        const token = localStorage.getItem('auth-token')
        if (!token) return;

        setAuthInfo({ ...authInfo, isPending: true })
        const { error, user } = await getIsAuth(token)
        if (error) {
            return setAuthInfo({ ...authInfo, isPending: false, error })
        }

        setAuthInfo({
            profile: { ...user },
            isPending: false, isLoggedIn: true, error: ''
        })

    }

    // handling logout 
    const handleLogout = () => {
        localStorage.removeItem('auth-token')
        setAuthInfo({ ...defaultAuthInfo })
    }


    useEffect(() => {
        isAuth()
    }, [])

    // handleLogout, isAuth
    return (
        <AuthContext.Provider value={{ authInfo, handleLogin, handleLogout, isAuth }}>
            {children}
        </AuthContext.Provider>
    )
}
