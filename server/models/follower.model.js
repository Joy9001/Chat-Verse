const mongoose = require("mongoose");
const { Schema } = mongoose;
const User = mongoose.model("User");

const followerSchema = new Schema(
	{
		userId: {
			type: Schema.Types.ObjectId,
			ref: User,
		},
		followers: [
			{
				type: Schema.Types.ObjectId,
				ref: User,
			},
		],
		followerCount: {
			type: Schema.Types.Number,
			default: 0,
		},
		following: [
			{
				type: Schema.Types.ObjectId,
				ref: User,
			},
		],
		followingCount: {
			type: Schema.Types.Number,
			default: 0,
		},
	},
	{ timestamps: true }
);

const Follower = mongoose.model("Follower", followerSchema);

module.exports = Follower;
