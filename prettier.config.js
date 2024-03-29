/** @type {import('prettier').Config} */
module.exports = {
  bracketSpacing: true,
  semi: false,
  singleQuote: true,
  trailingComma: 'all',
  printWidth: 80,
  tabWidth: 2,
  plugins: ['prettier-plugin-tailwindcss'],
  arrowParens: 'always',
}
