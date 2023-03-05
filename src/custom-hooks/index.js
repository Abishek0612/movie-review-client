//custom-hook Theme for dark and light mode
//custom-hook AuthContext coming AuthProvider.js 
//custom-hook Notifification for succes, error , warning notification and import useNotification where ever required in which pages

import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { NotificationContext } from "../context/NotificationProvider";
import { ThemeContext } from "../context/ThemeProvider";

export const useTheme = () => useContext(ThemeContext)
export const useNotification = () => useContext(NotificationContext)
export const useAuth = () => useContext(AuthContext)