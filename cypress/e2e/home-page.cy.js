describe('Home Page', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/orders', {
      fixture: 'orders',
    }).as('getOrders');
  });
  it('should display the header with image, home, and about sections', () => {
    cy.visit('localhost:3000');
    cy.wait('@getOrders');
    cy.get('h1').should('contain', 'Burrito Builder')
    cy.get('.Form form').should('exist');
    cy.get('.Form input[name="name"]').should('exist');
    cy.get('.Form input[name="name"]').should('have.attr', 'placeholder', 'Name');
    cy.get('.Form button').should('have.length', 13);
    cy.get('.Form button').first().should('contain', 'beans');
    cy.get('.Form button').last().should('contain', 'Submit Order');
    cy.get('.Form p').contains('Order: Nothing selected').should('exist');
    cy.get('.Form button[type="submit"]').should('exist');
    cy.get('.order').should('have.length', 3);
    cy.get('.order').first().find('h3').should('contain', 'Pat');
    cy.get('.order').first().find('ul.ingredient-list li').first().should('contain', 'beans');
    cy.get('.order').first().find('ul.ingredient-list li').last().should('contain', 'jalapeno');
    cy.get('.order').last().find('h3').should('contain', 'Alex');
    cy.get('.order').last().find('ul.ingredient-list li').first().should('contain', 'sofritas');
    cy.get('.order').last().find('ul.ingredient-list li').last().should('contain', 'queso fresco');
  });
});