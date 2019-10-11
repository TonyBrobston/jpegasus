/// <reference types="Cypress" />

context('ui', () => {
  beforeEach(() => {
    cy.visit('localhost:5000')
  });

  it('should compress an image and check size and type results', () => {
    const fileName = 'merlin-superJumo.jpg';
    cy.fixture(fileName).then((fileContent) => {
      cy.get('#imageInput').upload({
        fileContent,
        fileName,
        mimeType: 'image/jpeg'
      });
      cy.get('#qualitySelector').select('0.5');

      cy.get('input[value="Submit"]').click();

      cy.get('#originalSize').should('have.text', '533.32');
      cy.get('#originType').should('have.text', 'image/jpeg');
      cy.get('#compressedSize').should('have.text', '50.29');
      cy.get('#compressedType').should('have.text', 'image/jpeg');
    });
  });
});
