;(() => {
	'use strict'
	document.querySelector('#change-profilePic-btn').addEventListener('click', function () {
		var e = document.querySelector('#change-details-profilePic')
		fetch('/api/get-avatar')
			.then(function (e) {
				return e.json()
			})
			.then(function (t) {
				e.src = t.avatar
			})
			.catch(function (e) {
				return console.log(e.message)
			})
	}),
		document.querySelector('#register-btn').addEventListener('click', function () {
			var e = DOMPurify.sanitize(document.querySelector('#register-email').value),
				t = DOMPurify.sanitize(document.querySelector('#register-password').value),
				r = DOMPurify.sanitize(document.querySelector('#change-details-name').value),
				n = DOMPurify.sanitize(document.querySelector('#change-details-username').value),
				o = DOMPurify.sanitize(document.querySelector('#change-details-gender option:checked').value),
				i = document.querySelector('#change-details-profilePic').src
			if (!e || !t) {
				return (
					(document.querySelector('#register-alert span').textContent = "Email and password can't be empty"),
					document.querySelector('#register-alert').classList.remove('hidden'),
					void setTimeout(function () {
						document.querySelector('#register-alert').classList.add('hidden')
					}, 3e3)
				)
			}
			if (!(r && n && o && i)) {
				return (
					(document.querySelector('#register-alert span').textContent =
						'Please fill all the details in the change details section'),
					document.querySelector('#register-alert').classList.remove('hidden'),
					void setTimeout(function () {
						document.querySelector('#register-alert').classList.add('hidden')
					}, 3e3)
				)
			}
			fetch('/auth/register', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email: e, password: t, name: r, username: n, gender: o, avatar: i }),
			})
				.then(function (e) {
					return e.json()
				})
				.then(function (e) {
					if ((console.log(e), e.error))
						return (
							(document.querySelector('#register-alert span').textContent = e.error),
							void document.querySelector('#register-alert').classList.remove('hidden')
						)
					;(document.querySelector('#register-alert span').textContent = 'Registered successfully'),
						document.querySelector('#register-alert').classList.remove('hidden'),
						(window.location.href = '/auth/login'),
						setTimeout(function () {
							document.querySelector('#register-alert').classList.add('hidden')
						}, 1e4)
				})
				.catch(function (e) {
					console.log(e.message),
						(document.querySelector('#register-alert span').textContent = 'Internal server error'),
						document.querySelector('#register-alert').classList.remove('hidden')
				})
		})
})()
