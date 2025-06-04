import { MainPage } from '../../support/page_object/mainPage';

describe('Проверка заголовка главной страницы', () => {

  before(() => {
    cy.loginViaAPI();
  });

  beforeEach(() => {
    cy.visitWithAuth('/admin/models'); // Переход с проверкой токена
  });
  
  
  it('Название страницы - "Список моделей"', () => {
    MainPage.getPageTitleText().should('eq', 'Список моделей');
  });
});