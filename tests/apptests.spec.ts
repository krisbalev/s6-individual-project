import { test, expect } from "@playwright/test";

test.describe("Home Page", () => {
  //logs into the application to get a user before each test
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000/");
    await page.getByRole("button", { name: "Login" }).click();
    await page.getByLabel("Email address").click();
    await page.getByLabel("Email address").fill("playwrighttest@gmail.com");
    await page.getByLabel("Email address").press("Tab");
    await page.getByLabel("Password").fill("bdZg2k9eM7QPLts");
    await page.getByRole("button", { name: "Continue", exact: true }).click();
    await expect(page).toHaveURL(/.*home/);
  });

  test("create post", async ({ page }) => {
    await page.goto("http://localhost:3000/home");
    await page.getByRole("button", { name: "Add Post" }).click();
    await page.getByLabel("Title").click();
    await page.getByLabel("Title").fill("Test post");
    await page.getByLabel("Title").press("Tab");
    await page.getByLabel("Content").fill("test post");
    page.once("dialog", (dialog) => {
      console.log(`Dialog message: ${dialog.message()}`);
      dialog.dismiss().catch(() => {});
    });
    await page.getByRole("button", { name: "Submit" }).click();
    page.on("dialog", async (dialog) => {
      await dialog.accept();
    });
  });

  test("like post", async ({ page }) => {
    await page.goto('http://localhost:3000/home');
    await page.getByText('post').first().click();
    const likes = await page.locator('div:nth-child(5) > div > .flex').innerText();
    await page.locator('div:nth-child(5) > div > .flex').click();
    await page.waitForTimeout(1000);
    const newLikes = await page.locator('div:nth-child(5) > div > .flex').innerText();
    expect(newLikes).not.toBe(likes);
  });

  test("change username", async ({ page }) => {
    await page.goto("http://localhost:3000/account");
    await page.getByRole("link", { name: "Account" }).click();
    await expect(page).toHaveURL(/.*account/);
    await page.getByRole("button", { name: "Edit Profile" }).click();
    await page.getByLabel("New Username:").click();
    await page.getByLabel("New Username:").fill("playwrighttestnew1");
    page.once("dialog", (dialog) => {
      console.log(`Dialog message: ${dialog.message()}`);
      dialog.dismiss().catch(() => {});
    });
    await page.getByRole("button", { name: "Submit" }).click();
    page.on("dialog", async (dialog) => {
      await dialog.accept();
    });
  });
});
