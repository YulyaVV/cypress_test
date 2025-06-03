import { MainPage } from '../../support/page_object/mainPage';

describe('Проверка заголовка главной страницы', () => {


  beforeEach(() => {
    cy.login('validUser');  
    cy.visit('/admin/models');
  });
  
  it('Название страницы - "Список моделей"', () => {
    MainPage.getPageTitleText().should('eq', 'Список моделей');
  });

})