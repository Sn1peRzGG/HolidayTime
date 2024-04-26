const slider = (function () {
	// const
	const slider = document.getElementById('slider') // основна обгортка
	const sliderContent = document.querySelector('.slider-content') // обгортка для контейнера слайдів і контролів
	const sliderWrapper = document.querySelector('.slider-content-wrapper') // контейнер для слайдів
	const elements = document.querySelectorAll('.slider-content__item') // обгортка для слайда
	const sliderContentControls = createHTMLElement(
		'div',
		'slider-content__controls'
	) // блок контролів всередині sliderContent
	let dotsWrapper = null // Обгортка dots
	let prevButton = null // Кнопки
	let nextButton = null
	let autoButton = null
	let leftArrow = null // Стрілки
	let rightArrow = null
	let intervalId = null // ідентифікатор setInterval

	// data
	const itemsInfo = {
		offset: 0, // зміщення контейнера зі слайдами відносно початкової точки (перший слайд)
		position: {
			current: 0, // номер поточного слайда
			min: 0, // перший слайд
			max: elements.length - 1, // останній слайд
		},
		intervalSpeed: 2000, // Швидкість зміни слайдів в автоматичному режимі

		update: function (value) {
			this.position.current = value
			this.offset = -value
		},
		reset: function () {
			this.position.current = 0
			this.offset = 0
		},
	}

	const controlsInfo = {
		buttonsEnabled: false,
		dotsEnabled: false,
		prevButtonDisabled: true,
		nextButtonDisabled: false,
	}

	// Ініціалізація слайдера
	function init(props) {
		let { intervalSpeed, position, offset } = itemsInfo

		// Перевірка наявності елементів розмітки
		if (slider && sliderContent && sliderWrapper && elements) {
			// Перевірка вхідних параметрів
			if (props && props.intervalSpeed) {
				intervalSpeed = props.intervalSpeed
			}
			if (props && props.currentItem) {
				if (
					parseInt(props.currentItem) >= position.min &&
					parseInt(props.currentItem) <= position.max
				) {
					position.current = props.currentItem
					offset = -props.currentItem
				}
			}
			if (props && props.buttons) {
				controlsInfo.buttonsEnabled = true
			}
			if (props && props.dots) {
				controlsInfo.dotsEnabled = true
			}

			_updateControlsInfo()
			_createControls(controlsInfo.dotsEnabled, controlsInfo.buttonsEnabled)
			createSliderBody()
			_render()
		} else {
			console.log(
				"Розмітка слайдера задана невірно. Перевірте наявність всіх необхідних класів 'slider/slider-content/slider-wrapper/slider-content__item'"
			)
		}
	}

	// Оновити властивості контролів
	function _updateControlsInfo() {
		const { current, min, max } = itemsInfo.position
		controlsInfo.prevButtonDisabled = current > min ? false : true
		controlsInfo.nextButtonDisabled = current < max ? false : true
	}

	function createSliderBody() {
		const sliderBody = createHTMLElement('div', 'slider-body')
		const sliderText = createHTMLElement('p', 'slider-text')
		sliderText.textContent =
			'Полонини Карпат, у селі Орів посеред гір розташувався затишний куточок для незабутніх вражень. Справжні українські гори, власноручне сироваріння на полонині, водоспади та вікові дерева чекають на Вас.'

		// Створення кнопки як посилання
		const sliderBodyBtn = createHTMLElement('a', 'slider-body-btn')
		sliderBodyBtn.textContent = 'Переглянути'
		sliderBodyBtn.setAttribute('href', 'reservation.html')

		const btnArrow = createHTMLElement('span', 'btn-arrow')
		const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
		svg.setAttribute('fill', '#fff')
		svg.setAttribute('height', '35px')
		svg.setAttribute('width', '35px')
		svg.setAttribute('version', '1.1')
		svg.setAttribute('id', 'Layer_1')
		svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
		svg.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink')
		svg.setAttribute('viewBox', '0 0 330.00 330.00')
		svg.setAttribute('xml:space', 'preserve')
		svg.setAttribute('transform', 'matrix(1, 0, 0, 1, 0, 0)rotate(90)')

		const g = document.createElementNS('http://www.w3.org/2000/svg', 'g')
		g.setAttribute('id', 'SVGRepo_bgCarrier')
		g.setAttribute('stroke-width', '0')
		svg.appendChild(g)

		const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
		path.setAttribute('id', 'XMLID_29_')
		path.setAttribute(
			'd',
			'M100.606,100.606L150,51.212V315c0,8.284,6.716,15,15,15c8.284,0,15-6.716,15-15V51.212l49.394,49.394 C232.322,103.535,236.161,105,240,105c3.839,0,7.678-1.465,10.606-4.394c5.858-5.857,5.858-15.355,0-21.213l-75-75 c-5.857-5.858-15.355-5.858-21.213,0l-75,75c-5.858,5.857-5.858,15.355,0,21.213C85.251,106.463,94.749,106.463,100.606,100.606z'
		)
		g.appendChild(path)

		btnArrow.appendChild(svg) // Додати SVG до span
		sliderBodyBtn.appendChild(btnArrow)
		sliderBody.appendChild(sliderText)
		sliderBody.appendChild(sliderBodyBtn)
		sliderContentControls.appendChild(sliderBody)
	}

	// Створення елементів розмітки
	function _createControls(dots = false, buttons = false) {
		// Обгортка для контролів
		sliderContent.append(sliderContentControls)

		// Контроли
		createArrows()
		buttons ? createButtons() : null
		dots ? createDots() : null

		// Функція стрілок
		function createArrows() {
			const dValueLeftArrow =
				'M250.606,154.389l-150-149.996c-5.857-5.858-15.355-5.858-21.213,0.001 c-5.857,5.858-5.857,15.355,0.001,21.213l139.393,139.39L79.393,304.394c-5.857,5.858-5.857,15.355,0.001,21.213 C82.322,328.536,86.161,330,90,330s7.678-1.464,10.607-4.394l149.999-150.004c2.814-2.813,4.394-6.628,4.394-10.606 C255,161.018,253.42,157.202,250.606,154.389z'
			const dValueRightArrow =
				'M250.606,154.389l-150-149.996c-5.857-5.858-15.355-5.858-21.213,0.001 c-5.857,5.858-5.857,15.355,0.001,21.213l139.393,139.39L79.393,304.394c-5.857,5.858-5.857,15.355,0.001,21.213 C82.322,328.536,86.161,330,90,330s7.678-1.464,10.607-4.394l149.999-150.004c2.814-2.813,4.394-6.628,4.394-10.606 C255,161.018,253.42,157.202,250.606,154.389z'
			const leftArrowSVG = createSVG(dValueLeftArrow)
			const rightArrowSVG = createSVG(dValueRightArrow)

			leftArrow = createHTMLElement('div', 'prev-arrow')
			leftArrow.append(leftArrowSVG)
			leftArrow.addEventListener('click', () =>
				updateItemsInfo(itemsInfo.position.current - 1)
			)

			rightArrow = createHTMLElement('div', 'next-arrow')
			rightArrow.append(rightArrowSVG)
			rightArrow.addEventListener('click', () =>
				updateItemsInfo(itemsInfo.position.current + 1)
			)

			sliderContentControls.append(leftArrow, rightArrow)

			// Функція SVG
			function createSVG(dValue, color = 'currentColor') {
				const svg = document.createElementNS(
					'http://www.w3.org/2000/svg',
					'svg'
				)
				svg.setAttribute('viewBox', '0 0 256 512')
				const path = document.createElementNS(
					'http://www.w3.org/2000/svg',
					'path'
				)
				path.setAttribute('fill', color)
				path.setAttribute('d', dValue)
				svg.appendChild(path)
				return svg
			}
		}

		// Функція крапок
		function createDots() {
			dotsWrapper = createHTMLElement('div', 'dots')
			for (let i = 0; i < itemsInfo.position.max + 1; i++) {
				const dot = document.createElement('div')
				dot.className = 'dot'
				dot.addEventListener('click', function () {
					updateItemsInfo(i)
				})
				dotsWrapper.append(dot)
			}
			sliderContentControls.append(dotsWrapper)
		}

		// Функція кнопок
		function createButtons() {
			const controlsWrapper = createHTMLElement('div', 'slider-controls')
			prevButton = createHTMLElement('button', 'prev-control', 'Prev')
			prevButton.addEventListener('click', () =>
				updateItemsInfo(itemsInfo.position.current - 1)
			)

			autoButton = createHTMLElement('button', 'auto-control', 'Auto')
			autoButton.addEventListener('click', () => {
				intervalId = setInterval(function () {
					if (itemsInfo.position.current < itemsInfo.position.max) {
						itemsInfo.update(itemsInfo.position.current + 1)
					} else {
						itemsInfo.reset()
					}
					_slideItem()
				}, itemsInfo.intervalSpeed)
			})

			nextButton = createHTMLElement('button', 'next-control', 'Next')
			nextButton.addEventListener('click', () =>
				updateItemsInfo(itemsInfo.position.current + 1)
			)

			controlsWrapper.append(prevButton, autoButton, nextButton)
			slider.append(controlsWrapper)
		}
	}

	// Встановити клас для контролів (кнопки, стрілки)
	function setClass(options) {
		if (options) {
			options.forEach(({ element, className, disabled }) => {
				if (element) {
					disabled
						? element.classList.add(className)
						: element.classList.remove(className)
				} else {
					console.log('Помилка: функція setClass(): element = ', element)
				}
			})
		}
	}

	// Оновити значення слайдера
	function updateItemsInfo(value) {
		itemsInfo.update(value)
		_slideItem(true)
	}

	// Відобразити елементи
	function _render() {
		const { prevButtonDisabled, nextButtonDisabled } = controlsInfo
		let controlsArray = [
			{ element: leftArrow, className: 'd-none', disabled: prevButtonDisabled },
			{
				element: rightArrow,
				className: 'd-none',
				disabled: nextButtonDisabled,
			},
		]
		if (controlsInfo.buttonsEnabled) {
			controlsArray = [
				...controlsArray,
				{
					element: prevButton,
					className: 'disabled',
					disabled: prevButtonDisabled,
				},
				{
					element: nextButton,
					className: 'disabled',
					disabled: nextButtonDisabled,
				},
			]
		}

		// Відображення/приховання контролів
		setClass(controlsArray)

		// Переміщення слайдера
		sliderWrapper.style.transform = `translateX(${itemsInfo.offset * 100}%)`

		// Встановлення активного елемента для точок (dot)
		if (controlsInfo.dotsEnabled) {
			if (document.querySelector('.dot--active')) {
				document.querySelector('.dot--active').classList.remove('dot--active')
			}
			dotsWrapper.children[itemsInfo.position.current].classList.add(
				'dot--active'
			)
		}
	}

	// Перемістити слайд
	function _slideItem(autoMode = false) {
		if (autoMode && intervalId) {
			clearInterval(intervalId)
		}
		_updateControlsInfo()
		_render()
	}

	// Створити HTML розмітку для елемента
	function createHTMLElement(tagName = 'div', className, innerHTML) {
		const element = document.createElement(tagName)
		className ? (element.className = className) : null
		innerHTML ? (element.innerHTML = innerHTML) : null
		return element
	}

	// Доступні методи
	return { init }
})()

slider.init({
	// intervalSpeed: 1000,
	currentItem: 0,
	buttons: false,
	dots: true,
})
