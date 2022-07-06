class laundryHeapElements {
  elements = {
    bookNowButton: () => cy.get(Cypress.env("bookNow")),
    passCode: () => cy.get(Cypress.env("passcode")),
    addressInput: () => cy.get(Cypress.env("addressInput")),
    nextButton: () => cy.get(Cypress.env("nextButton")),
    washOption: () => cy.get(Cypress.env("washOption")),
    washModel: () => cy.get(Cypress.env("washModel")),
    addService: () => cy.get(Cypress.env("addService")),
    firstNameInput: () => cy.get(Cypress.env("fistNameInput")),
    lastNameInput: () => cy.get(Cypress.env("lastNameInput")),
    phoneCode: () => cy.get(Cypress.env("phoneCode")),
    phoneNumber: () => cy.get(Cypress.env("phoneNumber")),
    emailAddress: () => cy.get(Cypress.env("emailAddress")),
    fistElement: () => cy.get(Cypress.env("fistElement")),
    clearData: () => cy.get(Cypress.env("clearData")),
    confirm: () => cy.get(Cypress.env("confirm")),
    placeOrder: () => cy.get(Cypress.env("placeOrder")),
  };

  click = function (elem) {
    elem.click();
  };

  shouldBeVisible = function (elem) {
    elem.should("be.visible", { timeout: 15000 });
  };

  type(elem, input) {
    elem.type(input);
  }

  consoleLog = function (elem) {
    console.log(elem);
  };
}

module.exports = new laundryHeapElements();
