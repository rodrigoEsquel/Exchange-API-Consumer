/// <reference types="cypress" />

describe('API consumer app', () => {
  before(() => {
    cy.visit('http://127.0.0.1:8080');
  });

  it('muestra los dos menues', () => {
    cy.get('summary').should('have.length', 2);
  });

  it('muestra configuracion', () => {
    cy.get('[name="configuracion"]').click();
    cy.get('[name="configuracion"]').parent().should('have.attr', 'open');
    cy.get('form').should('be.visible');
    cy.get('select').select('USD');
  });

  it('llama la API', () => {
    cy.get('[name="consulta"]').click();
    cy.get('[name="configuracion"]').parent().should('not.have.attr', 'open');
    cy.get('[name="consulta"]').parent().should('have.attr', 'open');
    cy.get('table').should('be.visible');
    cy.get('tr').should('have.length', 9);
    cy.get('#USD > .value').should('have.text', '1.000');
  });
});
