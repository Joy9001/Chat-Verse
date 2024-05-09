import { Schema, model } from "mongoose";
import {
	nameValidator,
	usernameValidator,
	emailValidator,
	passwordValidator,
} from "./validator.js";
import { generateAvatar } from "../helpers/generateAvatar.helper.js";

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
			reuired: [true, "Please enter an email"],
			unique: true,
			validate: emailValidator,
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
			default: "",
		},
		role: {
			type: Schema.Types.String,
			default: "user",
		},
	},
	{ timestamps: true }
);

userSchema.pre("save", function (next) {
	if (this.profilePic === "") {
		try {
			this.profilePic = generateAvatar(this.name);
			// console.log("Avatar generated successfully", this.profilePic);
		} catch (error) {
			console.error("Error generating avatar", error);
		}
	}
	next();
});

const User = model("User", userSchema);

export default User;
