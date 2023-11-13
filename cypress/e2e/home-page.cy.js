describe('Home Page', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/orders', {
      fixture: 'orders',
    }).as('getOrders');
  });
  it('should display the header with image, home, and about sections', () => {
    cy.visit('localhost:3000');
    cy.wait('@getOrders');
  });
});