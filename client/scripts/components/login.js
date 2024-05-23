document.querySelector('#login-btn').addEventListener('click', () => {
    const email = document.querySelector('#login-email').value
    const password = document.querySelector('#login-password').value

    if (!email || !password) {
        const alert = "Email and password can't be empty"
        document.querySelector('#login-alert span').textContent = alert
        document.querySelector('#login-alert').classList.remove('hidden')

        setTimeout(() => {
            document.querySelector('#login-alert').classList.add('hidden')
        }, 3000)
        return
    }

    fetch('/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    })
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
            if (data.error) {
                document.querySelector('#login-alert span').textContent = data.error
                document.querySelector('#login-alert').classList.remove('hidden')
                return
            }
            document.querySelector('#login-alert span').textContent = 'Logged in successfully'
            document.querySelector('#login-alert').classList.remove('hidden')

            window.location.href = '/chat'

            setTimeout(() => {
                document.querySelector('#login-alert').classList.add('hidden')
            }, 10000)
        })
})
