import path from 'path'
import postcss from 'postcss'
import examplePlugin from '.'
import { expect, test } from 'vitest'
import tailwindcss from 'tailwindcss'

// Custom CSS matcher
expect.extend({
  // Compare two CSS strings with all whitespace removed
  // This is probably naive but it's fast and works well enough.
  toMatchCss(received, argument) {
    function stripped(string_) {
      return string_.replaceAll(/\s/g, '').replaceAll(';', '')
    }

    const pass = stripped(received) === stripped(argument)

    return {
      pass,
      actual: received,
      expected: argument,
      message: () => pass ? 'All good!' : 'CSS does not match',
    }
  }
})

// Function to run the plugin
function run(config, css = '@tailwind utilities', plugin = tailwindcss) {
  let { currentTestName } = expect.getState()

  config = {
    ...{
      plugins: [examplePlugin],
      corePlugins: {
        preflight: false,
      }
    },
    ...config,
  }

  return postcss(plugin(config)).process(css, {
    from: `${path.resolve(__filename)}?test=${currentTestName}`,
  })
}

test('addBase', () => {
  const config = {
    content: [
      {
        raw: String.raw`🫣`
      }
    ],
    corePlugins: {
      preflight: true,
    },
  }

  return run(config, '@tailwind base').then(result => {
    expect(result.css).toContain('*, ::before, ::after')
  })
})

test('addUtilities', () => {
  const config = {
    content: [
      {
        raw: String.raw`
          <div class="content-hidden"></div>
          <div class="content-visible"></div>
        `
      }
    ],
  }

  return run(config).then(result => {
    expect(result.css).toMatchCss(String.raw`
      .content-hidden {
          content-visibility: hidden
      }
      .content-visible {
          content-visibility: visible
      }
    `)
  })
})

test('matchUtilities', () => {
  const config = {
    content: [
      {
        raw: String.raw`<div class="tab-2"></div>`
      }
    ],
  }

  return run(config).then(result => {
    expect(result.css).toMatchCss(String.raw`
      .tab-2 {
          tab-size: 2
      }
    `)
  })
})

test('addComponents', () => {
  const config = {
    content: [
      {
        raw: String.raw`<div class="btn"></div>`
      }
    ],
    plugins: [
      examplePlugin({
        className: 'btn'
      })
    ],
  }

  return run(config, '@tailwind components').then(result => {
    expect(result.css).toMatchCss(String.raw`
      .btn {
          padding: .5rem 1rem;
          font-weight: 600
      }
    `)
  })
})

test('addVariant', () => {
  const config = {
    content: [
      {
        raw: String.raw`<div class="optional:hidden"></div>`
      }
    ],
  }

  return run(config).then(result => {
    expect(result.css).toMatchCss(String.raw`
      .optional\:hidden:optional {
          display: none
      }
    `)
  })
})

test('addVariant (array)', () => {
  const config = {
    content: [
      {
        raw: String.raw`<div class="hocus:opacity-0"></div>`
      }
    ],
  }

  return run(config).then(result => {
    expect(result.css).toMatchCss(String.raw`
      .hocus\:opacity-0:hover {
          opacity: 0
      }
      .hocus\:opacity-0:focus {
          opacity: 0
      }
    `)
  })
})

test('addVariant (media)', () => {
  const config = {
    content: [
      {
        raw: String.raw`<div class="supports-grid:hidden"></div>`
      }
    ],
  }

  return run(config).then(result => {
    expect(result.css).toMatchCss(String.raw`
      @supports (display: grid) {
          .supports-grid\:hidden {
              display: none
          }
      }
    `)
  })
})
