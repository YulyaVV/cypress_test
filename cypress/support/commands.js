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
      
      return res.body.token;
    });
  });
});


Cypress.Commands.add('visitWithAuth', (url) => {
  // Проверяем наличие токена перед переходом
  cy.window().then((win) => {
    win.localStorage.getItem('token');
  });
  cy.visit(url);
});


Cypress.Commands.add('createModel', () => {
  return cy.window().then((win) => {
    const token = win.localStorage.getItem('token');
    expect(token).to.not.be.null;

    return cy.fixture('models').then((fixture) => {
      const body = {
        name: fixture.baseModel.name + Date.now(),
        category: fixture.baseModel.category
      };

      return cy.request({
        method: 'POST',
        url: '/web/models',
        body: body,
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }).then((response) => {
        expect(response.status).to.eq(200);
        return {
          id: response.body.id
        };
      });
    });
    });
  });
  

Cypress.Commands.add('addModelAttributes', (modelId) => {
  return cy.window().then((win) => {
    const token = win.localStorage.getItem('token');
    expect(token).to.not.be.null;

    return cy.fixture('models').then((fixture) => {
      return cy.request({
        method: 'POST',
        url: `/web/models/${modelId}`,
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: {
          name: fixture.baseModel.name + Date.now(),
          description: "",
          isActive: false,
          attributes: fixture.modelWithAttributes.attributes,
          variants: []
        }
      }).then((response) => {
        expect(response.status).to.eq(200);
        return response.body;
      });
    });
  });
});
