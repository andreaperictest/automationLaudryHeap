import laundryHeapElements from "../POM/laundryHeapElements";

describe("Open home page", () => {
  // functions to avoid hardcoding and duplicate code
  const clickNextButton = function () {
    laundryHeapElements.click(laundryHeapElements.elements.nextButton());
  };

  const getRandom = function (length) {
    return Math.floor(
      Math.pow(10, length - 1) + Math.random() * 8 * Math.pow(10, length - 1)
    );
  };

  const getRandomEmailAddress = function () {
    let date = Date.now();
    let email = "test" + date + "@dlabs.si";
    return String(email);
  };

  const elementShouldBeVisible = function (elem) {
    laundryHeapElements.shouldBeVisible(elem);
  };

  const clickElement = function (elem) {
    laundryHeapElements.click(elem);
  };

  const inputType = function (elem, input) {
    laundryHeapElements.type(elem, input);
  };

  const getIframeElement = function (iframe, element, input) {
    cy.get(iframe).then(($iframe) => {
      const $body = $iframe.contents().find("body");
      cy.wrap($body).find(element).type(input);
    });
  };

  it("should open laundryheap staging web application", () => {
    cy.fixture("data.json").then((data) => {
      cy.visit(data.url);
    });
  });

  it("should click 'Book Now'", () => {
    elementShouldBeVisible(laundryHeapElements.elements.bookNowButton());
    clickElement(laundryHeapElements.elements.bookNowButton());
  });

  it("should delete previously added data //this test will pass only if the element is visible", () => {
    //  elementShouldBeVisible(laundryHeapElements.elements.clearData());
    laundryHeapElements.click(laundryHeapElements.elements.clearData());
    // elementShouldBeVisible(laundryHeapElements.elements.confirm());
    laundryHeapElements.click(laundryHeapElements.elements.confirm());
  });

  it("should click 'Don't know your passcode?'", () => {
    elementShouldBeVisible(laundryHeapElements.elements.passCode());
    clickElement(laundryHeapElements.elements.passCode());
  });

  it("should fill out the input field", () => {
    inputType(
      laundryHeapElements.elements.addressInput(),
      "Kingston upon Thames"
    );
  });

  it("should select first element and click next", () => {
    elementShouldBeVisible(laundryHeapElements.elements.fistElement());
    clickElement(laundryHeapElements.elements.fistElement());
    clickNextButton();
    clickNextButton();
  });

  it("should click 'add' on the Wash option", () => {
    elementShouldBeVisible(laundryHeapElements.elements.washOption());
    clickElement(laundryHeapElements.elements.washOption());
  });

  it("should select 'Separate wash' model", () => {
    elementShouldBeVisible(laundryHeapElements.elements.washModel());
    clickElement(laundryHeapElements.elements.washModel());
  });

  it("should add service and click next", () => {
    elementShouldBeVisible(laundryHeapElements.elements.addService());
    clickElement(laundryHeapElements.elements.addService());
    clickNextButton();
  });

  it("should type first and last name", () => {
    elementShouldBeVisible(laundryHeapElements.elements.firstNameInput());
    inputType(laundryHeapElements.elements.firstNameInput(), "Test");
    elementShouldBeVisible(laundryHeapElements.elements.lastNameInput());
    inputType(laundryHeapElements.elements.lastNameInput(), "Test");
  });

  it("should select phone number", () => {
    laundryHeapElements.elements
      .phoneCode()
      .select(Cypress.env("countryNumber"), { force: true });
  });

  it("should type random number", () => {
    elementShouldBeVisible(laundryHeapElements.elements.phoneNumber());
    inputType(laundryHeapElements.elements.phoneNumber(), getRandom(8));
  });

  it("should type random email address", () => {
    elementShouldBeVisible(laundryHeapElements.elements.emailAddress());
    inputType(
      laundryHeapElements.elements.emailAddress(),
      getRandomEmailAddress(),
      { force: true }
    );
    clickNextButton();
  });

  it("should type card number", () => {
    cy.wait(2000);
    getIframeElement(
      Cypress.env("cardNumber"),
      '[name="cardnumber"]',
      "4242 4242 4242 4242"
    );
  });

  it("should type card expiry date", () => {
    cy.wait(2000);
    getIframeElement(Cypress.env("cardExpiry"), '[name="exp-date"]', "12/23");
  });

  it("should type card cvc number", () => {
    cy.wait(2000);
    getIframeElement(Cypress.env("cardCVC"), '[name="cvc"]', "1234");
  });

  it("should select 'Place Order' button", () => {
    cy.get(Cypress.env("placeOrder"))
      .scrollIntoView()
      .should("be.visible")
      .click();
  });

  it("should console/cy log #ORDER number", () => {
    cy.get(Cypress.env("pressX"), { timeout: 150000 }).click();
    cy.get(Cypress.env("orderId")).then(($span) => {
      const value = $span.text();
      console.log(`Your Order Number is: ${value}`);
      cy.log(`Your Order Number is: ${value}`);
    });
  });
});
