// @ts-check
const { devices } = require('@playwright/test');

/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
  testDir: './tests',
  retries: 0,

  timeout: 30 * 1000,
  expect: {
    timeout: 5000,
  },

  reporter: 'html',

  use: {
    browserName: 'chromium',
    headless: false, // headful mode
    viewport: { width: 1280, height: 1024 },
    screenshot: 'on',
    trace: 'on',
    launchOptions: {
      slowMo: 100,
    },
  },
};

module.exports = config;
