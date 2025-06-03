class LoginPage {

    /**
     * Локаторы полей ввода имени и пароля
     */
    elements = {
        usernameInput: () => cy.get('#login-form_username'),
        passwordInput: () => cy.get('#login-form_password'),
        loginButton: () => cy.contains('button', 'Войти'), 
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

}

export default new LoginPage();