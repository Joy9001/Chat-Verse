import { Schema, model } from "mongoose";
import {
	nameValidator,
	usernameValidator,
	emailValidator,
	phoneValidator,
	passwordValidator,
} from "./validator.js";

const userSchema = new Schema(
	{
		name: {
			type: Schema.Types.String,
			required: [true, "Please enter your full name"],
			validate: nameValidator,
		},
		username: {
			type: Schema.Types.String,
			required: [true, "Please enter a username"],
			unique: true,
			validate: usernameValidator,
		},
		email: {
			type: Schema.Types.String,
			unique: true,
			validate: emailValidator,
		},
		phone: {
			type: Schema.Types.String,
			unique: true,
			validate: phoneValidator,
		},
		gender: {
			type: Schema.Types.String,
			required: [true, "Please enter your gender"],
		},
		password: {
			type: Schema.Types.String,
			required: [true, "Please enter a password"],
			validate: passwordValidator,
		},
		profilePic: {
			type: Schema.Types.String,
			default: function () {
				return `https://avatar.iran.liara.run/username?username=${this.name}`;
			},
		},
		role: {
			type: Schema.Types.String,
			default: "user",
		},
	},
	{ timestamps: true }
);

const User = model("User", userSchema);

export default User;
