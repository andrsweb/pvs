import lazyframe from "lazyframe"

document.addEventListener( 'DOMContentLoaded', () => {
	'use strict'

	lazy()
} )

const lazy = () => {
	let elements = document.querySelectorAll( '.frame' ) //Get all frames, on click iframe puts into this frame

	lazyframe(elements, {
		debounce: 1000,
		lazyload: true,
		autoplay: true
	})
}