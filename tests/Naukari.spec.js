// tests/Naukari.spec.js
const { test, expect } = require('@playwright/test');
const path = require('path');
const fs = require('fs');


test('Upload Resume', async ({ page }) => {
  await page.goto('https://www.naukri.com/');
  await page.locator("//a[@title='Jobseeker Login']").click();
  await page.locator("//input[@placeholder='Enter your active Email ID / Username']").fill("anitrai741@gmail.com");
  await page.locator("//input[@placeholder='Enter your password']").fill("!Scorpion@123");

  await page.locator("//button[@type='submit']").click();

  

  await page.locator("//div[@class='nI-gNb-drawer__icon']").click();
  
  await page.getByText('View & Update Profile').click();
  await page.locator("//input[@value='Update resume']").click();
  const filePath = path.resolve(__dirname, '../uploads/Anit_Rai_SDET_Resume.docx');

 
  

  // Make the input[type="file"] visible if it's hidden
  await page.evaluate(() => {
    const input = document.querySelector('input[type="file"]');
    if (input) input.style.display = 'block';
  });

  
  await page.setInputFiles('input[type="file"]', filePath);
  await expect(page.locator("//p[text()='Resume has been successfully uploaded.']")).toHaveText("Resume has been successfully uploaded.");
  await page.waitForTimeout(5000);
   
});


 