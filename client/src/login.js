import React, { useEffect, useState } from 'react'
import SignUp from './SignUp';
import io from "socket.io-client";
import {
    BrowserRouter,
    Routes,
    Route,
    Link
} from "react-router-dom";

const socket = io.connect("http://localhost:3001");

const Login = () => {
    const [username, setUserame] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [allEntry, setAllEntry] = useState([]);
    const [newUser, setNewUser] = useState(false);
    const [status, setStatus] = useState('');
    const [newPage, setNewPage] = useState(false);
    const [linker, setLinker] = useState(false);
    const [Data,setData]=useState(null);
    const formSubmit = (e) => {
        e.preventDefault();
        const newEntry = {
            Email: email,
            Password: password,
            Username: username
        }
        setAllEntry([...allEntry, newEntry]);
        socket.emit("loginSubmit", newEntry);
        socket.on('loginStatus', (data) => {
            setStatus(data);
            if(data==="Logged in successfully."){
                setNewPage(true);
                setLinker(true);
                socket.emit('getAlreadyJoinedRooms',newEntry);
            }
        })
    }
    useEffect(()=>{
        socket.on('takeAlreadyJoinedRooms',(data)=>{
            console.log(data);
            console.log('Data fetched successfully.');
        })
    },[socket])
    function setUser() {
        setNewUser(false);
    }
    function opnSignUp() {
        setNewUser(true);
    }

    useEffect(()=>{

    },[linker])

    return (
        !newUser ? (
            <div>
                <div className="login">
                    <h1 className="head">
                        LOGIN
                    </h1>
                    <hr />
                    <div className="logindetails">Please enter your following details to login:</div>
                    <div className="form">
                        <form action="" onSubmit={formSubmit}>
                            <div className="username">
                                <label htmlFor='username'>Username:</label>
                                <br />
                                <input
                                    className="user"
                                    type='text'
                                    name='username'
                                    id='username'
                                    placeholder='Username'
                                    autoComplete='name'
                                    value={username}
                                    onChange={(e) => setUserame(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="email">
                                <label htmlFor='email'>Email:</label>
                                <br />
                                <input
                                    className="user"
                                    type='email'
                                    name='email'
                                    id='email'
                                    placeholder='Email'
                                    autoComplete='email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="password">
                                <label htmlFor='password'>Password:</label>
                                <br />
                                <input
                                    className="user"
                                    type='password'
                                    name='password'
                                    id='password'
                                    placeholder='Password'
                                    autoComplete='password'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>

                            {!linker && (<button className="button" onClick={formSubmit}>Log-in</button>)}

                            {linker && <button style={{ backgroundColor: "dodgerblue", border: "none" }}><Link className="nav-link active" aria-current="page" to="/Main" style={{ color: "white" }} Uname={username}>Go To Main</Link></button>}


                            <div >
                                <button className="newUser" onClick={opnSignUp}>New User? SignUp here!</button>
                            </div>
                        </form>
                    </div>
                    <div>
                        {
                            allEntry.map((currentelem) => {
                                return (
                                    <div>
                                        <p>
                                            {currentelem.Username} {status}
                                        </p>
                                    </div>
                                );
                            })
                        }
                    </div>

                </div>
            </div>):(
            <div>
                <SignUp />
            </div>
        )
    );
}

export default Login