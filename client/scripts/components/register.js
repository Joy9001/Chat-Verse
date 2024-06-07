document.querySelector('#change-profilePic-btn').addEventListener('click', () => {
    const modalProfilePic = document.querySelector('#change-details-profilePic')

    const gender = document.querySelector('#change-details-gender option:checked').value
    console.log(gender)

    fetch('/api/get-avatar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ gender }),
    })
        .then((res) => res.json())
        .then((data) => {
            console.log(data.avatar)
            // console.log(modalProfilePic.src);
            modalProfilePic.src = data.avatar
        })
        .catch((error) => console.log(error.message))
})

document.querySelector('#register-btn').addEventListener('click', () => {
    const email = document.querySelector('#register-email').value
    const password = document.querySelector('#register-password').value

    const name = document.querySelector('#change-details-name').value
    const username = document.querySelector('#change-details-username').value
    const gender = document.querySelector('#change-details-gender option:checked').value
    const avatar = document.querySelector('#change-details-profilePic').src

    if (!email || !password) {
        const alert = "Email and password can't be empty"
        document.querySelector('#register-alert span').textContent = alert
        document.querySelector('#register-alert').classList.remove('hidden')

        setTimeout(() => {
            document.querySelector('#register-alert').classList.add('hidden')
        }, 3000)
        return
    }

    if (!name || !username || !gender || !avatar) {
        const alert = 'Please fill all the details in the change details section'
        document.querySelector('#register-alert span').textContent = alert
        document.querySelector('#register-alert').classList.remove('hidden')

        setTimeout(() => {
            document.querySelector('#register-alert').classList.add('hidden')
        }, 3000)
        return
    }

    fetch('/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, name, username, gender, avatar }),
    })
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
            if (data.error) {
                document.querySelector('#register-alert span').textContent = data.error
                document.querySelector('#register-alert').classList.remove('hidden')
                return
            }
            document.querySelector('#register-alert span').textContent = 'Registered successfully'
            document.querySelector('#register-alert').classList.remove('hidden')

            window.location.href = '/auth/login'

            setTimeout(() => {
                document.querySelector('#register-alert').classList.add('hidden')
            }, 10000)
        })
        .catch((err) => {
            console.log(err.message)
            document.querySelector('#register-alert span').textContent = 'Internal server error'
            document.querySelector('#register-alert').classList.remove('hidden')
        })
})
