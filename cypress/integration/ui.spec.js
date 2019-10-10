/// <reference types="Cypress" />

context('UI', () => {
  beforeEach(() => {
    cy.visit('localhost:3000')
  });

  it('first test', () => {
    cy.get('#imageInput').click();
  });
});
