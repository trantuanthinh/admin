/**
 * @format
 * @type {import('tailwindcss').Config}
 */

module.exports = {
	purge: [],
	darkMode: true,
	content: ["./src/**/*.{html,ts}", "./node_modules/flowbite/**/*.js"],
	theme: {
		extend: {},
	},
	variants: {
		extend: {},
	},
	plugins: [require("flowbite/plugin")],
};
