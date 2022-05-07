const path = require('path')
const examplePlugin = require('.')
const postcss = require('postcss')
const tailwindcss = require('tailwindcss')

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

it('addBase', () => {
  const config = {
    content: [{ raw: String.raw`<h1>Level 1</h1><h2>Level 2</h2>` }],
    corePlugins: {
      preflight: true,
    },
  }

  return run(config, '@tailwind base; @tailwind utilities').then(result => {
    const h1 = String.raw`h1 {
  font-size: 1.5rem;
}`
    const h2 = String.raw`h2 {
  font-size: 1.25rem;
}`

    expect(result.css).toContain(h1)
    expect(result.css).toContain(h2)
  })
})

it('addUtilities', () => {
  const config = {
    content: [{ raw: String.raw`
    <div class="content-hidden"></div>
    <div class="content-visible"></div>`
  }],
  }

  return run(config).then(result => {
    expect(result.css).toMatchCss(String.raw`
      .content-hidden {
        content-visibility: hidden;
      }

      .content-visible {
        content-visibility: visible;
      }
    `)
  })
})

it('matchUtilities', () => {
  const config = { content: [{ raw: String.raw`<div class="tab-2"></div>` }],
  }

  return run(config).then(result => {
    expect(result.css).toMatchCss(String.raw`
      .tab-2 {
        tab-size: 2;
      }
    `)
  })
})

it('addComponents', () => {
  const config = {
    content: [{ raw: String.raw`<div class="btn"></div>` }],
    plugins: [
      examplePlugin({
        className: 'btn',
      })
    ],
  }

  return run(config, '@tailwind components').then(result => {
    expect(result.css).toMatchCss(String.raw`
      .btn {
        padding: .5rem 1rem;
        font-weight: 600;
      }
    `)
  })
})

it('addVariant', () => {
  const config = { content: [{ raw: String.raw`<div class="optional:hidden"></div>` }],
  }

  return run(config).then(result => {
    expect(result.css).toMatchCss(String.raw`
      .optional\:hidden:optional {
        display: none;
      }
    `)
  })
})

it('addVariant (function)', () => {
  const config = { content: [{ raw: String.raw`<div class="foo:hidden"></div>` }],
  }

  return run(config).then(result => {
    expect(result.css).toMatchCss(String.raw`
      .foo .hidden {
        display: none;
      }
    `)
  })
})
