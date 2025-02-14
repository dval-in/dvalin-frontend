import type { Config } from 'tailwindcss';

export const config: Config = {
	darkMode: 'selector',
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		'./node_modules/svelte-ux/**/*.{svelte,js}',
		'./node_modules/layerchart/**/*.{svelte,js}'
	]
};
