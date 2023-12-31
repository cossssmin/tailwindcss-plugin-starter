<div align="center">
  <img src="./.github/tailwindcss-mark.svg" alt="Tailwind CSS" width="108" height="66">
  <h1>Tailwind CSS Plugin Starter</h1>
  <p>A boilerplate for creating Tailwind CSS plugins</p>

  [![Build][github-ci-shield]][github-ci]
  [![License][license-shield]][license]
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
- Tests with [`Vitest`](https://vitest.dev/)
- Coverage with [`v8`](https://vitest.dev/guide/coverage)
- Releases with [`np`](https://github.com/sindresorhus/np)

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

[github-ci]: https://github.com/maizzle/tailwindcss-plugin-starter/actions
[github-ci-shield]: https://github.com/maizzle/tailwindcss-plugin-starter/actions/workflows/nodejs.yml/badge.svg
[license]: ./LICENSE
[license-shield]: https://img.shields.io/github/license/maizzle/tailwindcss-plugin-starter?color=0e9f6e
