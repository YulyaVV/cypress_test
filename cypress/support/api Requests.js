export default class apiRequests {

    static createModel (modelData) {
        return cy.request({
            method: 'POST',
            url: '/web/models',
            headers: { 
                Authorization: `Bearer ${window.localStorage.getItem('token')}` 
            },
            body: {
                name: modelData.name + Date.now(), // Добавляем timestamp для уникальности
                category: modelData.category
            }
        });
    };
}