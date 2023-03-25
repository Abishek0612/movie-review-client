import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../custom-hooks";
import Container from "../Container";

export default function NotVerified() {
    const { authInfo } = useAuth()
    //we are fetching isLoggedIn from authInfo
    const { isLoggedIn } = authInfo;
    //if ther is profile just fetch this isVerified from this profile
    const isVerified = authInfo.profile?.isVerified
    //profile is null check in AuthProvider.js

    const navigate = useNavigate()

    const navigateToVerification = () => {
        navigate('/auth/verification', { state: { user: authInfo.profile } })
        //state coming from EmailVerification.js
    }


    //if user is not verified in the database we will render this form 
    return <Container>
        {isLoggedIn && !isVerified ? (<p className="text-lg text-center bg-blue-50 p-2">
            It looks like you have't verified your account,
            <button onClick={navigateToVerification} className="text-blue-500 font-semibold hover:underline">
                click here to verify your account</button>
        </p>
        ) : null}
    </Container>
}