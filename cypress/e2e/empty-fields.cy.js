describe('Form Validation', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/orders', {
      fixture: 'orders',
    }).as('getOrders');
  });

  it('should not submit form with empty name or ingredients', () => {
    // Ingredient selected, but no name typed
    cy.visit('localhost:3000');
    cy.wait('@getOrders');
    cy.get('form > :nth-child(2)').click();
    cy.get('.Form button[type="submit"]').click();
    cy.get('.order').should('have.length', 3);
  
    // Name typed, but no ingredient(s) selected
    cy.visit('localhost:3000');
    cy.wait('@getOrders');
    cy.get('.order').should('have.length', 3);
    cy.get('.Form button[type="submit"]').type("Arnold");
    cy.get('.Form input[name="name"]').should('have.value', 'Arnold');
    cy.get('.Form button[type="submit"]').click();
    cy.get('.error').should('exist').contains('Please select at least 1 ingredient');
    cy.get('.order').should('have.length', 3);

    // Neither nor
    cy.visit('localhost:3000');
    cy.wait('@getOrders');
    cy.get('.Form button[type="submit"]').click();
    cy.get('.order').should('have.length', 3);
  });
});