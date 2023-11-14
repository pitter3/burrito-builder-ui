describe('Form Validation', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/orders', {
      fixture: 'orders',
    }).as('getOrders');
    
    cy.intercept('POST', 'http://localhost:3001/api/v1/orders', {
      statusCode: 200,
      body: {
        id: 4, 
        name: 'Jimmy',
        ingredients: ['beans', 'hot sauce'],
      },
    }).as('postOrder');
  });

  it('should not submit form with empty name or ingredients', () => {
    // Ingredient selected, but no name typed
    cy.visit('localhost:3000');
    cy.wait('@getOrders');
    cy.get('.order').should('have.length', 3);
    cy.get('.Form button:contains("beans")').click();
    cy.get('.Form p').contains('Order: beans').should('exist');
    cy.get('.Form input[name="name"]').should('have.attr', 'placeholder', 'Name');
    cy.get('.Form input[name="name"]').should('have.value', '');
    cy.get('.Form input[name="name"]').should('have.attr', 'required');
    cy.get('.Form button[type="submit"]').click();
    cy.get('.order').should('have.length', 3);
    cy.get('.order').first().find('h3').should('contain', 'Pat');
    cy.get('.order').first().find('ul.ingredient-list li').first().should('contain', 'beans');
    cy.get('.order').first().find('ul.ingredient-list li').last().should('contain', 'jalapeno');
    cy.get('.order').last().find('h3').should('contain', 'Alex');
    cy.get('.order').last().find('ul.ingredient-list li').first().should('contain', 'sofritas');
    cy.get('.order').last().find('ul.ingredient-list li').last().should('contain', 'queso fresco');
  
    // Name typed, but no ingredient(s) selected
    cy.visit('localhost:3000');
    cy.wait('@getOrders');
    cy.get('.order').should('have.length', 3);
    cy.get('.Form button[type="submit"]').type("Arnold");
    cy.get('.Form input[name="name"]').should('have.value', 'Arnold');
    cy.get('.Form button[type="submit"]').click();
    cy.get('.error').should('exist').contains('Please select at least 1 ingredient');
    cy.get('.order').should('have.length', 3);
    cy.get('.order').first().find('h3').should('contain', 'Pat');
    cy.get('.order').first().find('ul.ingredient-list li').first().should('contain', 'beans');
    cy.get('.order').first().find('ul.ingredient-list li').last().should('contain', 'jalapeno');
    cy.get('.order').last().find('h3').should('contain', 'Alex');
    cy.get('.order').last().find('ul.ingredient-list li').first().should('contain', 'sofritas');
    cy.get('.order').last().find('ul.ingredient-list li').last().should('contain', 'queso fresco');

    // Neither nor
    cy.visit('localhost:3000');
    cy.wait('@getOrders');
    cy.get('.order').should('have.length', 3);
    cy.get('.Form input[name="name"]').should('have.attr', 'placeholder', 'Name');
    cy.get('.Form input[name="name"]').should('have.value', '');
    cy.get('.Form input[name="name"]').should('have.attr', 'required');
    cy.get('.Form button[type="submit"]').click();
    cy.get('.order').should('have.length', 3);
    cy.get('.order').first().find('h3').should('contain', 'Pat');
    cy.get('.order').first().find('ul.ingredient-list li').first().should('contain', 'beans');
    cy.get('.order').first().find('ul.ingredient-list li').last().should('contain', 'jalapeno');
    cy.get('.order').last().find('h3').should('contain', 'Alex');
    cy.get('.order').last().find('ul.ingredient-list li').first().should('contain', 'sofritas');
    cy.get('.order').last().find('ul.ingredient-list li').last().should('contain', 'queso fresco');

    // No error displays otherwise
    cy.visit('localhost:3000');
    cy.wait('@getOrders');
    cy.get('.order').should('have.length', 3);
    cy.get('.Form input[name="name"]').should('have.attr', 'placeholder', 'Name');
    cy.get('.Form input[name="name"]').should('have.value', '');
    cy.get('.Form input[name="name"]').should('have.attr', 'required');
    cy.get('.Form input[name="name"]').type('Jimmy');
    cy.get('.Form input[name="name"]').should('have.value', 'Jimmy');
    cy.get('.Form button:contains("beans")').click();
    cy.get('.Form button:contains("hot sauce")').click();
    cy.get('.Form p').contains('Order: beans, hot sauce').should('exist');
    cy.get('.Form button[type="submit"]').click();
    cy.wait('@postOrder');
    cy.get('.order').should('have.length', 4);
    cy.get('.order').first().find('h3').should('contain', 'Pat');
    cy.get('.order').first().find('ul.ingredient-list li').first().should('contain', 'beans');
    cy.get('.order').first().find('ul.ingredient-list li').last().should('contain', 'jalapeno');
    cy.get('.order').last().find('h3').should('contain', 'Jimmy');
    cy.get('.order').last().find('ul.ingredient-list li').first().should('contain', 'beans');
    cy.get('.order').last().find('ul.ingredient-list li').last().should('contain', 'hot sauce');
  });
});