import React ,{useState,useEffect} from 'react'
import Navbar from './Navbar'
import Carosuel from './Carosuel'
import Videos from './Videos'
import Footer from './Footer'
import './Loader.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'


const Home = () => {

  const urlParams = new URLSearchParams(window.location.search);
  // const msisdn = urlParams.get("msisdn");

  const [subscriptionStatus, setSubscriptionStatus] = useState(null);
  const navigate=useNavigate()

  const number = Cookies.get('fitofyy_user');

  
// http://consent.hutch.lk/register-service/VA%3D%3DCQ%3D%3Ddw%3D%3D

    const checkUser=async()=>{
        // console.log('checkuser')

        if(!number || number == undefined || number == null || number == ""){
          console.log(number)
        //  navigate('/login')
        }


        try{
          const res = await axios.get('https://slcallback.fitofyy.com/checkuser',{
            params:{
              msisdn:number,
              service:"Fitofyy"
            }
          })


    
          if(res.data.status == 0){
            Cookies.remove('fitofyy_user')
            // Cookies.remove('user')
            navigate('/login')
          }
         
          
        }
        catch(err){
          console.log(err)
        }
      }
    
      // useEffect(() => {
      //   checkUser()
      // }, [])

      useEffect(()=>{
        const new_user = Cookies.get('new_user_without_login')
        console.log(new_user)
        if(new_user == "" || !new_user || new_user == 'undefined' || new_user == null){
          navigate('/login')
        }
      },[])


  return (
    <div className='bg-black'>
           <Navbar />
            <Carosuel />
            <Videos />
            <Footer />
    </div>  
  )
}

export default Home
