import { fontFamily } from 'tailwindcss/defaultTheme';
import { createThemes } from 'tw-colors';
/* eslint-disable @typescript-eslint/naming-convention */
/** @type {import('tailwindcss').Config} */
const config = {
	darkMode: ['class'],
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		'./node_modules/svelte-ux/**/*.{svelte,js}',
		'./node_modules/layerchart/**/*.{svelte,js}'
	],
	corePlugins: {
		preflight: true
	},
	safelist: ['0'],
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			fontFamily: {
				sans: [...fontFamily.sans]
			}
		}
	},
	plugins: [
		createThemes(
			{
				dark: {
					border: '#000000',
					foreground: '#373743',
					//only use styles underneath
					primary: '#D3BC8E',
					secondary: '#8599A8',
					tertiary: '#373743',
					tertiaryHover: '#535365',
					tertiaryActive: '#1C1C22',
					neutral: '#1C1C22',
					text: '#FFFFFF'
				},
				light: {
					border: '#000000',
					foreground: '#FFFFFF',
					//only use styles underneath
					primary: '#D3BC8E',
					secondary: '#8599A8',
					tertiary: '#E9E4DA',
					tertiaryHover: '#D1C7B2',
					tertiaryActive: '#FFFFFF',
					neutral: '#FFFFFF',
					text: '#393946'
				}
			},
			{
				defaultTheme: 'dark'
			}
		)
	]
};

export default config;
