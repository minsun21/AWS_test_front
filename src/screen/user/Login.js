import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import { GoogleLogin } from "react-google-login";
import Axios from "axios";
import { clientId } from "./config/config";
import { POST_LIST } from "../../common/Url";

const config = {
    headers: {
        "Content-Type": "application/json; charset=utf-8",
    },
};

function Login() {
    const history = useHistory();

    const responseGoogle = async (response) => {
        console.log(1, response);
        let jwtToken = await Axios.post(
            "/oauth/jwt/google",
            JSON.stringify(response),
            config
        );
        if (jwtToken.status === 200) {
            console.log(2, jwtToken.data);
            localStorage.setItem("jwtToken", jwtToken.data);
            history.push(POST_LIST);
        }
    };

    return (
        <div>
            <GoogleLogin
                clientId={clientId}
                buttonText="Login"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={"single_host_origin"}
            />
        </div>
    )
}

export default Login
