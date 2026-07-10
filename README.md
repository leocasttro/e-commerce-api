# Ecommerce API

API REST para gerenciamento de produtos e categorias de um pequeno e-commerce.

O projeto foi desenvolvido com Node.js, Express, TypeScript, Prisma ORM e PostgreSQL, com organização inspirada em Clean Architecture e DDD de forma enxuta.

## Tecnologias

- Node.js 18+
- TypeScript
- Express
- Prisma ORM
- PostgreSQL
- ESLint
- Prettier

## Funcionalidades

### Categorias

- Criar categoria
- Listar categorias com paginacao
- Buscar categoria por ID
- Atualizar categoria
- Excluir categoria
- Bloquear exclusao de categoria com produtos vinculados

### Produtos

- Criar produto validando se a categoria existe
- Listar produtos com:
  - paginacao
  - filtro por categoria
  - filtro por faixa de preco
  - busca parcial por nome, case-insensitive
- Buscar produto por ID retornando os dados da categoria
- Atualizar produto
- Excluir produto

## Arquitetura

O projeto evita concentrar regra de negocio em controllers ou services genericos. A estrutura foi organizada para separar regras de dominio, casos de uso, infraestrutura e camada HTTP.

```txt
src/
  app.ts
  server.ts

  shared/
    application/
    domain/
    presentation/

  modules/
    catalog/
      domain/
      application/
      presentation/

  infra/
    database/
      prisma/
```

### Domain

Contem o nucleo de negocio do modulo `catalog`:

```txt
modules/catalog/domain/
  entities/
  errors/
  repositories/
  value-objects/
```

As entidades `Category` e `Product` protegem invariantes do dominio, como:

- nome obrigatorio
- preco maior que zero
- estoque inteiro
- estoque nao negativo

Os value objects `ProductPrice` e `ProductStock` concentram regras especificas de preco e estoque. Isso deixa a entidade mais expressiva e evita espalhar validacoes repetidas.

Os contratos `CategoryRepository` e `ProductRepository` ficam no dominio para que os casos de uso dependam de abstracoes, nao do Prisma.

### Application

Contem os casos de uso da aplicacao:

```txt
modules/catalog/application/use-cases/
```

Cada caso de uso representa uma acao do sistema, por exemplo:

- `CreateCategoryUseCase`
- `DeleteCategoryUseCase`
- `CreateProductUseCase`
- `ListProductsUseCase`
- `GetProductDetailsUseCase`

Essa camada orquestra regras que dependem de consulta, como:

- validar nome unico de categoria
- impedir exclusao de categoria com produtos
- validar se a categoria existe ao criar ou atualizar produto
- buscar produto com dados da categoria

### Infra

Contem detalhes externos, neste caso Prisma e PostgreSQL:

```txt
infra/database/prisma/
  client.ts
  mappers/
  repositories/
```

Os repositories Prisma implementam os contratos do dominio. Os mappers convertem registros do Prisma para entidades de dominio e entidades de dominio para objetos aceitos pelo Prisma.

Essa separacao permite trocar a persistencia ou testar os casos de uso com repositories em memoria sem alterar regras de negocio.

### Presentation

Contem a camada HTTP:

```txt
modules/catalog/presentation/
  controllers/
  factories/
  routes/
  serializers/
```

Controllers recebem `Request` e `Response`, chamam casos de uso e retornam JSON. Eles nao acessam Prisma diretamente.

Serializers convertem entidades para objetos HTTP, evitando expor objetos de dominio diretamente.

Factories montam as dependencias concretas:

```txt
PrismaRepository -> UseCase -> Controller
```

### Shared

Contem recursos reutilizaveis e sem acoplamento indevido:

- erros de dominio
- paginacao
- ID de entidade
- error handler HTTP
- async handler para rotas Express

## Por que nao seguir apenas routes/controllers/services/repositories?

O padrao convencional `routes/controllers/services/repositories` funciona bem para CRUDs simples, mas frequentemente leva os services a acumularem regras de negocio, detalhes HTTP e detalhes de persistencia.

Neste projeto, a separacao foi feita de forma mais explicita:

- `domain` define as regras centrais e contratos
- `application` define os fluxos de uso do sistema
- `infra` implementa detalhes tecnicos, como Prisma
- `presentation` adapta HTTP para os casos de uso

Essa abordagem mantem o projeto organizado sem adicionar complexidade desnecessaria como eventos de dominio, aggregates complexos ou injecao de dependencia sofisticada.

