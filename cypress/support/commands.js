Cypress.Commands.add('buildTestUser', (overrides = {}) => {
  const timestamp = Date.now();
  const random = Cypress._.random(1000, 9999);

  return cy.fixture('user').then((user) => ({
    nome: `${user.nome} ${random}`,
    email: `${user.emailPrefix}+${timestamp}${random}@qa.com`,
    password: user.password,
    administrador: user.administrador,
    ...overrides
  }));
});

Cypress.Commands.add('apiRequest', (options) => {
  return cy.request({
    failOnStatusCode: false,
    ...options,
    url: `${Cypress.env('apiUrl')}${options.url}`
  });
});

Cypress.Commands.add('createUserViaApi', (userOverrides = {}) => {
  return cy.buildTestUser(userOverrides).then((user) => {
    return cy.apiRequest({
      method: 'POST',
      url: '/usuarios',
      body: user
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body.message).to.eq('Cadastro realizado com sucesso');

      return {
        user,
        userId: response.body._id
      };
    });
  });
});

Cypress.Commands.add('loginViaApi', (credentials) => {
  return cy.apiRequest({
    method: 'POST',
    url: '/login',
    body: credentials
  });
});
