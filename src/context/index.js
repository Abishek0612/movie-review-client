import React from 'react'
import AuthProvider from './AuthProvider'
import ThemeProvider from './ThemeProvider'
import NotificationProvider from './NotificationProvider'


export default function ContextProvider({ children }) {
    return (
        <NotificationProvider>
            <AuthProvider>
                <ThemeProvider >{children}</ThemeProvider>
            </AuthProvider>
        </NotificationProvider>
    )
}
