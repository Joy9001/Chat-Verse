/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./**/*.{html,js,ejs}"],
	theme: {
		fontFamily: {
			operator: ["Operator Mono"],
		},
		extend: {
			translate: ["group-hover"],
			spacing: {
				13: "3.25rem",
				18: "4.5rem",
				19: "4.75rem",
				22: "5.5rem",
				58: "14.5rem",
				100: "25rem",
			},
			borderWidth: {
				1: "1px",
			},
			screens: {
				xxs: "400px",
				xs: "500px",
				"3xl": "1800px",
			},
		},
	},
	plugins: ["prettier-plugin-tailwindcss", require("daisyui")],
	daisyui: {
		themes: ["light", "dark", "cupcake"],
	},
};
