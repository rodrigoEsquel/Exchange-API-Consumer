/// <reference types="cypress" />

describe('example to-do app', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:8080');
  });

  it('displays two menues', () => {
    cy.get('summary').should('have.length', 2);
  });
});
