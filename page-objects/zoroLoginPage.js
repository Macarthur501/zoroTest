const { assert } = require("chai");


var LoginPage = function(){

const loginButton = by.css("button[class='button-primary loginButtonContainer__btn  ']");
const emailInput = by.css("input[type='email']");
const passwordInput = by.css("input[type='password']")
const successLoginPopup = by.css("div[class='Toastify__toast Toastify__toast--success']");
const navButton = by.css("li[class='HeaderB_nav_item hideArrow']");
// const loginError = by.css("span[class='log-error']")
const loginError = by.xpath("//span[@class='log-error']");

    this.launchZoroLoginPage = async function(){
        let url = 'https://www.zoro.co.uk/login';
        await helpers.loadPage(url);
        //validate the login page has loaded
        let loginDisplayed = await driver.findElement(loginButton).isDisplayed();
        assert.strictEqual(loginDisplayed, true, "Login page has not loaded");
        let navBarInitialText = await driver.findElement(navButton).getText();
        assert.equal(navBarInitialText, "Log in", "Navbar menu option is incorrect and does not display log in");
       

    },

    this.enterLoginDetails = async function(email, password){
        await driver.findElement(emailInput).sendKeys(email);
        await driver.findElement(passwordInput).sendKeys(password);

    }

    this.clickLoginButton = async function(){
        await driver.findElement(loginButton).click();
        
    }

    this.verifySuccessfulLogin = async function(){
        // we wait for the popup to be found via locator, will fail if it does not show within 5 seconds
        await driver.wait(until.elementsLocated(successLoginPopup), 5000);
        let loginPopupDisplayed = await driver.findElement(successLoginPopup).isDisplayed();
        assert.equal(loginPopupDisplayed, true, "After clicking login the success popup is not displayed");
        // we also wait here for the nav bar to change as it sometimes takes longer than the popup to show
        await driver.wait(until.elementsLocated(by.css("ul[aria-labelledby='HeaderMenu.goToMyAccountButton']")), 5000);
        let navBarText = await driver.findElement(navButton).getText();
        assert.equal(navBarText, "My Account", "Navbar menu option is incorrect and does not display My Account After Login");
        // verify after login we are taken to shop default page
        let currentUrl = await driver.getCurrentUrl();
        assert.equal(currentUrl, "https://www.zoro.co.uk/shop", "After login we have not been aviagte to the shop default page");
    }

    this.verifyInvalidLogin = async function(attempt){
        // this will wait for the error to appear on the first attempt, then wait for it to change for the second, will timout after 5 seconds if error does not show/change
        await driver.wait(until.elementTextContains(await driver.findElement(loginError), attempt), 5000);
        let failedLoginText = await driver.findElement(loginError).getText();
        assert.equal(failedLoginText, "Invalid email or password please try again. Attempt "+attempt+" of 3", "Login failure error incorrect for attempt: "+attempt);
        

    }




}
module.exports = new LoginPage();
