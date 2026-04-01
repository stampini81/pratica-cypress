import CadastroPage from '../../support/pages/CadastroPage';
import LoginPage from '../../support/pages/LoginPage';

describe('ServeRest Web - Cadastro e Login', () => {
  it('deve cadastrar um novo usuario com sucesso', () => {
    cy.buildTestUser().then((user) => {
      CadastroPage.visit();
      CadastroPage.preencherFormulario(user);
      CadastroPage.submeter();

      CadastroPage.validarCadastroComSucesso();
      cy.url().should('match', /(home|admin)/);
    });
  });

  it('deve realizar login com sucesso com o usuario inicial informado', () => {
    cy.fixture('default-login').then((user) => {
      LoginPage.visit();
      LoginPage.preencherCredenciais(user.email, user.password);
      LoginPage.submeter();

      LoginPage.validarLoginComSucesso();
    });
  });

  it('deve exibir erro ao tentar login com credenciais invalidas', () => {
    cy.fixture('invalid-user').then((user) => {
      LoginPage.visit();
      LoginPage.preencherCredenciais(user.email, user.password);
      LoginPage.submeter();

      LoginPage.validarLoginInvalido();
    });
  });

  it('deve validar tentativa de cadastro com payload incompleto', () => {
    CadastroPage.visit();
    CadastroPage.submeter();
    CadastroPage.validarMensagemObrigatoriedade();
  });
});
