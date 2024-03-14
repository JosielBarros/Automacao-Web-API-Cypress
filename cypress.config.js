// const { defineConfig } = require("cypress");

// module.exports = defineConfig({
//   e2e: {
//     setupNodeEvents(on, config) {
//       // implement node event listeners here
//     },
//   },
// });

const { defineConfig } = require('cypress')

module.exports = defineConfig({
  projectId: 'wdqp1i',
  e2e: {
    baseUrl: 'http://localhost',
    env: {
      hideCredentials: true,
      requestMode: true,
    },
    experimentalRunAllSpecs: true,
  },
  // viewportWidth: 1920,
  // viewportHeight: 1080,
  fixturesFolder: false,
  video: false,
})
