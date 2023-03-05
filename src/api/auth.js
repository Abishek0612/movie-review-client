import client from "./client"

// signup api
export const createUser = async (userInfo) => {
    try {
        const { data } = await client.post('/user/create', userInfo)
        return data;
    } catch (error) {
        const { response } = error;
        if (response?.data) return response.data;

        return { error: error.message || error }
    }
}

// verify email api
export const verifyUserEmail = async (userInfo) => {
    try {
        const { data } = await client.post("/user/verify-email", userInfo)
        return data;
    } catch (error) {
        // console.log(error.response?.data)
        const { response } = error;
        if (response?.data) return response.data;

        return { error: error.message || error };
    }
}

// Signin api
export const signInUser = async (userInfo) => {
    try {
        const { data } = await client.post("/user/sign-in", userInfo)
        return data;
    } catch (error) {
        // console.log(error.response?.data)
        const { response } = error;
        if (response?.data) return response.data;

        return { error: error.message || error };
    }
}

// we are sending this to context/AuthProvider.js
// we are sending token inside the headers
export const getIsAuth = async (token) => {
    try {
        const { data } = await client.get("/user/is-auth", {
            headers: {
                Authorization: 'Bearer ' + token,
                accept: "application/json",
            },
        })
        return data;
    } catch (error) {
        // console.log(error.response?.data)
        const { response } = error;
        if (response?.data) return response.data;

        return { error: error.message || error };
    }
}