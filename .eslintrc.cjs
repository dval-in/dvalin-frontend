/** @type { import('eslint').Linter.Config } */
module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 2020,
		extraFileExtensions: ['.svelte']
	},
	extends: [
		'plugin:@typescript-eslint/recommended',
		'plugin:svelte/prettier',
		'plugin:prettier/recommended'
	],
	rules: {
		'no-unused-vars': 'off',
		'@typescript-eslint/no-unused-vars': [
			'error',
			{
				argsIgnorePattern: '^_',
				varsIgnorePattern: '^_',
				caughtErrorsIgnorePattern: '^_'
			}
		],
		'@typescript-eslint/naming-convention': [
			'error',
			{
				selector: ['default'],
				format: ['camelCase', 'PascalCase'],
				leadingUnderscore: 'allow'
			},
			{
				selector: ['variable'],
				format: ['camelCase', 'UPPER_CASE']
			},
			{
				selector: ['objectLiteralProperty'],
				format: ['camelCase', 'UPPER_CASE']
			},
			{
				selector: ['typeLike'],
				format: ['PascalCase']
			}
		]
	},
	overrides: [
		{
			files: ['*.svelte'],
			parser: 'svelte-eslint-parser',
			parserOptions: {
				parser: '@typescript-eslint/parser'
			}
		}
	]
};
