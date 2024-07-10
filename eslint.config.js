// @ts-check

import tseslint from 'typescript-eslint';
import svelteParser from 'svelte-eslint-parser';
import eslintPluginSvelte from 'eslint-plugin-svelte';
import eslintPluginPrettier from 'eslint-plugin-prettier/recommended';

export default tseslint.config(
	{
		ignores: [
			'.github/*',
			'.husky/*',
			'.svelte-kit/*',
			'.node_modules/*',
			'src/lib/components/ui/*',
			'**/.DS_Store',
			'.env*',
			'pnpm-lock.yaml'
		]
	},
	{
		plugins: {
			'@typescript-eslint': tseslint.plugin
		},
		languageOptions: {
			parser: tseslint.parser,
			parserOptions: {
				project: true,
				sourceType: 'module',
				ecmaVersion: 2020,
				extraFileExtensions: ['.svelte']
			}
		},
		rules: {
			'@typescript-eslint/no-unused-vars': [
				'error',
				{
					argsIgnorePattern: '^_',
					varsIgnorePattern: '^_',
					caughtErrorsIgnorePattern: '^_'
				}
			]
		}
	},
	...eslintPluginSvelte.configs['flat/prettier'],
	{
		// disable type-aware linting on JS files
		files: ['**/*.js'],
		...tseslint.configs.disableTypeChecked
	},
	{
		files: ['src/**/*.svelte'],
		languageOptions: {
			parser: svelteParser,
			parserOptions: {
				parser: tseslint.parser
			}
		}
	},
	eslintPluginPrettier
);
