const plugin = require('tailwindcss/plugin')

module.exports = plugin.withOptions(
  function (options) {
    const className = options ? options.className : 'markdown'

    return function ({ addBase, addUtilities, matchUtilities, addComponents, addVariant, theme }) {
      /**
       * Add base styles
       * https://tailwindcss.com/docs/plugins#adding-base-styles
       */

      addBase({
        h1: { fontSize: theme('fontSize.2xl') },
        h2: { fontSize: theme('fontSize.xl') },
      })

      /**
       * Static utilities
       * https://tailwindcss.com/docs/plugins#static-utilities
       */

      addUtilities({
        '.content-hidden': {
          'content-visibility': 'hidden',
        },
        '.content-visible': {
          'content-visibility': 'visible',
        },
      })

      /**
       * Dynamic utilities
       * https://tailwindcss.com/docs/plugins#dynamic-utilities
       */

      matchUtilities(
        {
          tab: value => ({
            tabSize: value,
          }),
        },
        {
          values: theme('tabSize'),
        }
      )

      /**
       * Adding components
       * https://tailwindcss.com/docs/plugins#adding-components
       */

      addComponents({
        [`.${className}`]: {
          padding: '.5rem 1rem',
          fontWeight: '600',
        },
      })

      /**
       * Add variants
       * https://tailwindcss.com/docs/plugins#adding-variants
       */

      // Simple
      addVariant('optional', '&:optional')

      // Array
      addVariant('hocus', [
        '&:hover',
        '&:focus'
      ])

      // @media queries
      addVariant('supports-grid', '@supports (display: grid)')
    }
  }, function (options) {
    /**
     * Provide default values
     */
    return {
      theme: {
        tabSize: {
          1: '1',
          2: '2',
          4: '4',
          8: '8',
        }
      },
    }
  }
)
