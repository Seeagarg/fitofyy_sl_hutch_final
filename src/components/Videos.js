import axios from 'axios'
import React, { useState, useEffect } from 'react'
import {BsPlayCircleFill} from 'react-icons/bs'
import Paginate from 'react-paginate';
import {useNavigate,useParams} from 'react-router-dom'
import'./Carousel.css'

const Videos = ({msisdn}) => {
  const [videos, setVideos] = useState([])
  const navigate=useNavigate()

  const [pageRange, setPageRange] = useState(window.innerWidth <= 768 ? 2 : 5); // Example for mobile breakpoint at 768px.

  const [currentPage, setCurrentPage] = useState(0); // start at page 0, because react-paginate is 0-indexed.
  const videosPerPage = 20;

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
    
    const scrollHeight = window.innerHeight * 0.5;
    window.scrollTo({
        top: scrollHeight,
        behavior: 'smooth' // smooth scroll
    });
};


  const indexOfLastVideo = (currentPage + 1) * videosPerPage;
  const indexOfFirstVideo = currentPage * videosPerPage;
  const currentVideos = videos.slice(indexOfFirstVideo, indexOfLastVideo);

  const fetchVideos = async () => {
    const response = await axios.get('/videos')
   
    setVideos(response.data)
  }

  useEffect(() => {
    fetchVideos()
  }, [])

  useEffect(() => {
    const handleResize = () => {
        setPageRange(window.innerWidth <= 768 ? 2 : 5); 
    };

    window.addEventListener('resize', handleResize);

    // Cleanup the event listener on component unmount
    return () => window.removeEventListener('resize', handleResize);
}, []);


  const handleClick=(id)=>{
  navigate(`/videos/${id}`)
  }

  function addSpacesBeforeCapitalLetters(str) {
    if (str === str.toUpperCase()) {
      return str;
    }
    return str.split('').map((char, index) => (char === char.toUpperCase() && index !== 0 ? ` ${char}` : char)).join('');
  }
  

  return (
    <div className='mt-5 '>
      <div className='gradient-bg w-[200px] md:w-[500px] h-1 container mx-auto '>
      </div>

      <h1 className='text-white mx-10 mt-10 text-3xl font-bold'>EXPLORE <span className='text-[#2373CF]'>VIDEOS</span> </h1>

      <div className="md:px-10 px-3 mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 bg-black rounded-lg dark:bg-gray-800 dark:border-gray-700">
  {
    currentVideos.map((vid) => {  
        // EBAECB
      return (
        <div className="max-w-sm border-b-2 border-[#EBAECB] bg-black rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flip-card"
        onClick={()=>handleClick(vid.id)}>
          <div className="flip-card-inner">
          <div className="flip-card-front flex-col">
  <a>
    <img className="rounded-lg w-full h-full " src={vid.imageFiveUrl} alt="" />
    <BsPlayCircleFill className='play-icon' color='white' size={35}/>
  </a>
  <h1 className='text-white md:px-10 capitalize  font-bold text-center heading-text mt-5 md:mb-6'>{addSpacesBeforeCapitalLetters(vid.name)}</h1>
</div>

         
            <div className="flip-card-back flex-col">
            <a >
                <img className="rounded-lg w-full h-full" src={vid.imageFiveUrl} alt="" />
                <div  className='play-icon gradient-bg  rounded-lg'>
                  <button className='text-md font-bold p-3 '>PLAY NOW</button>
                </div>
              </a>
              <h1 className='text-white md:px-10 capitalize  font-bold text-center heading-text mt-5 md:mb-6'>{addSpacesBeforeCapitalLetters(vid.name)}</h1>
            </div>
          </div>
        </div>
      )
    })
  }
</div>


<Paginate
        previousLabel={'previous'}
        nextLabel={'next'}
        breakLabel={'...'}
        breakClassName={'break-me'}
        pageCount={Math.ceil(videos.length / videosPerPage)} 
        marginPagesDisplayed={2}
        pageRangeDisplayed={pageRange}
        onPageChange={handlePageClick}
        containerClassName={'pagination'}
        subContainerClassName={'pages pagination'}
        activeClassName={'active'}
      />

    </div>
  )
}

export default Videos
