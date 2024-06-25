import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Home from './Home';
import Cookies from 'js-cookie';

const CheckCookieRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const cookie = Cookies.get('user'); // Get the specific cookie
console.log("cookies",cookie)
    if (!cookie || cookie==null || cookie==undefined) {
      
      Cookies.set('user', 'subscribed');
      Cookies.set('new_user_without_login','no_login',{expires:1});
      window.location.href = 'http://consent.hutch.lk/register-service/VA%3D%3DCQ%3D%3Ddw%3D%3D';
    } else if (cookie == 'subscribed') {
     
      navigate('/home');
    }
  }, [navigate]);

  // Render Home if the cookie exists and does not need redirection
  return null;
};

export default CheckCookieRedirect;
