class LoginPage {

    /**
     * Локаторы полей ввода имени и пароля
     */
    elements = {
        usernameInput: () => cy.get('#login-form_username'),
        passwordInput: () => cy.get('#login-form_password'),
        loginButton: () => cy.contains('button', 'Войти'),
        errorMessage: () => cy.get('.ant-form-item-explain-error') 
      }

      /**
       * Метод ввода данных
       */
      inputCredentials(username, password) {
        this.elements.usernameInput()
          .type(username);
        
        this.elements.passwordInput()
          .type(password);
      }

      /**
       * Метод клика на кнопку Войти
       */
      clickLoginButton() {
        this.elements.loginButton()
            .click();
      }

      /**
       * Метод проверки успешного входа
       */
      shouldBeSuccessful() {
        cy.url().should('include', '/admin/models');
      }
    
      /**
       * Метод проверки ошибки авторизации
       */
      shouldShowError() {
        this.elements.errorMessage()
          .should('be.visible')
          .and('contain', 'Неверное имя пользователя или пароль')

      }
}

export default new LoginPage();