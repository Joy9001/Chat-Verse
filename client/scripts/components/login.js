document.querySelector('#login-btn').addEventListener('click', async () => {
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

    try {
        const response = await fetch('/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        })

        const data = await response.json()

        // alert(data.message)
        if (data.error) {
            throw new Error(data.error)
        }

        document.querySelector('#login-alert span').textContent = data.message
        document.querySelector('#login-alert').classList.remove('hidden')

        setTimeout(() => {
            window.location.href = '/chat'
        }, 5000)
    } catch (error) {
        document.querySelector('#login-alert span').textContent = error.message
        document.querySelector('#login-alert').classList.remove('hidden')

        setTimeout(() => {
            document.querySelector('#login-alert').classList.add('hidden')
        }, 3000)
    }
})
