import React,{useState} from 'react'
import SubLayout from '../Layouts/SubLayout'
import Layout from '../Layouts/Layout'
import classes from './Subscription.module.css'
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux'
import Lottie from 'lottie-react'
import Loader from '../Animations/Loader.json'



const SubscriptionPage = () => {

    const [number,setNumber] = useState('')
    const {lang} = useSelector((state) => state.LanguageSlice)

    const [loading,setLoading] = useState(false);
   

    const navigate = useNavigate();

    const handleSubmit=async(e)=>{
        e.preventDefault();
        setLoading(true);
        console.log(number)
        const data ={
          msisdn:number,
          serviceName:"Fitofyy"
        } 

        // if(!number){
        //   toast.error("Input Field Should not be empty !!")
        // }

        try{
          const res = await axios.post('http://148.251.88.109:5495/send-otp',data)
          console.log(res.data)
          setLoading(false);
          if(res.data.code == 0){
            toast.success(res.data.message);
            setTimeout(()=>{
              navigate('/otp-validation',{ state: { number} })
            },500)
          }
          else{
            toast.error(res.data.message);
            navigate('/subscribe')
          }
         }
         catch(err){
          console.log(err)
         }
        
        setNumber("")
    }

  return (
    <Layout>
      
    <SubLayout>
    <div className={classes.container}>
  <form className={classes.form} onSubmit={handleSubmit}>
        <div className={classes.note}>
      <label className={classes.title}>{lang == 'en'? 'Subscribe to Fitofyy': lang == 'sin'?'Fitofyy වෙත දායක වන්න':lang == 'ta'? 'Fitofyy க்கு குழுசேரவும்':''}</label>
      {/* <span className={classes.subtitle}>Lorem ipsum dolor fugit qui nemo dolor amet voluptas aspernatur perferendis modi eum sit tenetur quia a, officiis nulla corporis earum numquam aliquid omnis officia! Magni eum aspernatur, debitis harum aliquam porro voluptatem vel alias qui ipsum non amet culpa? Ipsum dicta dolore impedit.</span> */}
    </div>
    <label htmlFor="">{lang == 'en'? 'Enter Your Number': lang == 'sin'? 'ඔබගේ අංකය ඇතුලත් කරන්න':lang == 'ta'? 'உங்கள் எண்ணை உள்ளிடவும்':''}</label>
    <input placeholder="9478*******" title="Enter your number"  type="tel" value={number} onChange={(e)=>setNumber(e.target.value)} className={classes.input_field}/>
    {
      !loading?
      <button className={classes.btn} disabled = {loading} onClick={handleSubmit}><span>{lang == 'en'?'Submit':lang == 'sin'?'ඉදිරිපත් කරන්න':lang == 'ta'?'சமர்ப்பிக்கவும்':''}</span></button>
      :
      <Lottie
        animationData = {Loader}

      />
    }
  </form>
</div>
<ToastContainer />
    </SubLayout>
    </Layout>
  )
}

export default SubscriptionPage
