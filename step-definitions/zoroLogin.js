module.exports = function () {

var loginPage = require('../page-objects/zoroLoginPage');


    this.Given(/^I am on the Zoro login page$/, async function () {
        // open zoro login page
        await loginPage.launchZoroLoginPage();
    });

    this.When(/^I enter my email "([^"]*)" and my password "([^"]*)"$/, async function (email, password) {
        // enetr email and password
        await loginPage.enterLoginDetails(email, password);
    });

    this.Then(/^I click login button$/, async function () {

        // click login button
        await loginPage.clickLoginButton();
    });

    this.Then(/^I should be successfully logged into the website$/, async function () {
        // verify that the successful login popup shows, and nav bar option changes from 'Log in' to 'My account'
        await loginPage.verifySuccessfulLogin();
    });

    this.Then(/^I should see error for login attempt "([^"]*)" failure$/, async function (attempt) {
        // verify the error shows for unsuccessful login, and it shows the correct attempt number
        await loginPage.verifyInvalidLogin(attempt);
    });
};
