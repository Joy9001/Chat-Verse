import validator from 'validator'

const nameValidator = [
	{
		validator: validator.isLength,
		arguments: [3, 50],
		message: (min, max) => `Name should be between ${min} and ${max} characters`,
	},
]

const usernameValidator = [
	{
		validator: validator.isLength,
		arguments: [5, 25],
		message: (min, max) => `Username should be between ${min} and ${max} characters`,
	},
]

const emailValidator = [
	{
		validator: validator.isEmail,
		message: 'Please enter a valid email',
	},
	{
		validator: validator.isLength,
		arguments: [5, 50],
		message: (min, max) => `Email should be between ${min} and ${max} characters`,
	},
]

const passwordValidator = [
	{
		validator: validator.isStrongPassword,
		message: 'Password is not strong enough',
	},
]

export { nameValidator, usernameValidator, emailValidator, passwordValidator }
