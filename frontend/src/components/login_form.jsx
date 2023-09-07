import { useRef, useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from '../api/axios';

const LOGIN_URL = '/login';

const Login = () => {
    const { setAuth } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');

    useEffect( () => {
        userRef.current.focus();
    },[])

    useEffect( () => {
        setErrMsg('');
    },[user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(LOGIN_URL, 
                {user: user, password: pwd},
                {
                    headers: { 
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': 'http://192.168.0.111:1234/'
                    },
                    withCredentials: false
                }
            );

            // console.log(JSON.stringify(response?.data));
            // console.log(JSON.stringify(response));

            const accessToken = response?.data?.accessToken;
            // const roles = response?.data?.roles;

            setAuth({ user, pwd, accessToken });
            setUser('');
            setPwd('');
            navigate(from, { replace: true });
        } catch (err) {
            if (!err?.response) {
                setErrMsg('Server did not respond.');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing username or password.');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login failed');
            }

            errRef.current.focus();
        }
    }

    return (
            <div className="login-form">
                <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                <h1>Sign In</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="username">Username:</label>
                    <input 
                        type="text"
                        id="username"
                        ref={userRef}
                        autoComplete="off"
                        onChange={(e) => setUser(e.target.value)}
                        value={user}
                        required
                    />
                    
                    <label htmlFor="password">Password:</label>
                    <input 
                        type="password"
                        id="password"
                        onChange={(e) => setPwd(e.target.value)}
                        value={pwd}
                        required
                    />

                    <button>Sign in</button>
                </form>

                <p>
                    Need an account?<br />
                    <span className="line">
                        {/** Put router link here */}
                        <a href="#">Sign up</a>
                    </span>
                </p>
            </div>
    )
}

export default Login;