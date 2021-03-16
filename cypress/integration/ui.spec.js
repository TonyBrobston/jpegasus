context('ui', () => {
  beforeEach(() => {
    cy.visit(`localhost:${Cypress.env('PORT')}`)
  });

  it('should compress an image and check size and type results', () => {
    const fileName = 'merlin-superJumo.jpg';
    const compressedSize = {
      'chrome': '50.29',
      'firefox': '59.57',
      'edge': '50.29',
      'electron': '50.49',
    };
    cy.fixture(fileName).then((fileContent) => {
      cy.get('#imageInput').attachFile(fileName, {
        fileContent,
        mimeType: 'image/jpeg'
      });
      cy.get('#qualitySelector').select('0.5');

      cy.get('input[value="Submit"]').click();

      cy.get('#originalSize').should('have.text', '533.32');
      cy.get('#originalType').should('have.text', 'image/jpeg');
      cy.get('#compressedSize').should('have.text', compressedSize[Cypress.browser.name])
      cy.get('#compressedType').should('have.text', 'image/jpeg');
    });
  });
});
