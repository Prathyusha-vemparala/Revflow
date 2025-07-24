const { test, expect } = require("@playwright/test");
const sections = require("../pageObjects/UI_Pages/pageIndex");
const testData = require("../test_Data/testData.json");

require("dotenv").config();

test.only("Create Task without attachment default user ", async ({ page }) => {
  const loginPage = new sections.LoginPage(test, page);
  await loginPage.launchingApplication([process.env.baseURL]);
  await loginPage.loginWithValidCredentials(
    [process.env.userEmail],
    [process.env.password]
  );
  await page.waitForTimeout(parseInt(process.env.mediumWait));
  const createTaskPage = new sections.CreateTaskPage(test, page);
  await createTaskPage.CreateTaskWithoutAttachmentDefaultUser();
})

test("Create Task without attachment selected user ", async ({ page }) => {
  const loginPage = new sections.LoginPage(test, page);
  await loginPage.launchingApplication([process.env.baseURL]);
  await loginPage.loginWithValidCredentials(
    [process.env.userEmail],
    [process.env.password]
  );
  await page.waitForTimeout(parseInt(process.env.mediumWait));
  const createTaskPage = new sections.CreateTaskPage(test, page);
  await createTaskPage.CreateTaskWithoutAttachmentSelectedUser();
})

test("Upload file using browser",async({page})=>{
  const loginPage = new sections.LoginPage(test,page);
  await loginPage.launchingApplication([process.env.baseURL]);
  await loginPage.loginWithValidCredentials([process.env.userEmail],[process.env.password]);
  await page.waitForTimeout(parseInt(process.env.mediumWait));
  const createTaskPage = new sections.CreateTaskPage(test,page);
  await createTaskPage.uploadFileUsingBrowser();
});

test("Renaming file attachment and changing document type", async({page})=>{
  const loginPage=new sections.LoginPage(test,page);
  await loginPage.launchingApplication([process.env.baseURL]);
  await loginPage.loginWithValidCredentials([process.env.userEmail],[process.env.password]);
  await page.waitForTimeout(parseInt(process.env.mediumWait));
  const createTaskPage=new sections.CreateTaskPage(test,page);
  await createTaskPage.renameAttachedFile();
});

test("Validating attaching file as a link from case",async({page})=>{
  const loginPage=new sections.LoginPage(test,page);
  await loginPage.launchingApplication([process.env.baseURL]);
  await loginPage.loginWithValidCredentials([process.env.userEmail],[process.env.password]);
  await page.waitForTimeout(parseInt(process.env.mediumWait));
  const createTaskPage=new sections.CreateTaskPage(test,page);
  await createTaskPage.linkFiles();
});

test("Verify that the file can be unlinked from the task",async({page})=>{
  const loginPage=new sections.LoginPage(test,page);
  await loginPage.launchingApplication([process.env.baseURL]);
  await loginPage.loginWithValidCredentials([process.env.userEmail],[process.env.password]);
  await page.waitForTimeout(parseInt(process.env.mediumWait));
  const createTaskPage=new sections.CreateTaskPage(test,page);
  await createTaskPage.unlinkFile();
});

test("Validating fields in create task",async({page})=>{
  const loginPage=new sections.LoginPage(test,page);
  await loginPage.launchingApplication([process.env.baseURL]);
  await loginPage.loginWithValidCredentials([process.env.userEmail],[process.env.password]);
  await page.waitForTimeout(parseInt(process.env.mediumWait));
  const createTaskPage=new sections.CreateTaskPage(test,page);
  await createTaskPage.emptyTaskFieldValidation();
  await createTaskPage.searchFieldsValidation();
  await createTaskPage.dueDateFieldValidation();
});

test("Validating cancel task feature",async({page})=>{
  const loginPage=new sections.LoginPage(test,page);
  await loginPage.launchingApplication([process.env.baseURL]);
  await loginPage.loginWithValidCredentials([process.env.userEmail],[process.env.password]);
  await page.waitForTimeout(parseInt(process.env.mediumWait));
  const createTaskPage=new sections.CreateTaskPage(test,page);
  await createTaskPage.fillFieldsCancelValidation();
});


test("Comment field validation",async({page})=>{
  const loginPage=new sections.LoginPage(test,page);
  await loginPage.launchingApplication([process.env.baseURL]);
  await loginPage.loginWithValidCredentials([process.env.userEmail],[process.env.password]);
  await page.waitForTimeout(parseInt(process.env.mediumWait));
  const createTaskpage=new sections.CreateTaskPage(test,page);
  await createTaskpage.commentsFieldValidation();
});
test("Description field validation",async({page})=>{
  const loginPage=new sections.LoginPage(test,page);
  await loginPage.launchingApplication([process.env.baseURL]);
  await loginPage.loginWithValidCredentials([process.env.userEmail],[process.env.password]);
  await page.waitForTimeout(parseInt(process.env.mediumWait));
  const createTaskpage=new sections.CreateTaskPage(test,page);
  await createTaskpage.descriptionFieldValidation();
});

test("Verifying File input box with invalid name",async({page})=>{
  const loginPage=new sections.LoginPage(test,page);
  await loginPage.launchingApplication([process.env.baseURL]);
  await loginPage.loginWithValidCredentials([process.env.userEmail],[process.env.password]);
  await page.waitForTimeout(parseInt(process.env.mediumWait));
  const createTaskpage=new sections.CreateTaskPage(test,page);
  await createTaskpage.editFileInputBox();
});

test("Verifying File input box with Uppercase extension",async({page})=>{
  const loginPage=new sections.LoginPage(test,page);
  await loginPage.launchingApplication([process.env.baseURL]);
  await loginPage.loginWithValidCredentials([process.env.userEmail],[process.env.password]);
  await page.waitForTimeout(parseInt(process.env.mediumWait));
  const createTaskpage=new sections.CreateTaskPage(test,page);
  await createTaskpage.enterInvalidFileExtension();
});

test("Failed test case",async({page})=>{
  const loginPage=new sections.LoginPage(test,page);
  await loginPage.launchingApplication([process.env.baseURL]);
  await loginPage.loginWithValidCredentials([process.env.userEmail],[process.env.password]);
  await page.waitForTimeout(parseInt(process.env.mediumWait));
  const createTaskpage=new sections.CreateTaskPage(test,page);
  await createTaskpage.enterInvalidFileExtension1();
});