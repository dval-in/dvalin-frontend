export default {
	useTabs: true,
	singleQuote: true,
	trailingComma: 'none',
	printWidth: 100,
	endOfLine: 'lf',
	tabWidth: 4,
	htmlWhitespaceSensitivity: 'ignore',
	plugins: ['prettier-plugin-svelte', 'prettier-plugin-tailwindcss'],
	tailwindStylesheet: '.src/app.css',
	tailwindConfig: './tailwind.config.ts',
	overrides: [
		{
			files: '*.svelte',
			options: {
				parser: 'svelte'
			}
		}
	]
};
