describe('Verify URLs', () => {
  it('Verify Swiss URL Working', () => {
    cy.visit('/swiss')
    cy.contains('Bullet Tree')
    cy.request('/swiss').its('status').should('eq', 200)
  })
  it('Verify Single Elim URL Working', () => {
    cy.visit('/single-elim')
    cy.contains('Bullet Tree')
    cy.request('/single-elim').its('status').should('eq', 200)
  })
  it('Verify Home Page Working', () => {
    cy.visit('/')
    cy.contains('Bullet Tree')
    cy.request('/').its('status').should('eq', 200)
  })
})