## Requisitos

- Node.js 18 ou superior
- PostgreSQL
- npm

## Configuracao

Instale as dependencias:

```bash
npm install
```

Crie o arquivo `.env` com base no `.env.example`:

```bash
cp .env.example .env
```

Exemplo:

```env
PORT=3000
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/ecommerce_api?schema=public"
```

Crie o banco no PostgreSQL antes de rodar as migrations:

```bash
createdb ecommerce_api
```

## Migrations

Rode as migrations do Prisma:

```bash
npx prisma migrate dev
```

Gerar Prisma Client, se necessario:

```bash
npx prisma generate
```

Abrir Prisma Studio:

```bash
npx prisma studio
```

## Rodando a API

Ambiente de desenvolvimento:

```bash
npm run dev
```

Build:

```bash
npm run build
```

Producao:

```bash
npm start
```

## Rodando com Docker

Tambem e possivel subir a API e o PostgreSQL com Docker Compose:

```bash
docker compose up --build
```

Esse comando cria dois servicos:

- `postgres`: banco PostgreSQL com database `ecommerce_api`
- `api`: aplicacao Node.js na porta `3000`

Ao iniciar, o container da API executa:

```bash
npx prisma migrate deploy
npm start
```

Assim as migrations versionadas em `prisma/migrations` sao aplicadas automaticamente antes da API subir.

Nao e necessario acessar o container para executar comandos do Prisma manualmente. O proprio Docker executa o comando por meio do `CMD` definido no `Dockerfile`:

```dockerfile
CMD ["sh", "-c", "npx prisma migrate deploy && npm start"]
```

Isso significa que, ao rodar:

```bash
docker compose up --build
```

o fluxo executado pelo container da API e:

```txt
1. aguarda o PostgreSQL ficar saudavel
2. aplica as migrations com npx prisma migrate deploy
3. inicia a API com npm start
```

O comando `migrate deploy` foi usado porque e o comando recomendado para ambientes containerizados ou de producao. Ele apenas aplica migrations ja existentes em `prisma/migrations`, sem criar uma nova migration. Para desenvolvimento local, quando for criar novas migrations, use `npx prisma migrate dev`.

URLs locais:

```txt
API: http://localhost:3000
Swagger: http://localhost:3000/docs
PostgreSQL: localhost:5432
```

Para parar os containers:

```bash
docker compose down
```

Para remover tambem o volume do banco:

```bash
docker compose down -v
```

## Testes automatizados

O projeto possui testes unitarios com Jest cobrindo dominio e casos de uso.

Foram criados repositórios em memoria para testar as regras de negocio sem depender de Express, Prisma ou PostgreSQL:

```txt
src/modules/catalog/tests/repositories/
  InMemoryCategoryRepository.ts
  InMemoryProductRepository.ts
```

Essa abordagem reforca a separacao da arquitetura: os casos de uso dependem de contratos do dominio e podem ser testados isoladamente.

Cobertura dos testes:

- entidades `Category` e `Product`
- validacoes de nome obrigatorio
- validacoes de preco maior que zero
- validacoes de estoque inteiro e nao negativo
- criacao, listagem, busca, atualizacao e exclusao de categorias
- bloqueio de categoria duplicada
- bloqueio de exclusao de categoria com produtos vinculados
- criacao, listagem, busca, atualizacao e exclusao de produtos
- validacao de categoria existente ao criar ou atualizar produto
- filtros de produto por categoria, faixa de preco e nome parcial
- busca de produto por ID retornando categoria

Rodar testes:

```bash
npm test
```

Rodar testes em modo watch:

```bash
npm run test:watch
```

Rodar testes com cobertura:

```bash
npm run test:coverage
```

Resultado atual da suite:

```txt
Test Suites: 13 passed, 13 total
Tests: 40 passed, 40 total
```

## Scripts

```bash
npm run dev
npm run build
npm start
npm run lint
npm run lint:fix
npm test
npm run test:watch
npm run test:coverage
npm run format
npm run format:check
```

## Endpoints

Base URL:

```txt
http://localhost:3000
```

### Health

```bash
curl "http://localhost:3000/health"
```

### Criar categoria

```bash
curl -X POST "http://localhost:3000/categories" \
  -H "Content-Type: application/json" \
  -d '{"name":"Eletronicos"}'
```

### Listar categorias

