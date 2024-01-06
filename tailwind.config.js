import { fontFamily } from 'tailwindcss/defaultTheme';
import { createThemes } from 'tw-colors';
/* eslint-disable @typescript-eslint/naming-convention */
/** @type {import('tailwindcss').Config} */
const config = {
	darkMode: ['class'],
	content: ['./src/**/*.{html,js,svelte,ts}'],
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
			backgroundColor: '#000000',
			colors: {},
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
				t0: {
					border: '#000000',
					input: '#000000',
					background: '#1C3563',
					foreground: '#CCCCCC', // sample
					activeSidebar: '#000000',
					sidebarText: '#8BB0C9',
					fill: '#D0DFE9',
					sidebar: '#10172A'
				},
				t1: {
					border: '#000000',
					input: '#000000',
					background: '#304B42',
					foreground: '#CCCCCC', // error
					activeSidebar: '#000000',
					sidebarText: '#D8F3Dc',
					fill: '#B7E4C7',
					sidebar: '#081C15'
				},
				t2: {
					border: '#000000',
					input: '#000000',
					background: '#E7C561',
					foreground: '#CCCCCC', // error
					activeSidebar: '#000000',
					sidebarText: '#312504',
					fill: '#5A4608',
					sidebar: '#C6A237'
				}
			},
			{
				defaultTheme: 't0'
			}
		)
	]
};

export default config;
