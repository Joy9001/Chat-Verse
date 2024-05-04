const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
		},
		postId: {
			type: mongoose.Schema.Types.ObjectId,
			default: function () {
				return this._id;
			},
		},
		postImg: {
			type: String,
		},
		name: {
			type: String,
			required: true,
		},
		username: {
			type: String,
			required: true,
		},
		caption: {
			type: String,
		},
		likes: {
			type: [mongoose.Schema.Types.ObjectId],
		},
		saves: {
			type: [mongoose.Schema.Types.ObjectId],
		},
		comments: {
			type: [
				{
					userId: {
						type: mongoose.Schema.Types.ObjectId,
					},
					name: {
						type: String,
						required: true,
					},
					username: {
						type: String,
						required: true,
					},
					commentText: {
						type: String,
						required: true,
					},
					commentedAt: {
						type: Date,
						required: true,
						immutable: true,
					},
				},
			],
		},
	},
	{ timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
