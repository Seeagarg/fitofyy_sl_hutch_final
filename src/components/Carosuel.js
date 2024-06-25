import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import axios from 'axios';
import  './Carousel.css'

const Carousel = () => {
  const [images, setImages] = useState([]);

  const fetchImages = async () => {
    try {
      const response = await axios.get('/getImage');
      if (Array.isArray(response.data)) {
        setImages(response.data);
        // console.log("img", response.data);
      } else {
        console.error('Expected an array, but got:', response.data);
      }
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };
  
  useEffect(() => {
    fetchImages();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
        
      },
      {
        breakpoint: 768, // adjusted to typical mobile width
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      }
    ],
  };

  return (
    <div className="container md:px-0 px-3 mt-10 shadow-xl mx-auto  ">
    {
      images.length > 0 ? (
        <Slider {...settings}>
          {images.map((image, index) => (
            <div key={index}>
              <img
                src={image.imageFiveUrl}
                alt={'banners'}
                className=" w-full h-[210px] md:h-[300px] object-fit rounded-lg shadow-lg"
              />
            </div>
          ))}
        </Slider>
      ) : (
        <div>Loading...</div> // or any other placeholder/loading component
      )
    }
  </div>
  
  );
};

export default Carousel;
