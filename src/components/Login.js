import React, {useEffect,useState} from "react";
import logo from '../assets/fitofyy_logo.png'
import login from '../assets/login.png'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {useSelector,useDispatch} from 'react-redux'
// import {setLanguage} from '../Slices/langSlice'
import { toast } from "react-toastify";
import Layout from '../Layouts/Layout'
import Cookies from 'js-cookie'


const Login = () => {

    // const BACKEND_URL='http://localhost:2023';
    const [msisdn, setMsisdn] = useState('');
    const {lang} = useSelector((state)=>state.LanguageSlice)
    const dispatch = useDispatch();
    const navigate=useNavigate()

    


    const checkUser=async()=>{
        // console.log('checkuser')

        // if(!number || number == undefined || number == null || number == ""){
        //   // navigate('/login')
        //   window.location.replace('http://consent.hutch.lk/register-service/VA%3D%3DCQ%3D%3Ddw%3D%3D')
        //  }


        let number = msisdn;
      
        if (typeof number !== 'string') {
          number = String(number);
        }
    
       
        if (number.substring(0, 2) !== '94') {
          
          if (number[0] === '0') {
            number = number.slice(1);
          }
         
          number = '94' + number;
        }
    
        console.log(number, "Formatted Number");
  

        
        console.log(number,"Number-------------------")

        try{
          const res = await axios.get('https://slcallback.fitofyy.com/checkuser',{
            params:{
              msisdn:number,
              service:"Fitofyy"
            }
          })
    
          if(res.data.status == 0){
            // navigate('/login')
            Cookies.remove('fitofyy_user')
            // Cookies.remove('user')
            // window.location.replace('http://consent.hutch.lk/register-service/VA%3D%3DCQ%3D%3Ddw%3D%3D')
            toast.warn("Subscription Expired!!")
          }
          else{
            Cookies.set('fitofyy_user',number,{expires:1})
            Cookies.set('new_user_without_login','no_login',{expires:1});
           setTimeout(()=>{
            navigate('/home')
           },2000)
          }
        }
        catch(err){
          console.log(err)
        }
      }
    
     



    const handleMsisdnChange = (e) => {
        setMsisdn(e.target.value);
    };
    

    const handleSubmit = (e) => {
        e.preventDefault(); 
        checkUser()
    };

    const handleSubscribe=()=>{
      window.location.replace('http://consent.hutch.lk/register-service/VA%3D%3DCQ%3D%3Ddw%3D%3D')
    }

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
          document.body.style.overflow = 'unset';
        };
      }, []);
  return (
    
<Layout>


<div className="container mx-auto rounded-lg  flex justify-center px-5  ">
<div class="max-w-sm bg-gray-100 flex-col rounded-lg shadow dark:bg-gray-100 ">
<a >
        <img  src={login} alt="" className="w-full h-[150px] rounded-t-lg" />
    </a>
    <a>
        {/* <img  src={logo} alt="" className="w-full h-[90px]" /> */}
    </a>
 
    <div class="p-5">
        

    <form class="space-y-3" onSubmit={handleSubmit} >

        <div>
            <h1 className="text-md text-gray-800 font-bold">{lang=='en'? 'Sign in to watch unlimited videos!': lang == 'sin' ? 'අසීමිත වීඩියෝ නැරඹීමට පුරන්න!': lang == 'ta' ?'வரம்பற்ற வீடியோக்களைப் பார்க்க உள்நுழைக!':''}</h1>
            <label for="msisdn" class="block mb-2 mt-3 text-sm font-medium text-gray-600 dark:text-gray-600">{lang =='en' ?'Enter your number' : lang =='sin'? 'ඔබගේ අංකය ඇතුලත් කරන්න' : lang == 'ta' ? 'உங்கள் எண்ணை உள்ளிடவும்' :''}</label>
            <input type="number" name="msisdn" id="msisdn" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-50 dark:border-gray-300 dark:placeholder-gray-400 dark:text-gray-900" placeholder="9478*******" required
            
            value={msisdn} 
            onChange={handleMsisdnChange} 
            />
        </div>
      
        
        <button type="submit" class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{lang =='en'?'Login to your account':lang == 'sin' ? 'ඔබගේ ගිණුමට පිවිසෙන්න' : lang == 'ta' ? 'உங்கள் கணக்கில் உள்நுழைக' :''}</button>
        <p className="text-sm font-medium ">{lang == 'en' ? 'If not subscribed Click to Subscribe:' : lang == 'ta' ? 'குழுசேரவில்லை என்றால், குழுசேர கிளிக் செய்யவும்:': lang == 'sin' ? 'දායක වී නොමැති නම් දායක වීමට ක්ලික් කරන්න:':''}</p>
        <button class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={handleSubscribe}>{lang =='en'?'Subscribe':lang == 'sin' ? 'දායක වන්න' : lang == 'ta' ? 'பதிவு' :''}</button>
     

    </form>
</div>

      
    </div>
</div>
    </Layout>




  );
};

export default Login;
