<div align="center">
  <img src="./.github/tailwindcss-mark.svg" alt="Tailwind CSS" width="108" height="66">
  <h1>Tailwind CSS Plugin Starter</h1>
  <p>A boilerplate for Tailwind CSS plugins</p>

  <p>
    <a href="https://github.com/cossssmin/tailwindcss-plugin-starter/actions">
      <img src="https://github.com/cossssmin/tailwindcss-plugin-starter/actions/workflows/nodejs.yml/badge.svg" alt="Build Status">
    </a>
    <a href="https://github.com/cossssmin/tailwindcss-plugin-starter/blob/main/LICENSE">
      <img src="https://img.shields.io/github/license/maizzle/tailwindcss-plugin-starter" alt="License">
    </a>
  </p>
</div>

### About

This is a starter project for Tailwind CSS plugins.

### Features

- Includes examples for:
  - `addBase`
  - `addUtilities`
  - `matchUtilities`
  - `addComponents`
  - `addVariant`
  - exposing options
  - providing default values
- Tests with [`Jest`](https://jestjs.io/)
- Coverage with [`c8`](https://github.com/bcoe/c8)
- Releases with [`np`](https://github.com/sindresorhus/np)
- Code formatting with [`prettier`](https://prettier.io/)

### Getting started

Clone the project from GitHub:

```sh
git clone https://github.com/maizzle/tailwindcss-plugin-starter.git
```

Install dependencies:

```sh
cd tailwindcss-plugin-starter

npm install
```

### Usage

Write your plugin in the `src/index.js`.

Add tests in the `src/index.test.js` file.

Use the provided examples or see the [Tailwind CSS plugin documentation](https://tailwindcss.com/docs/plugins).

### Publishing to npm

1. Update this `README.md` file.
1. Update the `LICENSE` file.
1. Update plugin name, description etc in `package.json`. If this is the first release, leave the version number as `0.0.0` and `np` will bump it for you ([docs](https://github.com/sindresorhus/np#initial-version)).
1. Update `CHANGELOG.md` or remove it if you're not going to keep a changelog.
1. Commit and push your changes.
1. Run `npm run release` to publish your plugin to npm.

---

# tailwindcss-plugin-name

Replace this text with a short description of what the plugin does.

## Installation

Install the plugin from npm:

```sh
npm install -D tailwindcss-plugin-name
```

Then add the plugin to your `tailwind.config.js` file:

```js
// tailwind.config.js
module.exports = {
  theme: {
    // ...
  },
  plugins: [
    require('tailwindcss-plugin-name'),
    // ...
  ],
}
```

## Usage

Provide instructions for how to use the plugin.

## Configuration

If your plugin is configurable, provide instructions for how to configure it.

```js
// tailwind.config.js
module.exports = {
  plugins: [
    require('tailwindcss-plugin-name')({
      className: 'markdown',
    }),
    // ...
  ],
}
```
