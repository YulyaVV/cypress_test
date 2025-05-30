import loginPage from '../page_object/loginPage';

const testUsers = require('../../fixtures/users.json')

describe('Авторизация', () => {

  beforeEach(() => {
    cy.visit('/'); 
  });

  testUsers.forEach((user) => {

    it(`Проверка авторизации c валидными и невалидными данными`, () => { 

      loginPage.inputCredentials(user.username, user.password);
      loginPage.clickLoginButton();

      if (user.expectedResult === 'success') {
        loginPage.shouldBeSuccessful();
      } else {
        loginPage.shouldShowError();
      }
    });
  });
})