import React, { useEffect, useState,useRef } from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import Navbar from './Navbar'
import ReactPlayer from 'react-player'
import axios from 'axios'
import {BsFillEyeFill,BsPlayCircleFill} from 'react-icons/bs'
import {BiSolidLike,BiPlus} from 'react-icons/bi'
import Footer from './Footer'
import {MdDone} from 'react-icons/md'

const SingleVideo = () => {
    const params=useParams()
    const navigate=useNavigate()
    // console.log("params",params)

    const [video,setVideo]=useState([])
    const [random,setRandom]=useState([])
    const [url,setUrl]=useState('')
    const [name,setName]=useState('')
    const [isLiked,setIsLiked]=useState(false)
    const [watchlist,setWatchlist]=useState(false)
  const playerRef = useRef(null);
  const [isPlaying, setIsPlaying] = React.useState(true);
  const [playedSeconds, setPlayedSeconds] = useState(0);





    const fetchVideo=async()=>{
      const response=await axios.get(`/singlevideo/${params.id}`)
      console.log("video",response.data)
      setUrl(response.data[0].vurl_dash)
      setVideo(response.data)
      setName(response.data[0].name)
    }

    useEffect(()=>{
      window.scrollTo(0, 0);
      fetchVideo();

    },[params.id])

    const fetchRandom=async()=>{
      const response=await axios.get('/random')
      setRandom(response.data)
    }

    useEffect(()=>{
      fetchRandom()
    },[])
    const handleProgress = (progress) => {

      setPlayedSeconds(progress.playedSeconds);
    };

    const handlePlay = () => {
      setIsPlaying(true);
    };
  
    const handlePause = () => {
      setIsPlaying(false);
    };
    
  const handleClick=(id)=>{
    navigate(`/videos/${id}`)
    window.scrollTo(0, 0);
    }
  
    function addSpacesBeforeCapitalLetters(str) {
      if (str === str.toUpperCase()) {
        return str;
      }
      return str.split('').map((char, index) => (char === char.toUpperCase() && index !== 0 ? ` ${char}` : char)).join('');
    }
    
    const toggleLike=()=>{
      setIsLiked(!isLiked)
    }

    
    const handleWatchlist=()=>{
     setWatchlist(true)
    }
    
    const handleRemoveFromWatchlist=()=>{
      setWatchlist(false)
    }
    
  return (
    <div className='bg-black '>
      <Navbar msisdn={params.msisdn} />
      <div className='bg-black mt-5'>
      {video &&
          <div className=' flex-col text-white md:flex md:flex-row  container md:mx-auto'>

            <div className=' md:mt-10 mx-4 flex justify-center'>
              <ReactPlayer
                className="justify-center  "
                config={{ file: { attributes: { controlsList: 'nodownload' } } }}
                url={url}
                playing={isPlaying}
                loop={true}
                controls={true}
                onProgress={handleProgress}
                onPlay={handlePlay}
                onPause={handlePause}
                ref={playerRef}
                onError={(e) => console.error('Error loading video:', e)}
              />
            </div>

            <div className=' mt-4 md:mt-9 md:mx-10 text-font '>


              <h1 className='text-white text-xl    heading-text font-bold px-10 md:px-10 md:text-2xl'> {addSpacesBeforeCapitalLetters(name)}</h1>
              {/* <div className='flex mt-3 gap-3 px-10'>
              <div className='flex gap-1' onClick={toggleLike}>
          <BiSolidLike size={21} className='mt-1' color={isLiked ? 'blue' : 'white'} /><span className='text-lg'>Like</span>
        </div>
                 <div className='flex gap-1' >
                   {isAdded ? <div className='flex ' onClick={() => handleRemoveFromWatchlist()}>
                     <MdDone className='mt-1' />Watchlist

                  </div> : <div className='flex' onClick={() => handleWatchlist()}>
                   <BiPlus className='mt-1' /> Watchlist
                  </div>}
                </div>
                 <div className='flex gap-1 '>
                   <BsFillEyeFill className='mt-1' />Views (0)
                 </div>
              </div>
               */}
               
            </div>


          </div>
        }
      </div>
      <div className='mt-5 '>
      <div className='gradient-bg w-[200px] md:w-[500px] h-1 container mx-auto '>
      </div>

      <h1 className='text-white mx-10 mt-10 text-3xl font-bold text-center'>MORE <span className='text-[#2373CF]'>VIDEOS</span> </h1>

      <div className="md:px-10 px-3 mt-6 grid grid-cols-2 md:grid-cols-4  gap-4 bg-black rounded-lg dark:bg-gray-800 dark:border-gray-700">
  {
    random.map((vid) => {  
      return (
        <div className="max-w-sm bg-black border-b-2 border-[#EBAECB] rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flip-card"
        onClick={()=>handleClick(vid.id)}>
          <div className="flip-card-inner">
            <div className="flip-card-front flex-col">
              <a href="#" >
                <img className="rounded-lg w-full h-full" src={vid.imageFiveUrl} alt="" />
                <BsPlayCircleFill className='play-icon' color='white' size={35}/>
              </a>
  <h1 className='text-white md:px-10   font-bold text-center heading-text mt-5 md:mb-6'> {addSpacesBeforeCapitalLetters(vid.name)}</h1>

            </div>
            <div className="flip-card-back flex-col">
            <a href="#" >
                <img className="rounded-lg w-full h-full" src={vid.imageFiveUrl} alt="" />
                <div  className='play-icon gradient-bg  rounded-lg'>
                  <button className='text-md font-bold p-3 '>PLAY NOW</button>
                </div>
              </a>
  <h1 className='text-white md:px-10 capitalize  font-bold text-center heading-text mt-5 md:mb-6'>{vid.name}</h1>

            </div>
          </div>
        </div>
      )
    })
  }
</div>
    </div>
   

<Footer/>
    </div>
  )
}

export default SingleVideo
