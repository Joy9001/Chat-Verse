import crypto from 'crypto';
import { Schema, model } from 'mongoose';
import { generateAvatar } from '../helpers/generateAvatar.helper.js';
import {
	emailValidator,
	nameValidator,
	passwordValidator,
	usernameValidator,
} from './validator.js';

const generateUsername = (name) => {
	const nameLower = name.toLowerCase().replace(/ /g, '_');
	const username = nameLower + '@' + crypto.randomInt(1, 100000);
	return username;
};

const userSchema = new Schema(
	{
		name: {
			type: Schema.Types.String,
			required: [true, 'Please enter your full name'],
			validate: nameValidator,
		},
		username: {
			type: Schema.Types.String,
			unique: true,
			validate: usernameValidator,
		},
		email: {
			type: Schema.Types.String,
			reuired: [true, 'Please enter an email'],
			unique: true,
			validate: emailValidator,
		},
		gender: {
			type: Schema.Types.String,
			default: '',
		},
		password: {
			type: Schema.Types.String,
			validate: passwordValidator,
		},
		avatar: {
			type: Schema.Types.String,
			default: '',
		},
		role: {
			type: Schema.Types.String,
			default: 'user',
		},
		providerId: {
			type: Schema.Types.String,
			default: '',
		},
		provider: {
			type: Schema.Types.String,
			default: '',
		},
	},
	{ timestamps: true }
);

userSchema.pre('save', function (next) {
	try {
		if (!this.username) {
			this.username = generateUsername(this.name);
		}
		next();
	} catch (error) {
		console.error('Error in pre-save hook:', error);
		next(error);
	}
});

userSchema.pre('save', function (next) {
	try {
		if (this.avatar === '') {
			this.avatar = generateAvatar(this.name);
			console.log('Avatar generated successfully...');
		}
		next();
	} catch (error) {
		console.error('Error generating avatar', error);
		next(error);
	}
});

const User = model('User', userSchema);

export default User;
