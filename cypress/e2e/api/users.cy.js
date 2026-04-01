describe('ServeRest API - CRUD de usuarios', () => {
  it('deve listar usuarios com GET /usuarios', () => {
    cy.apiRequest({
      method: 'GET',
      url: '/usuarios'
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('quantidade');
      expect(response.body).to.have.property('usuarios');
      expect(response.body.usuarios).to.be.an('array');
    });
  });

  it('deve cadastrar usuario com POST /usuarios', () => {
    cy.buildTestUser().then((user) => {
      cy.apiRequest({
        method: 'POST',
        url: '/usuarios',
        body: user
      }).then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body.message).to.eq('Cadastro realizado com sucesso');
        expect(response.body).to.have.property('_id');
      });
    });
  });

  it('deve editar usuario com PUT /usuarios/:id', () => {
    cy.createUserViaApi().then(({ userId }) => {
      cy.buildTestUser({
        nome: 'Usuario Atualizado'
      }).then((updatedUser) => {
        cy.apiRequest({
          method: 'PUT',
          url: `/usuarios/${userId}`,
          body: updatedUser
        }).then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body.message).to.match(/Registro alterado com sucesso|Cadastro realizado com sucesso/);
        });
      });
    });
  });

  it('deve excluir usuario com DELETE /usuarios/:id', () => {
    cy.createUserViaApi().then(({ userId }) => {
      cy.apiRequest({
        method: 'DELETE',
        url: `/usuarios/${userId}`
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.message).to.match(/Registro exclu.do com sucesso/);
      });
    });
  });
});
