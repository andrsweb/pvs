import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import { setTargetElement, getTargetElement } from './common/global'

document.addEventListener('DOMContentLoaded', () => {
	'use strict'

	headerScroll()
	toogleBurgerMenu()
	closeMenuByTapLink()
})

const headerScroll = () => {                 //Header scroll function, if header scrolltop > 0, header add class 'scrolled'
	window.addEventListener('scroll', () => {
		const scrollTop = window.scrollY
		const header = document.querySelector('.header')

		if (!header) return

		if (scrollTop > 0) {
			if (!header.classList.contains('scrolled'))
				header.classList.add('scrolled')
		} else {
			header.classList.remove('scrolled')
		}
	})
}

const toogleBurgerMenu = () => {
	const burgerButton = document.querySelector('.burger__button')
	const headerWrapper = document.querySelector('.header__wrapper')
	setTargetElement(document.querySelector('#menu-lock')) //Target element for body lock

	burgerButton.addEventListener('click', () => {

		if (!burgerButton && !headerWrapper) return

		if (!headerWrapper.classList.contains('opened')) {
			headerWrapper.classList.add('opened')
			burgerButton.classList.add('opened')
			disableBodyScroll(getTargetElement(), { reserveScrollBarGap: true })
		} else {
			headerWrapper.classList.remove('opened')
			burgerButton.classList.remove('opened')
			enableBodyScroll(getTargetElement())
		}
	})

	window.addEventListener('resize', () => {        //Resize function, if window width >= 768, remove all active classes on burger menu and button
		const windowWidth = window.innerWidth
		const WINDOW_WIDTH_MD = 768

		if (windowWidth >= WINDOW_WIDTH_MD && headerWrapper.classList.contains('opened')) {
			headerWrapper.classList.remove('opened')
			burgerButton.classList.remove('opened')
			enableBodyScroll(getTargetElement())
		}
	})
}

const closeMenuByTapLink = () => {
	const links = document.querySelectorAll('.nav__link')
	const headerMenu = document.querySelector('.header__wrapper')
	const burgerButton = document.querySelector('.burger__button')
	setTargetElement(document.querySelector('#body-lock'))

	if (!links.length && !headerMenu) return

	links.forEach(link => {
		link.addEventListener('click', () => {
			if (headerMenu.classList.contains('opened')) {
				headerMenu.classList.remove('opened')
				burgerButton.classList.remove('opened')
				enableBodyScroll(getTargetElement())
			} else return
		})
	})
}