export class formData {
  //user info
  input_userName = ".sectionSixForm--inputLeft > :nth-child(1) > .allInput";
  input_userNumber = ".sectionSixForm--inputLeft > :nth-child(2) > .allInput";
  input_userEmail = ".sectionSixForm--inputRight > :nth-child(1) > .allInput";

  // date info
  date_arrive = ".datee > .dateInput";
  date_departure = ".sectionSixForm--inputRight > :nth-child(3) > .dateInput";

  //Amount, variant option
  input_amount = ".sectionSixForm--inputRightDouble--value > .allInput";
  input_select_variant = ".sectionSixForm--inputRightDouble--variant > select";

  dataName(name, number, email) {
    cy.get(this.input_userName).click().type(name);
    cy.get(this.input_userNumber).click().type(number);
    cy.get(this.input_userEmail).click().type(email);
  }
  dataDate(arrive, departure) {
    cy.get(this.date_arrive).click({ force: true }).type(arrive);
    cy.get(this.date_departure).click({ force: true }).type(departure);
  }

  dataChoice(amount, variant) {
    cy.get(this.input_amount).click({ force: true }).type(amount);
    cy.get(this.input_select_variant).select(variant);
  }
}
