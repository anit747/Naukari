// @ts-check
const { devices } = require('@playwright/test');

const config = {
  testDir: './tests',
  retries :0,
  
  /* Maximum time one test can run for. */
  timeout: 30 * 1000,
  expect: {
  
    timeout: 5000
  },
  
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {

    browserName : 'chromium',
    headless : false,
    viewport: { width: 1280, height: 720 },
    screenshot : 'on',
    trace : 'on',//off,on,
    launchOptions: {
    slowMo: 50 // optional for better timing
  }

    
    
    
  },


};

module.exports = config;