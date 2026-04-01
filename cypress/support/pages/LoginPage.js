class LoginPage {
  visit() {
    cy.visit('/login');
  }

  preencherCredenciais(email, password) {
    cy.get('input[name="email"], input[type="email"], input[placeholder="Digite seu email"]')
      .first()
      .clear()
      .type(email);

    cy.get('input[name="password"], input[type="password"], input[placeholder="Digite sua senha"]')
      .first()
      .clear()
      .type(password);
  }

  submeter() {
    cy.contains('button', /entrar|login/i).click();
  }

  validarLoginComSucesso() {
    cy.url().should('match', /(home|admin)/);
  }

  validarLoginInvalido() {
    cy.contains(/email e\/ou senha invalidos|problemas com o login do usuario/i).should('be.visible');
  }
}

export default new LoginPage();
