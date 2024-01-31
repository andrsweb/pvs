import Swiper from 'swiper';
import { Pagination } from 'swiper/modules';

document.addEventListener('DOMContentLoaded', () => {
	'use strict'

	swiperInit()
    swiperInitWithPag()
})

const swiperInit = () => {
	const swiper = new Swiper('.swiper-some', {
		slidesPerView: 1,
		spaceBetween: 10,
		grabCursor: true,
        modules: [Pagination],
        
        pagination: {
            el: '.swiper-pag',
          },

        breakpoints: {
            320: {
                slidesPerView: 1
            },

            768: {
                slidesPerView: 2 
            },

            992: {
                slidesPerView: 3
            }
        }
	})

	if(!swiper) return
}

const swiperInitWithPag = () => {
	const swiper = new Swiper('.testi-swiper', {
		slidesPerView: 'auto',
        spaceBetween: 20,
        initialSlide: 1,
        centeredSlides: true,
		modules: [Pagination],

        pagination: {
            el: '.swiper-pagination',
          },
	})

	if(!swiper) return
}
