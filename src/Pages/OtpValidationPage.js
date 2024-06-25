import React,{useState} from 'react'
import SubLayout from '../Layouts/SubLayout'
import Layout from '../Layouts/Layout'
import classes from './OtpValidation.module.css'
import {Link} from 'react-router-dom'
import { useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useLocation} from 'react-router-dom'
import axios from 'axios';
import Lottie from "lottie-react";
import Loader from '../Animations/Loader.json'
import {useNavigate} from 'react-router-dom'
import Cookies from 'js-cookie'


const OtpValidationPage = () => {
    const [input1,setInput1] = useState();
    const [input2,setInput2] = useState();
    const [input3,setInput3] = useState();
    const [input4,setInput4] = useState();
   
    const [loading,setLoading] = useState(false);

    const {lang} = useSelector((state) => state.LanguageSlice)
    const location = useLocation();
    const number = location.state?.number
    console.log(number)

    const navigate = useNavigate();

    const handleSubmit=async(e)=>{
        e.preventDefault();
        console.log(input1,input2,input3,input4)
        const otp = input1+input2+input3+input4;

        if(otp.length !== 4){
          toast.error("FILL CORRECT OTP!!");
          handleClear();
          return;
        }
        

        const data ={
          msisdn:number,
          serviceName:"Fitofyy",
          OTP:otp
        }
        try{
          setLoading(true);
          const res = await axios.post('http://148.251.88.109:5495/register-otp',data);
          setLoading(false);
          console.log(res.data,'data')

          // toast.success(res);
          
          if((res.data.code && (res.data.code == 0 || res.data.code == 302))  || (res.code && (res.code == 0 || res.code == 302))){
            // console.log(res.data.message)
            toast.success(res.dmessage);
            Cookies.set('fitofyy_user',number);
            navigate('/')
          }
          // else{
          //   toast.error(res.data.message)
          // }
        }
        catch(err){
          // toast.error(err.message);
          // console.log(err,'err')
          console.log(err,'err')
          toast.error(err.response.data.message || err.message);
          setLoading(false)
        }
        


        // console.log(otp)
        setInput1('');
        setInput2('');
        setInput3('');
        setInput4('');
       
    }

    const handleClear=()=>{
        setInput1('');
        setInput2('');
        setInput3('');
        setInput4('');
        
    }

    const handleInputChange = (e, setInput, nextFieldId, prevFieldId) => {
        const { value } = e.target;
        if (/^\d$/.test(value) || value === '') {
          setInput(value);
          if (value && nextFieldId) {
            document.getElementById(nextFieldId).focus();
          }
        }
      };
    
      const handleKeyDown = (e, prevFieldId) => {
        if (e.key === 'Backspace' && !e.target.value && prevFieldId) {
          document.getElementById(prevFieldId).focus();
        }
      };

  return (
    <Layout>
        <SubLayout>
        <form onSubmit={handleSubmit} className={classes.form}>

  <div className={classes.info}>
  <span className={classes.title}>{lang == 'en' ? 'Otp Validation' : lang == 'ta' ? 'Otp சரிபார்ப்பு': lang == 'sin' ? 'Otp සත්‍යාපනය':'' }</span>
<p className={classes.description}>{lang == 'en'?'Enter the Otp sent to Your Mobile Number:':lang == 'ta'?'உங்கள் மொபைல் எண்ணுக்கு அனுப்பப்பட்ட Otp ஐ உள்ளிடவும்:':lang == 'sin'?'ඔබගේ ජංගම දුරකථන අංකයට එවන ලද Otp ඇතුලත් කරන්න:':''}</p>
   </div>
   {
    !loading? 
    <div className={classes.input_fields}>
    <input id="input1" placeholder="" type="tel" maxlength="1" value={input1} onChange={(e) => handleInputChange(e, setInput1, 'input2', null)}
              onKeyDown={(e) => handleKeyDown(e, null)}/>
    <input id="input2" placeholder="" type="tel" maxlength="1" value={input2} onChange={(e) => handleInputChange(e, setInput2, 'input3', 'input1')}
              onKeyDown={(e) => handleKeyDown(e, 'input1')} />
    <input id="input3" placeholder="" type="tel" maxlength="1" value={input3} onChange={(e) => handleInputChange(e, setInput3, 'input4', 'input2')}
              onKeyDown={(e) => handleKeyDown(e, 'input2')} />
    <input id="input4" placeholder="" type="tel" maxlength="1" value={input4} onChange={(e) => handleInputChange(e, setInput4, null, 'input3')}
              onKeyDown={(e) => handleKeyDown(e, 'input3')} />
    {/* <input id="input5" placeholder="" type="tel" maxlength="1" value={input5} onChange={(e) => handleInputChange(e, setInput5, 'input6', 'input4')}
              onKeyDown={(e) => handleKeyDown(e, 'input4')} />
    <input id="input6" placeholder="" type="tel" maxlength="1" value={input6} onChange={(e) => handleInputChange(e, setInput6, null , 'input5')}
              onKeyDown={(e) => handleKeyDown(e, 'input5')} /> */}
  </div>:
  <Lottie
    animationData={Loader}
  />
   }

      <div className={classes.action_btns}>
      <button class={classes.btn} onClick={handleSubmit}>
  <span>{lang == 'en' ? 'Verify':lang == 'ta' ? 'சரிபார்க்கவும்':lang == 'sin'?'තහවුරු කරන්න':''}</span>
</button>
        <Link className={classes.clear} onClick={handleClear} >{lang == 'en' ? 'Clear':lang == 'ta' ? 'தெளிவு':lang == 'sin'?'පැහැදිලිව':''}</Link>
      </div>

</form>

<ToastContainer />
        </SubLayout>
    </Layout>
  )
}

export default OtpValidationPage