```bash
curl "http://localhost:3000/categories?page=1&limit=10"
```

### Buscar categoria por ID

```bash
curl "http://localhost:3000/categories/COLE_AQUI_O_ID_DA_CATEGORIA"
```

### Atualizar categoria

```bash
curl -X PUT "http://localhost:3000/categories/COLE_AQUI_O_ID_DA_CATEGORIA" \
  -H "Content-Type: application/json" \
  -d '{"name":"Informatica"}'
```

### Excluir categoria

```bash
curl -X DELETE "http://localhost:3000/categories/COLE_AQUI_O_ID_DA_CATEGORIA"
```

Se a categoria possuir produtos vinculados, a API retorna `409`.

### Criar produto

```bash
curl -X POST "http://localhost:3000/products" \
  -H "Content-Type: application/json" \
  -d '{
    "name":"Notebook Dell",
    "description":"Notebook para trabalho",
    "price":3500,
    "stock":5,
    "categoryId":"COLE_AQUI_O_ID_DA_CATEGORIA"
  }'
```

### Listar produtos

```bash
curl "http://localhost:3000/products?page=1&limit=10"
```

### Filtrar produtos por categoria

```bash
curl "http://localhost:3000/products?categoryId=COLE_AQUI_O_ID_DA_CATEGORIA"
```

### Filtrar produtos por faixa de preco

```bash
curl "http://localhost:3000/products?priceMin=1000&priceMax=4000"
```

### Buscar produtos por nome

```bash
curl "http://localhost:3000/products?name=dell"
```

### Combinar filtros

```bash
curl "http://localhost:3000/products?page=1&limit=10&categoryId=COLE_AQUI_O_ID_DA_CATEGORIA&priceMin=1000&priceMax=4000&name=note"
```

### Buscar produto por ID

Retorna tambem os dados da categoria.

```bash
curl "http://localhost:3000/products/COLE_AQUI_O_ID_DO_PRODUTO"
```

### Atualizar produto

```bash
curl -X PUT "http://localhost:3000/products/COLE_AQUI_O_ID_DO_PRODUTO" \
  -H "Content-Type: application/json" \
  -d '{
    "name":"Notebook Dell Pro",
    "description":"Notebook atualizado",
    "price":4200,
    "stock":3,
    "categoryId":"COLE_AQUI_O_ID_DA_CATEGORIA"
  }'
```

### Excluir produto

```bash
curl -X DELETE "http://localhost:3000/products/COLE_AQUI_O_ID_DO_PRODUTO"
```

## Exemplos de erros

### Categoria duplicada

```bash
curl -X POST "http://localhost:3000/categories" \
  -H "Content-Type: application/json" \
  -d '{"name":"Informatica"}'
```

Resposta esperada: `409`.

### Nome vazio

```bash
curl -X POST "http://localhost:3000/categories" \
  -H "Content-Type: application/json" \
  -d '{"name":"   "}'
```

Resposta esperada: `400`.

### Produto com preco invalido

```bash
curl -X POST "http://localhost:3000/products" \
  -H "Content-Type: application/json" \
  -d '{
    "name":"Mouse",
    "description":"Mouse USB",
    "price":0,
    "stock":10,
    "categoryId":"COLE_AQUI_O_ID_DA_CATEGORIA"
  }'
```

Resposta esperada: `400`.

### Produto com estoque negativo

```bash
curl -X POST "http://localhost:3000/products" \
  -H "Content-Type: application/json" \
  -d '{
    "name":"Teclado",
    "description":"Teclado mecanico",
    "price":250,
    "stock":-1,
    "categoryId":"COLE_AQUI_O_ID_DA_CATEGORIA"
  }'
```

Resposta esperada: `400`.

### Produto com categoria inexistente

```bash
curl -X POST "http://localhost:3000/products" \
  -H "Content-Type: application/json" \
  -d '{
    "name":"Cabo HDMI",
    "description":"Cabo 2 metros",
    "price":40,
    "stock":20,
    "categoryId":"00000000-0000-0000-0000-000000000000"
  }'
```

Resposta esperada: `404`.

## Validacoes finais

Antes de entregar:

```bash
npm run lint
npm test
npx tsc --noEmit
npm run build
```

## Observacoes

- O projeto usa migrations do Prisma. Nao foi usado `prisma db push` como fluxo de entrega.
- A API foi pensada para manter as regras de negocio fora da camada HTTP e fora do Prisma.
