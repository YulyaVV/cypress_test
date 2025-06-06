import models from '../../fixtures/models.json';

describe('Проверка атрибутов моделей', () => {
    
    before(() => {
    cy.loginViaAPI();
    
    
    //Создаем модель с атрибутами
    cy.createModel().then((model1) => {
      models.modelWithAttributes = model1;
      return cy.addModelAttributes(model1.id);
    });
    

    // Создаем модель без атрибутов
    cy.createModel().then((model2) => {
        models.baseModel = model2;
      });
  });


  beforeEach(() => {
    cy.visitWithAuth('/admin/models?category=disc'); 
    
  });

  it ('не знаю какое придумать название теста', () => {
    
  })
})