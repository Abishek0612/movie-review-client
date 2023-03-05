import React, { createContext, useEffect } from 'react'

export const ThemeContext = createContext()

const defaultTheme = 'light';
const darkTheme = 'dark'

export default function ThemeProvider({ children }) {

    const toggleTheme = () => {

        const oldTheme = getTheme()
        const newTheme = oldTheme === defaultTheme ? darkTheme : defaultTheme;

      updateTheme(newTheme, oldTheme)
    }
    // We are setting the dark and light theme in localstorage coz if we refresh the page
    // it gets refresh so to store the theme best way to use is local storage

    // storing theme name as the value inside local storage to get back from localStorage use same name called theme inside localStorage getItem

    useEffect(() => {
        const theme = getTheme()
        if(!theme) updateTheme(defaultTheme)
        else
        updateTheme(theme);
    }, [])
    // wen we visit the page again to get the same theme back we use useEffect localStorage.getItem
    // to get back the same theme color

    return (
        <div>
            <ThemeContext.Provider value={{ toggleTheme }}>
                {children}
            </ThemeContext.Provider>
        </div>
    )
}

const getTheme = () => {
    return localStorage.getItem("theme")
}


const updateTheme = (theme, themeToRemove) => {

    if(themeToRemove)document.documentElement.classList.remove
    (themeToRemove)

    document.documentElement.classList.add(theme);
    localStorage.setItem("theme", theme);
}