require('dotenv/config')
const configure = require('./server/configure')

module.exports = {
  devServer: {
    before: configure,
  },
  // style: {
  //   postcss: {
  //     plugins: [require('tailwindcss'), require('autoprefixer')],
  //   },
  // },
  // jest: {
  //   setupFiles: ['./src/__tests__/setup.js'],
  //   configure: {
  //     coveragePathIgnorePatterns: [
  //       'src/entities',
  //       'src/schemas',
  //       'validation.ts',
  //       'constants.ts',
  //       'config.ts',
  //       'configs.ts',
  //       'paths.ts',
  //     ],
  //   },
  // },
}
