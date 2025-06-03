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


import loginPage from "./page_object/loginPage"


Cypress.Commands.add('login', (userType) => {
    
    cy.fixture('users.json').then((users) => {
        const user = users[userType]; 

        
        cy.session( user.username, () => {
                cy.visit('/admin/login');
                loginPage.inputCredentials(user.username, user.password);
                loginPage.clickLoginButton();  
            },
            {
                validate: () => {                 
                   // Проверяем, что пользователь действительно залогинен
                   cy.window().its('localStorage').invoke('getItem', 'token').should('exist');
                }
            }       
        );     
    });
});

