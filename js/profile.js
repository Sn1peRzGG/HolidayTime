let noimage = '../img/avatar.png'

window.addEventListener('load', function () {
	// Перевірка, чи є аватар у локальному сховищі
	let avatarPath = localStorage.getItem('avatarPath')
	if (avatarPath) {
		// Якщо аватар є, встановлюємо його шлях
		document.getElementById('img-preview').setAttribute('src', avatarPath)
	} else {
		// Якщо localStorage пустий, завантажуємо avatar.png
		document.getElementById('img-preview').setAttribute('src', noimage)
		// Зберігаємо шлях до завантаженого аватара в localStorage
		localStorage.setItem('avatarPath', noimage)
	}
})

function readURL(input) {
	console.log(input.files)
	if (input.files && input.files[0]) {
		var reader = new FileReader()
		reader.onload = function (e) {
			// Збереження шляху завантаженого аватара в локальному сховищі
			localStorage.setItem('avatarPath', e.target.result)
			// Встановлення шляху завантаженого аватара
			document
				.getElementById('img-preview')
				.setAttribute('src', e.target.result)
		}

		reader.readAsDataURL(input.files[0])
	} else {
		// Якщо не обрано жодного файлу, встановлюємо noimage
		document.getElementById('img-preview').setAttribute('src', noimage)
	}
}
