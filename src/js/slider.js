import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';

document.addEventListener('DOMContentLoaded', () => {
	'use strict'

	swiperInit()
})

const swiperInit = () => {
	const swiper = new Swiper('.swiper', {
		slidesPerView: 1,
		spaceBetween: 10,
		mousewheel: true,
		modules: [Navigation],
		grabCursor: true,
		navigation: {
			nextEl: '.swiper-next',
			prevEl: '.swiper-prev'
		}
	})

	if(!swiper) return
}
