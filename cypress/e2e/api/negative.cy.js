describe('ServeRest API - Cenarios negativos', () => {
  it('deve rejeitar login invalido com POST /login', () => {
    cy.fixture('invalid-user').then((user) => {
      cy.apiRequest({
        method: 'POST',
        url: '/login',
        body: user
      }).then((response) => {
        expect(response.status).to.eq(401);
        expect(response.body.message).to.match(/Email e\/ou senha inv.lidos|email e\/ou senha inv.lidos/i);
      });
    });
  });

  it('deve rejeitar cadastro com payload incorreto em POST /usuarios', () => {
    cy.apiRequest({
      method: 'POST',
      url: '/usuarios',
      body: {
        nome: '',
        email: 'email-invalido',
        password: '',
        administrador: 'talvez'
      }
    }).then((response) => {
      expect(response.status).to.be.oneOf([400, 401]);
      expect(response.body).to.be.an('object');
    });
  });

  it('deve retornar usuario inexistente ao excluir id invalido', () => {
    cy.apiRequest({
      method: 'DELETE',
      url: '/usuarios/id-invalido'
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.message).to.match(/Nenhum registro exclu.do|nenhum registro exclu.do/i);
    });
  });
});
