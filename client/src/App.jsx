// import logo from './logo.svg';
import {useState, useEffect} from 'react';
import axios from 'axios';
import jwt from 'jwt-decode';
import {Routes, Route} from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
// import {Switch} from 'react-router';
import Cookies from 'universal-cookie';


import './App.css';
import Auth from './views/Auth';
import Events from './views/Events';
// import AuthenticatedRoute from './views/AuthenticatedRoute';
// import UnauthenticatedRoute from './views/UnauthenticatedRoute';


function App() {
    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const cookies = new Cookies();
    // const navigate = useNavigate();
    // const [user, setUser] = useState({
    //     firstName: "nisrine",
    //     lastName: "fukuyama",
    //     email: "nisrine@gmail.com",
    //     password: "mindlike",
    //     confirmPassword: "mindlike"
    // });  

    // const [userLogIn, setUserLogIn] = useState({
    //     email: "",
    //     password: "",
    // });

    // const createUser = (e) => {
    //     e.preventDefault();

    //     axios.post('http://localhost:8000/api/register', {
    //     firstName: user.firstName,
    //     lastName: user.lastName,
    //     email: user.email,
    //     password: user.password,
    //     confirmPassword: user.confirmPassword
    // }, {withCredentials: true} )
    //     .then(res => {
    //         const token = res.data.userToken
    //         console.log(jwt(token));
    //         console.log(res);

    //     })
    //     .catch(err => console.error(err));

        
    // }

    // const logInUser = (e) => {
    //     e.preventDefault();
    //     axios.post('http://localhost:8000/api/login', {
    //         email: userLogIn.email,
    //         password: userLogIn.password
    //     }, {withCredentials: true})
    //     .then(res => {
    //         const token = res.data.userToken
    //         console.log(jwt(token));
    //         console.log(res);

    //     })
    //     .catch(err => console.error(err));
    // }

    // const logout = (e) => {
    //     // e.preventDefault();

    //     axios.get('http://localhost:8000/api/logout', {withCredentials: true} )
    //     .then(res => { console.log(res);})
    //     .catch(err =>{ console.error(err);});
    // }


    // const consoleLogCookie = (e) => {
    //     const token = cookies.get('usertoken')
    //     const userId = jwt(token).id;
    //     console.log(jwt(token).id);

    //     axios.get('http://localhost:8000/api/users/' + userId, {withCredentials: true})
    //     .then(res => { console.log(res.data);})
    //     .catch(err =>{ console.error(err);});
    // }
    
    // const getUsers = (e) => {
    //     e.preventDefault();

    //     axios.get('http://localhost:8000/api/users', {withCredentials: true} )
    //     .then(res => { console.log(res);})
    //     .catch(err =>{ console.error(err);});
    // }


    // const handleChange = (e) => {
    //     setUser({...user, [e.target.name] : e.target.value});
    // }

    // const handleChangeLoggedIn = (e) => {
    //     setUserLogIn({...userLogIn, [e.target.name] : e.target.value});

    // }

    const onLoad = () => {
        const token = cookies.get('usertoken')
        console.log("running load: " + loading);

        if (!token) {
            setLoading(false);
            return;
        }

        const userId = jwt(token).id;
        console.log(jwt(token).id);

        axios.get('http://localhost:8000/api/users/' + userId, {withCredentials: true})
        .then(res => { 
            console.log(res.data); 
            setAuthenticated(true);
            setLoading(false);
        })
        .catch(err =>{ 
            console.error(err);
            setLoading(false);
        });
    }



    // check whether users are logged in
    useEffect( () => {
        onLoad();
    // eslint-disable-next-line
    }, []);

    return (
        <div className="App">
                {/* <div className="container">
                    <div className="d-flex vh-100 align-items-center justify-content-center flex-column fade-in">
                        <div className="row">
                            <div className="col">
                                <div className="card bg-transparent">
                                    <h4 className="card-header p-4">Register</h4>
                                    <div className="card-body">
                                        <form onSubmit={createUser}>
                                            <div className="mb-2">
                                                <label className="form-label">firstName</label><br />
                                                <input
                                                    type="text"
                                                    placeholder='firstName'
                                                    name="firstName"
                                                    value={user.firstName}
                                                    onChange={handleChange}
                                                    className="form-control" />
                                            </div>
                                            <div className="mb-2">
                                                <label className="form-label">lastName</label><br />
                                                <input
                                                    type="text"
                                                    placeholder='lastName'
                                                    name="lastName"
                                                    value={user.lastName}
                                                    onChange={handleChange}
                                                    className="form-control" />
                                            </div>

                                            <div className="mb-2">
                                                <label className="form-label">email</label><br />
                                                <input
                                                    type="text"
                                                    placeholder='email'
                                                    name="email"
                                                    value={user.email}
                                                    onChange={handleChange}
                                                    className="form-control" />
                                            </div>

                                            <div className="mb-2">
                                                <label className="form-label">password</label><br />
                                                <input
                                                    type="password"
                                                    placeholder='password'
                                                    name="password"
                                                    value={user.password}
                                                    onChange={handleChange}
                                                    className="form-control" />
                                            </div>

                                            <div className="mb-2">
                                                <label className="form-label">confirmPassword</label><br />
                                                <input
                                                    type="password"
                                                    placeholder='confirmPassword'
                                                    name="confirmPassword"
                                                    value={user.confirmPassword}
                                                    onChange={handleChange}
                                                    className="form-control" />
                                            </div>



                                            <input type="submit" className="btn btn-primary" />
                                        </form>

                                        <div className="d-flex gap-3 mt-3">
                                            <button className="btn btn-info" onClick={consoleLogCookie} >console log cookies</button>
                                            <button className="btn btn-danger" onClick={logout} >Logout</button>
                                            <button className="btn btn-warning" onClick={getUsers} >Get Users</button>
                                        </div>

                                    </div>
                                </div>

                            </div>

                            <div className="col">
                                <div className="card bg-transparent">
                                    <h4 className="card-header p-4">Login</h4>
                                    <div className="card-body">
                                        <form onSubmit={logInUser}>

                                            <div className="mb-2">
                                                <label className="form-label">email</label><br />
                                                <input
                                                    type="text"
                                                    placeholder='email'
                                                    name="email"
                                                    value={userLogIn.email}
                                                    onChange={handleChangeLoggedIn}
                                                    className="form-control" />
                                            </div>

                                            <div className="mb-2">
                                                <label className="form-label">password</label><br />
                                                <input
                                                    type="password"
                                                    placeholder='password'
                                                    name="password"
                                                    value={userLogIn.password}
                                                    onChange={handleChangeLoggedIn}
                                                    className="form-control" />
                                            </div>

                                            <input type="submit" className="btn btn-primary" value="Login"/>
                                        </form>

                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                </div> */}


            <Routes>
                {/* // * main routes */}
                <Route element={<Auth setAuthenticated = {setAuthenticated} authenticated = {authenticated} loading={loading}/>} path="/" />
                <Route element={  <Events/>} path="/events" />
                <Route element={<Auth setAuthenticated = {setAuthenticated} />} path="/login" />
                {/* <Route element={<Events/>} path="/events" /> */}


                    {/* <UnauthenticatedRoute
                        path="/login"
                        component={Auth}
                        appProps={{ authenticated }}
                    />
                    <AuthenticatedRoute
                        path="/events"
                        component={Events}
                        appProps={{ authenticated }}
                    /> */}
                    {/* <Route component={NotFound} /> */}
            </Routes>





        

        </div>
    );
}

export default App;
