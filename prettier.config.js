export default {
	useTabs: true,
	singleQuote: true,
	trailingComma: 'none',
	printWidth: 100,
	endOfLine: 'lf',
	tabWidth: 4,
	plugins: ['prettier-plugin-svelte'],
	htmlWhitespaceSensitivity: 'ignore',
	overrides: [
		{
			files: '*.svelte',
			options: {
				parser: 'svelte'
			}
		}
	]
};
