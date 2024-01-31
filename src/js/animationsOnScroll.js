import { isInScope } from './common/global'

document.addEventListener('scroll', () => {
	const featured     = document.querySelector('.featured')
	const testimonials = document.querySelector('.testimonials')
	const help         = document.querySelector('.help')
	const contact      = document.querySelector('.contact')
	const some         = document.querySelector('.some')

	if (isInScope('.featured', window.scrollY)) {
		featured.classList.add('scrolled')
	}

	if (isInScope('.testimonials', window.scrollY)) {
		testimonials.classList.add('scrolled')
	}

	if (isInScope('.help', window.scrollY)) {
		help.classList.add('scrolled')
	}

	if (isInScope('.contact', window.scrollY)) {
		contact.classList.add('scrolled')
	}

    if (isInScope('.some', window.scrollY)) {
		some.classList.add('scrolled')
	}
})