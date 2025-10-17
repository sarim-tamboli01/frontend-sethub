import React, { useEffect } from 'react';

import {useNavigate,useRoutes} from 'react-router-dom';


//pages List

import Dashboard from './components/dashboard/Dashboard';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Profile from './components/user/Profile';
import CreateRepo from './components/repo/CreateRepo';

//authContext
import {useAuth} from "./authContext"

const ProjectRoutes =() =>{

    const  {currentUser,setCurrentUser} = useAuth();
    const navigate = useNavigate();

    useEffect(()=>{
        const UserIdFromStorage = localStorage.getItem("userId");
        if(UserIdFromStorage && !currentUser){
            setCurrentUser(UserIdFromStorage);
        }
        
        // If no user and not on auth/signup pages, redirect to auth
        if(!UserIdFromStorage && !["/auth", "/signup"].includes(window.location.pathname)){
            navigate("/auth");
        }

        // If user exists and on auth page, redirect to dashboard
        if(UserIdFromStorage && window.location.pathname === "/auth"){
            navigate("/");
        }
    },[currentUser,navigate,setCurrentUser])

    let element = useRoutes([
        {
            path:"/",
            element:<Dashboard/>
        },
        {
            path:"/create",
            element:<CreateRepo/>
        },
        {
            path:"/auth",
            element:<Login/>
        },
        {
            path:"/signup",
            element:<Signup/>       
        },
        {
            path:"/profile",
            element:<Profile/>
        }
    ])
    return element;
}

export default  ProjectRoutes;