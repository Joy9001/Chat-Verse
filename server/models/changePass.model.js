const mongoose = require("mongoose");

const passwordChangeSchema = new mongoose.Schema({
	userId: { type: mongoose.Schema.Types.ObjectId, required: true }, // Manually defined ID field
	newPassword: { type: String, required: true },
});

const PasswordChange = mongoose.model("PasswordChange", passwordChangeSchema);

module.exports = PasswordChange;
