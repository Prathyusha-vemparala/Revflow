const { excuteSteps } = require("../../utilities/actions");
const { expect } = require("@playwright/test");
const {
  highlightElement,
  highlighterRemove,
} = require("../../utilities/highlight_element");
exports.LoginPage = class LoginPage {
  constructor(test, page) {
    this.test = test;
    this.page = page;
    this.microsoftSignInButton = page.locator(
      "//*[name()='svg']"
    );
    this.emailInputField = page.locator("//input[@type='email']");
    this.submitButton = page.locator("//input[@type='submit']");
    this.passwordInputFiled = page.locator("//input[@type='password']");
    this.welecomeMessage = page.locator("//h2[contains(text(),'Hi')]");
  }
  launchingApplication = async (baseUrl) => {
    await excuteSteps(
      this.test,
      await this.page,
      "navigate",
      `Navigate to the Revflow url ${baseUrl}`,
      baseUrl
    );
  };
  clickOnMiscrosoftSignInButton = async () => {
    await excuteSteps(
      this.test,
      this.microsoftSignInButton,
      "click",
      `Click on the microsoft sign In button`
    );
  };
  fillingUseremail = async (email) => {
    await excuteSteps(
      this.test,
      this.emailInputField,
      "fill",
      `Enter username in username field`,
      email
    );
  };
  fillingUserPassword = async (pwd) => {
    await excuteSteps(
      this.test,
      this.passwordInputFiled,
      "fill",
      `Entering password in password field`,
      pwd
    );
  };
  clickOnSubmitButton = async () => {
    await excuteSteps(
      this.test,
      this.submitButton,
      "click",
      `click on the submit button`
    );
  };
  loginWithValidCredentials = async (email, pwd) => {
    await this.page.waitForTimeout(parseInt(process.env.smallWait));
    await highlightElement(this.page,this.microsoftSignInButton)
    await this.clickOnMiscrosoftSignInButton();
    await this.page.waitForTimeout(parseInt(process.env.smallWait));
    await highlightElement(this.page,this.emailInputField)
    await this.fillingUseremail(email);
    await this.page.waitForTimeout(parseInt(process.env.smallWait));
    await highlightElement(this.page,this.submitButton);
    await this.clickOnSubmitButton();
    await this.page.waitForTimeout(parseInt(process.env.smallWait));
    await highlightElement(this.page,this.passwordInputFiled)
    await this.fillingUserPassword(pwd);
    await this.page.waitForTimeout(parseInt(process.env.smallWait));
    await highlightElement(this.page,this.submitButton);
    await this.clickOnSubmitButton();
    await this.page.waitForTimeout(parseInt(process.env.smallWait));
    await highlightElement(this.page,this.submitButton);
    await this.clickOnSubmitButton();
  };
};
