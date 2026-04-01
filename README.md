# Pratica Cypress - ServeRest

Projeto de automacao com Cypress cobrindo:

- E2E web para cadastro e login no front ServeRest.
- API CRUD de usuarios com GET, POST, PUT e DELETE.
- Cenarios negativos para login invalido e payload incorreto.
- Organizacao com Page Objects, custom commands e fixtures.

## Autor

Leandro da Silva Stampini

## Licenca

Este projeto utiliza a licenca MIT. Consulte o arquivo `LICENSE`.

## Estrutura

```text
cypress/
  e2e/
    api/
    web/
  fixtures/
  support/
    pages/
```

## Boas praticas aplicadas

- `Page Objects` para encapsular a interacao com login e cadastro.
- `Custom commands` para reaproveitar criacao de usuario, request padrao e geracao de massa.
- `Fixtures` para dados base e cenarios negativos.
- Massa dinamica com email unico para reduzir colisao entre execucoes.

## Cenarios implementados

### Web

- Cadastro com sucesso.
- Login com sucesso.
- Login invalido.
- Validacao de cadastro sem preenchimento.

### API

- `GET /usuarios`
- `POST /usuarios`
- `PUT /usuarios/:id`
- `DELETE /usuarios/:id`
- Negativos:
  - `POST /login` com credenciais invalidas.
  - `POST /usuarios` com payload incorreto.
  - `DELETE /usuarios/:id` com id invalido.

## Como executar

1. Instale as dependencias:

```bash
npm install
```

2. Rode os testes:

```bash
npm run cy:open
```

ou

```bash
npm run cy:run
```

Para executar apenas a suite de API:

```bash
npm run test:api
```

## Observacoes

- O front configurado e `https://compassuolfront.serverest.dev`.
- A API configurada e `https://compassuol.serverest.dev`.
- Credenciais iniciais de login web utilizadas na suite: `fulano@qa.com` / `teste`.
- O pipeline do GitHub Actions executa validacao de sintaxe e a suite de API para manter a esteira estavel.
- Como o ambiente online pode sofrer alteracoes de interface, os seletores web foram escritos com fallback por `name`, `type`, `placeholder` e texto de botao.
- Caso o projeto atual tenha outra arquitetura, a estrategia recomendada e separar os testes por camada (`web` e `api`), reaproveitar commands para setup de dados e centralizar seletores em Page Objects.

## Avaliacao para aplicacao no projeto atual

Atividades recomendadas para expandir isso em um projeto real:

1. Mapear os fluxos criticos de negocio para priorizar smoke e regressao.
2. Externalizar ambientes, credenciais e massas por fixture/env.
3. Criar camada de services para APIs mais complexas.
4. Adicionar pipeline CI com execucao separada de `web` e `api`.
5. Evoluir os testes REST e/ou web conforme a estrategia definida pelo time.

As implementacoes iniciais neste repositorio ja deixam essa base pronta para continuidade.
