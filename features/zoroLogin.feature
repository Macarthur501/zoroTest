@zoro
Feature: Zoro login
  
  Scenario: Successful login
    Given I am on the Zoro login page
    When I enter my email "test150420@gmail.com" and my password "9999999"
    And I click login button
    Then I should be successfully logged into the website

  Scenario: Invalid login
    Given I am on the Zoro login page
    When I enter my email "test150420@gmail.com" and my password "999999"
    And I click login button
    Then I should see error for login attempt "1" failure
    And I click login button
    Then I should see error for login attempt "2" failure
