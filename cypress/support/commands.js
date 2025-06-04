// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('loginViaAPI', (userType = 'adminUser') => {
  cy.fixture('users').then((users) => {
    const { username, password } = users[userType];

    cy.request('POST', '/web/auth', { username, password }).then((res) => {
      expect(res.status).to.eq(200); 
      window.localStorage.setItem('token', res.body.token); // Сохраняем токен
    });
  });
});

Cypress.Commands.add('visitWithAuth', (url) => {
  // Проверяем наличие токена перед переходом
  cy.window().then((win) => {
    win.localStorage.getItem('token');
  });
  cy.visit(url); // Переходим на страницу
});
