export class taskCreate {
  create(task) {
    cy.get(".app-sidebar-header > button").click();
    cy.get("#title").click().clear().type(task);
  }
}
