import validator from "validator";

const nameValidator = [
	{
		validator: validator.isAlpha,
		message: "Name must contain only letters",
	},
	{
		validator: validator.isLength,
		arguments: [3, 50],
		message: (min, max) =>
			`Name should be between ${min} and ${max} characters`,
	},
];

const usernameValidator = [
	{
		validator: validator.isAlphanumeric,
		message: "Username must contain only letters and numbers",
	},
	{
		validator: validator.isLength,
		arguments: [5, 25],
		message: (min, max) =>
			`Username should be between ${min} and ${max} characters`,
	},
	{
		validator: validator.isLowercase,
		message: "Username must be lowercase",
	},
];

const emailValidator = [
	{
		validator: validator.isEmail,
		message: "Please enter a valid email",
	},
	{
		validator: validator.isLength,
		arguments: [5, 50],
		message: (min, max) =>
			`Email should be between ${min} and ${max} characters`,
	},
];

const phoneValidator = [
	{
		validator: validator.isMobilePhone,
		message: "Please enter a valid phone number",
	},
];

const passwordValidator = [
	{
		validator: validator.isStrongPassword,
		message: "Password is not strong enough",
	},
];

export {
	nameValidator,
	usernameValidator,
	emailValidator,
	phoneValidator,
	passwordValidator,
};
