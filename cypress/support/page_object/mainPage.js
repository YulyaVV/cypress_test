export class MainPage {

    //Локатор заголовка страницы
    static get pageTitle() {
        return cy.get('h1.title');
    }

    
    /**
     * Метод получения названия заголовка страницы
     */
    static getPageTitleText() {
        return this.pageTitle.invoke('text');
    }

    // Метд получения ссылки модели
    static getModelLinkSelector(modelId) {
        return `a[href="/admin/models/${modelId}"]`;
    }

    // Метод открытия модели
    static openModel(modelId) {
        cy.get(this.getModelLinkSelector(modelId))
            .should('be.visible')
            .click();
        cy.url().should('include', `/admin/models/${modelId}`);
    }
}