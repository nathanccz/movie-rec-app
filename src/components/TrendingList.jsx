import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, A11y } from 'swiper/modules';
import { Icon } from "@iconify/react/dist/iconify.js"
import HomeModal from "./HomeModal"
import 'swiper/css';
import 'swiper/css';
import 'swiper/css/scrollbar';
import { useState } from 'react';

export default function TrendingList({ data, isLoading }) {
    const [leftActive, setLeftActive] = useState(false)
    const [rightActive, setRightActive] = useState(true)
  
    return (
        <>
          <div className='flex flex-row gap-3 items-center'>
            {leftActive && 
            <div className='basis-[10%] left-arrow' data-aos='fade' data-duration='500'>
              <Icon icon="wpf:previous" className='text-4xl cursor-pointer'/>
            </div>}
            <Swiper
            modules={[A11y]}
              onSlideChange={(swiper) => {
                if (swiper.activeIndex > 0) {
                  setLeftActive(true)
                } else {
                  setLeftActive(false)
                }
              }}
              onSwiper={(swiper) => {console.log(swiper)}}
              breakpoints={{
                360: {
                    slidesPerView: 1,
                    spaceBetween: 1
                },
                640: {
                  slidesPerView: 3,
                  spaceBetween: 5,
                },
                768: {
                  slidesPerView: 3,
                  spaceBetween: 10,
                },
                1024: {
                  slidesPerView: 4,
                  spaceBetween: 15,
                },
                1260: {
                  slidesPerView: 5,
                  spaceBetween: 20,
                },
              }}
            >
              {data.map((data) => 
                    <SwiperSlide>
                      {isLoading ? <div className="skeleton h-48 w-48"></div>:
                      <div key={data.id} className='overflow-hidden'>
                          <img
                            src={data.poster}
                            alt={data.title}
                            className='cursor-pointer hover:scale-110 ease-in-out duration-500'
                            onClick={() => {
                              document.querySelector('.modal-box img').src = ''
                              document.querySelector('.modal-box h3').textContent = data.title
                              document.querySelector('.modal-box img').src = data.poster
                              document.querySelector('.modal-box p').textContent = data.overview
                              document.querySelector('.modal-box .year').textContent = data.release_date
                              // document.querySelector('.modal-box .rating').textContent = data.rating   
                              document.getElementById('my_modal_3').showModal()
                              }
                            } 
                          />
                      </div>}
                    </SwiperSlide>
                )}
            </Swiper>
            {rightActive &&
            <div className='basis-[10%]'>
            <Icon icon="wpf:next" className='text-4xl cursor-pointer'/>
            </div>}
            
          </div>
          <HomeModal />
        </>
      );
}