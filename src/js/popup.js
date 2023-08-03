import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import { setTargetElement, getTargetElement } from './common/global'

document.addEventListener('DOMContentLoaded', () => {
	'use strict'

	callPopup()
})

const callPopup = () => {
	const popup = document.querySelector('.video__popup_wrapper')
	const buttons = document.querySelectorAll('.frame-wrapper')
	const video = document.querySelector('.video__popup_items')
	const closeButton = popup.querySelector('.close__button')
	setTargetElement( document.querySelector( '#popup-lock' ) ) // Target element for body lock

	if (!popup && !buttons.length) return

	buttons.forEach(button => {
		button.addEventListener('click', e => {
			const target = e.target
			const clonedSection = target.closest('.frame-wrapper').cloneNode(true)

			if (!popup.classList.contains('opened')) {
				popup.classList.add('opened')
				video.appendChild(clonedSection)
				disableBodyScroll( getTargetElement(), { reserveScrollBarGap: true } )
			}
		})
	})

	closeButton.addEventListener('click', () => {
		popup.classList.remove('opened')
		video.innerHTML = ''
		enableBodyScroll( getTargetElement() )
	})

	popup.addEventListener( 'click', e => {      // CLose popup by tap anywhere
		e.stopPropagation()

		const target = e.target

		if ( target.className && target.classList.contains( 'video__popup_wrapper' ) ) {
			popup.classList.remove( 'opened' )
			video.innerHTML = ''
			enableBodyScroll( getTargetElement() )
		}
	} )
}