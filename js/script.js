// Функція для прокручування вгору до самого кінця
function scrollToTop() {
	window.scrollTo({
		top: 0,
		behavior: 'smooth',
	})
}

// Функція, що перевіряє, чи потрібно показувати кнопку прокрутки вгору
function toggleScrollButton() {
	var scrollButton = document.querySelector('.scroll-to-top')

	if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
		// scrollButton.style.display = 'block'
		scrollButton.style.opacity = '0.62'
		scrollButton.style.visibility = 'visible'
	} else {
		// scrollButton.style.display = 'none'
		scrollButton.style.opacity = '0'
		scrollButton.style.visibility = 'hidden'
	}
}

// Додаємо обробник подій для прокрутки сторінки
window.onscroll = function () {
	toggleScrollButton()
}

document.querySelectorAll('.number').forEach(function (input) {
	let keyCode

	function mask(event) {
		event.keyCode && (keyCode = event.keyCode)
		let pos = this.selectionStart
		if (pos < 3) event.preventDefault()
		let matrix = '+38 (___) ___-__-__'
		;(i = 0),
			(def = matrix.replace(/\D/g, '')),
			(val = this.value.replace(/\D/g, '')),
			(newValue = matrix.replace(/[_\d]/g, function (a) {
				return i < val.length ? val.charAt(i++) || def.charAt(i) : a
			}))
		i = newValue.indexOf('_')
		if (i != -1) {
			i < 5 && (i = 3)
			newValue = newValue.slice(0, i)
		}
		let reg = matrix
			.substr(0, this.value.length)
			.replace(/_+/g, function (a) {
				return '\\d{1,' + a.length + '}'
			})
			.replace(/[+()]/g, '\\$&')
		reg = new RegExp('^' + reg + '$')
		if (
			!reg.test(this.value) ||
			this.value.length < 5 ||
			(keyCode > 47 && keyCode < 58)
		)
			this.value = newValue
		if (event.type == 'blur' && this.value.length < 5) this.value = ''
	}

	input.addEventListener('input', mask, false)
	input.addEventListener('focus', mask, false)
	input.addEventListener('blur', mask, false)
	input.addEventListener('keydown', mask, false)
	input.addEventListener('mouseup', event => {
		event.preventDefault()
		if (input.value.length < 4) {
			input.setSelectionRange(4, 4)
		} else {
			input.setSelectionRange(input.value.length, input.value.length)
		}
	})
})

const stars = document.querySelectorAll('.star')

// Функція для зберігання стану зірки у localStorage
function saveStarState() {
	const starStates = []
	stars.forEach((star, index) => {
		if (star.classList.contains('active')) {
			starStates[index] = 1 // 1 означає активну зірку
		} else {
			starStates[index] = 0 // 0 означає неактивну зірку
		}
	})
	localStorage.setItem('starStates', JSON.stringify(starStates))
}

function restoreStarState() {
	const starStates = JSON.parse(localStorage.getItem('starStates'))
	if (starStates) {
		starStates.forEach((state, index) => {
			if (state === 1) {
				stars[index].classList.add('active')
			}
		})
	}
}

document.addEventListener('DOMContentLoaded', () => {
	restoreStarState()
})

// Обробник події кліку на зірку
stars.forEach((star, index) => {
	star.addEventListener('click', () => {
		if (star.classList.contains('active')) {
			star.classList.remove('active')
		} else {
			star.classList.add('active')
		}
		saveStarState()
	})
})

function goToPage(page) {
	window.location.href = page
}

function goBack() {
	window.history.back()
}
