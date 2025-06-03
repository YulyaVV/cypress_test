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
}