import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { SvelteKitPWA } from '@vite-pwa/sveltekit';
import { resolve } from 'path';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
	preview: {
		host: true,
		port: 8080
	},
	optimizeDeps: {
		exclude: ['dvalin-data']
	},
	build: {
		commonjsOptions: {
			include: [/node_modules/]
		}
	},
	resolve: {
		alias: {
			'dvalin-data': resolve(__dirname, 'node_modules/dvalin-data/dist/types')
		},
		extensions: ['.mjs', '.js', '.mts', '.ts', '.json', '.svelte']
	},

	plugins: [
		sveltekit(),
		tailwindcss(),
		SvelteKitPWA({
			registerType: 'autoUpdate',
			includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
			devOptions: {
				enabled: true
			},
			workbox: {
				globPatterns: ['**/*.{js,css,html,ico,png,svg}']
			},
			manifest: {
				name: 'Dval.in',
				description: 'Dval.in description',
				theme_color: '#D3BC8E',
				icons: [
					{
						src: 'pwa-192x192.png',
						sizes: '192x192',
						type: 'image/png'
					},
					{
						src: 'pwa-512x512.png',
						sizes: '512x512',
						type: 'image/png'
					}
				]
			},
			pwaAssets: {
				config: 'pwa-assets.config.ts'
			}
		})
	]
});
