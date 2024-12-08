/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			fontSize: {
				clamp: "clamp(1rem, 5vw, 3rem)",
			},
		},
	},
	plugins: [],
}
