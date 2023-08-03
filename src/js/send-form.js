import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import { setTargetElement, getTargetElement } from './common/global'

document.addEventListener( 'DOMContentLoaded', () => {
	'use strict'

	submitForm( '.main-form' )
	submitForm( '.contacts-form' )
} )

const submitForm = ( selector ) => {
	const forms	= document.querySelectorAll( selector )

	if( ! forms.length ) return

	forms.forEach( form => {
		form.addEventListener( 'submit', e => {
			e.preventDefault()

			const
				formResponse	= form.querySelector( '.form-response' ),
				request			= new XMLHttpRequest(),
				formData		= new FormData( form ),
				formType		= form.dataset.type,
				popupWrapper    = document.querySelector('.form__popup_wrapper'),
				popup           = document.querySelector('.form__popup')
				setTargetElement( document.querySelector( '#form-lock' ) ) // Target element for body lock

			formData.append( 'func', formType )
			request.open( 'post', 'send-form.php', true )
			request.responseType = 'json'

			formResponse.classList.remove( ['success', 'error'] )
			formResponse.textContent = 'Processing...'

			request.addEventListener( 'load', () => {
				// All is good.
				if( request.status === 200 ){
					// Success response.
					if( request.response.success ){
						form.classList.add( 'success' )
						form.classList.remove( 'error' )
						popup.textContent = request.response.message
						popupWrapper.classList.add('opened')
						disableBodyScroll( getTargetElement(), { reserveScrollBarGap: true } )
						setTimeout(() => {
							popupWrapper.classList.remove('opened')
							enableBodyScroll( getTargetElement() )
						}, 3000)
						formResponse.textContent = ''
						form.reset()
					}	else {	// We've caught an error.
						formResponse.classList.remove( 'success' )
						formResponse.classList.add( 'error' )
						formResponse.textContent = request.response.message
					}
				}	else {	// All is bad.
					formResponse.classList.remove( 'success' )
					formResponse.classList.add( 'error' )
					formResponse.textContent = request.response
				}
			} )

			request.send( formData )
		} )
	} )
}