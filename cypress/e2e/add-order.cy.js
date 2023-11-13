describe('Submit Form with Bob and Beans', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/orders', {
      fixture: 'orders',
    }).as('getOrders');

 
    cy.intercept('POST', 'http://localhost:3001/api/v1/orders', {
      statusCode: 200,
      body: {
        id: 4, 
        name: 'Bob',
        ingredients: ['beans'],
      },
    }).as('postOrder');
  });

  it('should submit form with Bob and Beans', () => {
    cy.visit('localhost:3000');
    cy.wait('@getOrders');
    cy.get('.order').should('have.length', 3); 
    cy.get('.Form input[name="name"]').type('Bob');
    cy.get('.Form button:contains("beans")').click();
    cy.get('.Form button[type="submit"]').click();
    cy.wait('@postOrder');
    cy.get('.order').should('have.length', 4); 
    cy.get('.order').last().find('h3').should('contain', 'Bob');
  });
});
