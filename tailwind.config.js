/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./components/**/*.{html,js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				primary: "#3b82f6", //blue-500
				inputFocusColor: "#a0d911", //hope-500
				success: "#a0d911", //hope-500
				warning: "#faad14", //gold 6
				danger: "#ff4d4f",
				hope: {
					50: "#fcffe6", //selected bg color
					100: "#f4ffb8",
					200: "#eaff8f",
					300: "#d3f261",
					400: "#bae637", //hover
					500: "#a0d911", //brand
					600: "#7cb305", //click
					700: "#5b8c00",
					800: "#3f6600",
					900: "#254000",
				},
				auiLight: {
					//antD
					black85: "#262626", //black 85%,title text
					title: "#262626", //black 85%

					black65: "#595959", //65%,primary text
					primary: "#595959", //65%

					black45: "#8c8c8c", //45%,secondary text
					secondary: "#8c8c8c", //45%

					black25: "#bfbfbf", //25%,border/disable
					disable: "#bfbfbf", //25%

					black15: "#d9d9d9", //15%,border/disable
					border: "#d9d9d9", //15%

					black6: "#f0f0f0", //6%,divider
					divider: "#f0f0f0", //6%

					black4: "#f5f5f5", //4%,background
					background: "#f5f5f5", //4%

					black2: "#fafafa", //2%,tableHeader
					tableHeader: "#fafafa", //2%
				},
			},
			boxShadow: {
				primary: `0 0 0 2px #3b82f6`,
				input: `0 0 0 2px #3b82f6`,
				button: `0 0 0 2px #3b82f6`,
			},
			// borderRadius: {
			// 	input: `0 0 0 2px #a0d911`,
			// },
			// transition
		},
	},
	plugins: [],
};
