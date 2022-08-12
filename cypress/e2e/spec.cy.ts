describe('My First Test', () => {
  // it('Visits the initial project page', () => {
  //   cy.visit('/')
  //   cy.contains('Welcome')
  //   cy.contains('sandbox app is running!')
  // })

  it('allows the user to signing  for a new account', () => {
    cy.visit('http://localhost:4200/auth/login');
    cy.url().should('eq', 'http://localhost:4200/auth/login');
    cy.get('#email').type('1997meghal@gmail.com');
    cy.get('#password').type('Test@123');
    cy.get('button').contains('Login').click();

    cy.url().should('include', '/user');

  //add user
  cy.get('button').contains('Add').click();
  cy.get('#firstName').type('Meena');
  cy.get('#lastName').type('Thakor');
  cy.get('#email').type('meena@gmail.com');
  // cy.get('#dob').type('22/03/1997');
  cy.get('#phoneNumber').type('12536985236');

  cy.get('#username').type('Meenu');
  cy.get('select[name="role"]').select('User')
  cy.get('mat-datepicker-toggle').click();
  cy.get('.mat-calendar-body-cell-content.mat-focus-indicator').contains('1').click();
  cy.get('button').contains('Save').click();

  //to logout user
  cy.get('#logout').click();
  

  // cy.get('#dob').type( new Date().toISOString() );

  // cy.get('mat-datepicker-toggle').select('22/03/1997');

// console.log(cy.get('firstName').type('Test@123'))


  });

})
