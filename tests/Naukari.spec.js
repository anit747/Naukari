const { test, expect } = require('@playwright/test');
const path = require('path');

test('Upload Resume', async ({ page }) => {
  // Set custom user-agent to mimic real browser
  await page.setExtraHTTPHeaders({
    'User-Agent':
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36',
  });

  await page.goto('https://www.naukri.com/', { waitUntil: 'domcontentloaded' });
  await page.waitForLoadState('networkidle');

  const loginBtn = page.locator("//a[@id='login_Layer']");
  await loginBtn.waitFor({ state: 'visible', timeout: 15000 });
  await page.screenshot({ path: 'headless-debug-before-login.png', fullPage: true });

  await loginBtn.click();
  await page.locator("//input[@placeholder='Enter your active Email ID / Username']").fill("anitrai741@gmail.com");
  await page.locator("//input[@placeholder='Enter your password']").fill("!Scorpion@123");

  await page.locator("//button[@type='submit']").click();
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(3000); // buffer for post-login rendering
  await page.screenshot({ path: 'headless-debug-after-login.png', fullPage: true });

  const drawerIcon = page.locator("//div[@class='nI-gNb-drawer__icon']");
  await drawerIcon.waitFor({ state: 'visible', timeout: 15000 });
  await drawerIcon.click();

  await page.getByText('View & Update Profile', { exact: true }).click();
  await page.locator("//input[@value='Update resume']").click();

  const filePath = path.resolve(__dirname, '../uploads/Anit_Rai_SDET_Resume.docx');

  // Ensure file input is interactable
  await page.evaluate(() => {
    const input = document.querySelector('input[type="file"]');
    if (input) {
      input.style.display = 'block';
      input.removeAttribute('hidden');
    }
  });

  await page.setInputFiles('input[type="file"]', filePath);

  const successMsg = page.locator("//p[text()='Resume has been successfully uploaded.']");
  await expect(successMsg).toHaveText("Resume has been successfully uploaded.");

  await page.waitForTimeout(5000);
});
