import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './Carousel.css';
import axios from 'axios';
import { EffectFade, Navigation, Pagination, Autoplay } from 'swiper/modules';

const Carousel = () => {
  const [images, setImages] = useState([]);

  const fetchImages = async () => {
    try {
      const response = await axios.get('/getImage');
      setImages(response.data);
      // console.log("img", response.data);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <div className='container mx-auto mt-10 h-[300px] shadow-lg'>
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination, Autoplay]} // Include the Autoplay module
        className="mySwiper rounded-lg"
        autoplay={{ // Configure autoplay options
          delay: 3000, // Delay in milliseconds between slides
          disableOnInteraction: false, // Allow auto-play even when user interacts with the slider
        }}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <img
              src={image.imageFiveUrl}
              alt="Slide Image"
              className="w-full h-[200px] object-cover rounded-lg shadow-lg"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Carousel;

