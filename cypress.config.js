const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://compassuolfront.serverest.dev',
    env: {
      apiUrl: 'https://compassuol.serverest.dev'
    },
    video: false,
    screenshotOnRunFailure: true,
    defaultCommandTimeout: 10000,
    requestTimeout: 15000,
    responseTimeout: 15000,
    setupNodeEvents(on, config) {
      return config;
    }
  }
});
