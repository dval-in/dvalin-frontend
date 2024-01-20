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
					text: '#FFFFFF',
					background: '#1C1C22',
					foreground: '#373743',
					activeSidebar: '#000000',
					sidebar: '#373743',
					sidebarText: '#FFFFFF',
					sidebarHover: '#8EA5d3',
					primary: '#D3BC8E'
				},
				t1: {
					border: '#000000',
					text: '#393946',
					background: '#FFFFFF',
					foreground: '#FFFFFF',
					activeSidebar: '#D3BC8E',
					sidebar: '#F8F5F2',
					sidebarText: '#000000',
					sidebarHover: '#8EA5d3',
					primary: '#D3BC8E'
				},
				t2: {
					border: '#000000',
					text: '#FFFFFF',
					background: '#1C3563',
					foreground: '#3F6797',
					activeSidebar: '#000000',
					sidebarText: '#8BB0C9',
					primary: '#D0DFE9',
					sidebarHover: '#FFFFFF',
					sidebar: '#10172A'
				},
				t3: {
					border: '#000000',
					text: '#FFFFFF',
					background: '#304B42',
					foreground: '#13644D',
					activeSidebar: '#000000',
					sidebarText: '#97C9A1',
					primary: '#B7E4C7',
					sidebarHover: '#FFFFFF',
					sidebar: '#081C15'
				},
				t4: {
					border: '#000000',
					text: '#C17BBA',
					background: '#3E328A',
					foreground: '#3B7DB0',
					activeSidebar: '#FFFFFF',
					sidebarText: '#926ADE',
					primary: '#FFFFFF',
					sidebarHover: '#C17BBA',
					sidebar: '#101F46'
				},
				t5: {
					border: '#000000',
					text: '#000000',
					background: '#CDAB4A',
					foreground: '#D2B45E',
					activeSidebar: '#C09B28',
					sidebarText: '#27200B',
					primary: '#6E1E29',
					sidebarHover: '#FFFFFF',
					sidebar: '#9E812C'
				},
				t6: {
					border: '#000000',
					text: '#DBEBE2',
					background: '#997F66',
					foreground: '#5A9189',
					activeSidebar: '#C4BBA8',
					sidebarText: '#A47535',
					primary: '#C1846B',
					sidebarHover: '#FFFFFF',
					sidebar: '#27200B'
				}
			},
			{
				defaultTheme: 't0'
			}
		)
	]
};

export default config;
