import path from 'path'
import postcss from 'postcss'
import examplePlugin from '../src'
import { expect, test } from 'vitest'
import tailwindcss from 'tailwindcss'

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
    content: [{ raw: String.raw`<h1 class="underline">Level 1</h1>` }],
    corePlugins: {
      preflight: true,
    },
  }

  return run(config, '@tailwind base; @tailwind utilities').then(result => {
    const h1 = String.raw`h1 {
  font-size: 1.5rem;
}`

    expect(result.css).toContain(h1)
  })
})

test('addUtilities', () => {
  const config = {
    content: [{ raw: String.raw`
    <div class="content-hidden"></div>
    <div class="content-visible"></div>`
  }],
  }

  return run(config).then(result => {
    expect(result.css).toEqual(String.raw`
.content-hidden {
    content-visibility: hidden
}
.content-visible {
    content-visibility: visible
}
    `.trim())
  })
})

test('matchUtilities', () => {
  const config = { content: [{ raw: String.raw`<div class="tab-2"></div>` }],
  }

  return run(config).then(result => {
    expect(result.css).toEqual(String.raw`
.tab-2 {
    tab-size: 2
}
    `.trim())
  })
})

test('addComponents', () => {
  const config = {
    content: [{ raw: String.raw`<div class="btn"></div>` }],
    plugins: [
      examplePlugin({
        className: 'btn',
      })
    ],
  }

  return run(config, '@tailwind components').then(result => {
    expect(result.css).toEqual(String.raw`
.btn {
    padding: .5rem 1rem;
    font-weight: 600
}
    `.trim())
  })
})

test('addVariant', () => {
  const config = { content: [{ raw: String.raw`<div class="optional:hidden"></div>` }],
  }

  return run(config).then(result => {
    expect(result.css).toEqual(String.raw`
.optional\:hidden:optional {
    display: none
}
    `.trim())
  })
})

test('addVariant (array)', () => {
  const config = { content: [{ raw: String.raw`<div class="hocus:opacity-0"></div>` }],
  }

  return run(config).then(result => {
    expect(result.css).toEqual(String.raw`
.hocus\:opacity-0:hover {
    opacity: 0
}
.hocus\:opacity-0:focus {
    opacity: 0
}
    `.trim())
  })
})

test('addVariant (media)', () => {
  const config = { content: [{ raw: String.raw`<div class="supports-grid:hidden"></div>` }],
  }

  return run(config).then(result => {
    expect(result.css).toEqual(String.raw`
@supports (display: grid) {
    .supports-grid\:hidden {
        display: none
    }
}
    `.trim())
  })
})
