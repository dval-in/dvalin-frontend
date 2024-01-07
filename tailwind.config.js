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
        },
	},
	plugins: [
		createThemes(
			{
				t0: {
					border: '#000000',
					text: '#ffffff',
					background: '#1c3563',
					foreground: '#3F6797',
					activeSidebar: '#000000',
					sidebarText: '#8BB0C9',
					fill: '#D0DFE9',
					sidebar: '#10172A'
				},
				t1: {
					border: '#000000',
					text: '#FFFFFF',
					background: '#304B42',
					foreground: '#13644D',
					activeSidebar: '#000000',
					sidebarText: '#97C9A1',
					fill: '#B7E4C7',
					sidebar: '#081C15'
				},
				t2: {
					border: '#000000',
					text: '#000000',
					background: '#CDAB4A',
					foreground: '#D2B45E',
					activeSidebar: '#C09B28',
					sidebarText: '#27200B',
					sidebar: '#9E812C'
				}
			},
			{
				defaultTheme: 't0'
			}
		)
	]
};

export default config;