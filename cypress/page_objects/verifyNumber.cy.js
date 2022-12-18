export class verification {
  numberVerify() {
    cy.get(".sectionSixForm--inputLeft > :nth-child(2) > .allInput")

      .invoke("val")
      .should((value) => {
        expect(Number.isNaN(+value), "input should be a number with no space").to.eq(false);
      });
    cy.get(".sectionSixForm--inputLeft > :nth-child(2) > .allInput")
      .invoke("val")
      .should("have.length", 9);
  }
}
