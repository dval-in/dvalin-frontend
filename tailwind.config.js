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
	safelist: ['fontaine'],
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
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
				fontaine: {
					border: '#000000',
					input: '#000000',
					background: '#3F6797',
					foreground: '#D0DFE9',
					activeSidebar: '#000000',
					sidebarText: '#8BB0C9',
					fill: '#D0DFE9',
					sidebar: '#10172A'
				},
				sumeru: {
					border: '#000000',
					input: '#000000',
					background: '#2d6a4f',
					foreground: '#b7e4c7',
					activeSidebar: '#000000',
					sidebarText: '#d8f3dc',
					fill: '#b7e4c7',
					sidebar: '#081c15'
				},
				liyue: {
					border: '#000000',
					input: '#000000',
					background: '#E7C561',
					foreground: '#5A4608',
					activeSidebar: '#000000',
					sidebarText: '#312504',
					fill: '#5A4608',
					sidebar: '#C6A237'
				}
			},
			{
				defaultTheme: 'fontaine'
			}
		)
	]
};

export default config;
