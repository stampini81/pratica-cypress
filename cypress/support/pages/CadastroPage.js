class CadastroPage {
  visit() {
    cy.visit('/cadastrarusuarios');
  }

  preencherFormulario(usuario) {
    cy.get('input[name="nome"], input[placeholder="Digite seu nome"]')
      .first()
      .clear()
      .type(usuario.nome);

    cy.get('input[name="email"], input[type="email"], input[placeholder="Digite seu email"]')
      .first()
      .clear()
      .type(usuario.email);

    cy.get('input[name="password"], input[type="password"], input[placeholder="Digite sua senha"]')
      .first()
      .clear()
      .type(usuario.password);

    if (usuario.administrador === 'true') {
      cy.get('input[type="checkbox"]').first().check({ force: true });
    }
  }

  submeter() {
    cy.contains('button', 'Cadastrar').click();
  }

  validarCadastroComSucesso() {
    cy.contains('Cadastro realizado com sucesso').should('be.visible');
  }

  validarMensagemObrigatoriedade() {
    cy.contains(/(nome|email|password|senha).*(obrigat|requerido)|e obrigatorio/i).should('exist');
  }
}

export default new CadastroPage();
