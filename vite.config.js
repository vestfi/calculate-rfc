// vite.config.js
const path = require('path')
const { defineConfig } = require('vite')
const dts = require('vite-plugin-dts')

module.exports = defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'lib/main.ts'),
      name: 'calculateRfc',
      fileName: (format) => `calculateRfc.${format}.js`,
    },
  },
  plugins: [dts()],
})
