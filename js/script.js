document.addEventListener('DOMContentLoaded', () => {
	loader()
	anchor()
	contact()
	header()
	activeHeaderLinks()
	sliders()
	video()
	timetable()
	prices()
})

function loader() {
	const loader = document.querySelector('#loader')
	loader ? loader.classList.add('loaded') : ''
}

function anchor() {
	const anchorLinks = document.querySelectorAll('.anchor')
	if (anchorLinks) {
		anchorLinks.forEach(link => {
			link.addEventListener('click', e => {
				e.preventDefault()
				const href = e.target.getAttribute('href')
				const offsetTop = document.querySelector(href).offsetTop - 70
				scroll({
					top: offsetTop,
					behavior: 'smooth'
				})
			})
		})
	}
}

function contact() {
	const contactSection = document.querySelector('#contact')
	if (contactSection) {
		const form = contactSection.querySelector('form')
		const formItems = form.querySelectorAll('.new-validate__line')
		formItems.forEach(item => item.children[0].classList.contains('btn-site') ? item.children[0].classList.add('button') : '')
	}
}

function header() {
	const header = document.querySelector('header')
	if (header) {
		window.addEventListener('scroll', () => {
      if (window.outerWidth > 991) {
				if (window.pageYOffset > 500) {
					header.classList.add('scrolled', 'scroll-up')
					header.classList.remove('scroll-down')
				} else {
					if (header.classList.contains('scrolled')) {
						header.classList.add('scroll-down')
						setTimeout(() => header.classList.remove('scrolled', 'scroll-up'), 300)
					}
				}
			}
		})

		const mobileHeader = () => window.outerWidth < 992 ? header.classList.add('mobile') : header.classList.remove('mobile')
		mobileHeader()
		window.addEventListener('resize', () => mobileHeader())

		const hamburger = header.querySelector('.hamburger')
		const nav = header.querySelector('nav')
		const navLinks = nav.querySelectorAll('a')
		
		hamburger.addEventListener('click', () => {
			hamburger.classList.toggle('active')
			nav.classList.toggle('visible')
			nav.style.transition = nav.classList.contains('visible') ? 'transform var(--transition-duration) ease' : 'transform var(--transition-duration) ease var(--transition-duration)'
			navLinks.forEach((item, index) => item.style.transitionDelay = nav.classList.contains('visible') ? index * 0.1 + 's' : '')
		})

		window.addEventListener('resize', () => {
			nav.style.transition = ''
			navLinks.forEach(item => item.style.transitionDelay = '')
		})
	}
}

function activeHeaderLinks() {
  const headerNav = document.querySelectorAll('header nav li')
  const sections = document.querySelectorAll('section')
  if (headerNav && sections) {
    window.addEventListener('scroll', () => {
      let current = ''
      sections.forEach(section => window.pageYOffset >= section.offsetTop - 70 ? current = section.getAttribute('id') : '')
      headerNav.forEach(li => {
        const link = li.querySelector('a')
				if (link.classList.contains('anchor')) {
					if (link.getAttribute('href').replace('#','') === current) {
						headerNav.forEach(listitems => listitems.classList.remove('active'))
						li.classList.add('active')
					}
				} 
      })
    })
  }
}

function sliders() {
	const allSliders = document.querySelectorAll('.swiper')
	if (allSliders.length) {
		allSliders.forEach(slider => {
			if (slider.id === 'homeSlider') {
				const swiper = new Swiper('#homeSlider', {
					mousewheel: {
						enabled: false
					},
					allowTouchMove: false,
					effect: "fade",
					preventInteractionOnTransition: true,
					autoplay: true,
				})
			}
			if (slider.id === 'needUsSlider') {
				const swiper = new Swiper('#needUsSlider', {
					slidesPerView: 1,
					spaceBetween: 40,
					loop: true,
					autoplay: true,
					breakpoints: {
						992: {
							slidesPerView: 3,
						},
						576: {
							slidesPerView: 2,
						}
					},
				})
			}
			if (slider.id === 'ebooksSlider') {
				const swiper = new Swiper('#ebooksSlider', {
					slidesPerView: 1,
					spaceBetween: 40,
					loop: true,
					autoplay: true,
					breakpoints: {
						992: {
							slidesPerView: 3,
						},
						576: {
							slidesPerView: 2,
						}
					},
				})
			}
			if (slider.id === 'testimonialsSlider') {
				const swiper = new Swiper('#testimonialsSlider', {
					effect: "fade",
					allowTouchMove: false,
					spaceBetween: 40,
					pagination: {
						el: '.swiper-pagination',
						clickable: true,
						renderBullet: function (index, className) {
							return '<span class="' + className + '">' + (index + 1) + "</span>";
						},
					},
				})
			}
		})
	}
}

function video() {
	const videoSection = document.querySelector('#video-section')
	if (videoSection) {
		const videoLink = videoSection.querySelector('.icon-wrapper')
		const popup = videoSection.querySelector('.video-popup')
		const player = popup.querySelector('#video-player')
		const close = popup.querySelector('.popup-bg')
		const body = document.querySelector('body')
		videoLink.addEventListener('click', () => {
			popup.classList.add('visible')
			body.style.overflow = 'hidden'
			player.setAttribute('src', videoLink.children[0].getAttribute('data-src'))
		})

		const closeVideo = () => {
			if (popup.classList.contains('visible')) {
				popup.classList.remove('visible')
				body.style.overflow = ''
			}
		}
		close.addEventListener('click', () => closeVideo())
		document.addEventListener('keydown', e => e.key === 'Escape' ? closeVideo() : '')
	}
}


function timetable() {
	const timetableSection = document.querySelector('#timetable')
	if (timetableSection) {
		const controls = timetableSection.querySelectorAll('.timetable-controls li')
		const tableItems = timetableSection.querySelectorAll('.timetable .item.hover-bg')
		controls.forEach(item => {
			item.addEventListener('click', () => {
				if (!item.classList.contains('active')) {
					controls.forEach(allItems => allItems.classList.remove('active'))
					item.classList.add('active')
					tableItems.forEach(tableItem => item.getAttribute('data-filter') === 'all' ? 
						tableItem.classList.remove('hide') : item.getAttribute('data-filter') !== tableItem.getAttribute('data-meta') ? 
						tableItem.classList.add('hide') : tableItem.classList.remove('hide'))
				}
			})
		})
	}
}

function prices() {
	const pricesSection = document.querySelector('#prices')
	if (pricesSection) {
		const plans = pricesSection.querySelectorAll('.price-item')
		plans.forEach(plan => {
			plan.classList.add('item')

			const name = plan.querySelector('.price-item__name')
			const createH4 = document.createElement('h4')
			createH4.prepend(name.children[0])
			name.prepend(createH4)
			
			const btn = plan.querySelector('.price-item__button-wrapper a')
			
			const createTextSpan = document.createElement('span')
			createTextSpan.classList.add('text-wrapper')
			createTextSpan.innerText = btn.innerText
			btn.innerText = ''

			const createArrowRightIcon = document.createElement('span')
			createArrowRightIcon.classList.add('fa', 'fa-arrow-right')

			const createPlusIcon = document.createElement('span')
			createPlusIcon.classList.add('fa', 'fa-plus')

			btn.prepend(createTextSpan, createArrowRightIcon, createPlusIcon)

			btn.classList.remove('button')
			btn.classList.add('line-btn')
		})
	}
}