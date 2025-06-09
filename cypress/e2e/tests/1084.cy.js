import apiRequests from "../../support/apiRequests";

describe('Проверка атрибутов моделей', () => {
    
    let modelWithoutAttributesId;
    let modelWithAttributesId;

    before(() => {
        cy.loginViaAPI();

        cy.fixture('models').then((fixture) => {

            // Создаем модель без атрибутов
            apiRequests.createModel(fixture.baseModel).then((response)=> {
                modelWithoutAttributesId = response.body.id;
            });

            //тест создаем модель с аттр
            apiRequests.createModel(fixture.baseModel).then((response) => {
            cy.window().then((win) => {
                cy.request({
                        method: 'POST',
                        url: `/web/models/${response.body.id}`,
                        headers: { 
                            Authorization: `Bearer ${win.localStorage.getItem('token')}` 
                        },
                        body: {
                            name: fixture.modelWithAttributes.name + Date.now(),
                            description: fixture.modelWithAttributes.description,
                            isActive: fixture.modelWithAttributes.isActive,
                            attributes: fixture.modelWithAttributes.attributes,
                            variants: fixture.modelWithAttributes.variants
                        }
                }).then((response) => {
                    modelWithAttributesId = response.body.id;
                })
            })
        })

            /*
            // Создаем модель с атрибутами
            apiRequests.createModel(fixture.baseModel).then((response) => {
                cy.window().then((win) => {
                    cy.request({
                        method: 'POST',
                        url: `/web/models/${response.body.id}`,
                        headers: { 
                            Authorization: `Bearer ${win.localStorage.getItem('token')}` 
                        },
                        body: {
                            name: fixture.modelWithAttributes.name + Date.now(),
                            description: fixture.modelWithAttributes.description,
                            isActive: fixture.modelWithAttributes.isActive,
                            attributes: fixture.modelWithAttributes.attributes,
                            variants: fixture.modelWithAttributes.variants
                        }
                    });
                });
            });
            */
        });
    })

   
    beforeEach(() => {
        cy.visitWithAuth('/admin/models?category=disc'); 
    });
  

    it ('не знаю какое придумать название теста', () => {
        
    });
})

