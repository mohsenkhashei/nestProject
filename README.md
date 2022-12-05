# Test Project With NestJS and Postgres

This is code challenge project with NestJS and Postgres using JWT authentication

## Installation

first run postgres localy or by Docker
exmaple with docker:

```bash
$ docker run --name nest-postgres -p 5432:5432 -e POSTGRES_PASSWORD=postgres -d postgres
```

then change the config file in config folder `.env.stage.dev` with your database config

## Running the app

```bash
$ npm install
# development
$ npm run start:dev
```

## Using the app

There is postman collection:<br />
[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/1566887-791300f1-c861-4722-9d8f-78c4dcbd0d35?action=collection%2Ffork&collection-url=entityId%3D1566887-791300f1-c861-4722-9d8f-78c4dcbd0d35%26entityType%3Dcollection%26workspaceId%3Df20b8551-2f10-4363-b926-f1d77d8643ff)

- [ ] First run this url `http//localhost:3000/auth` to get admin user pass
- [ ] Login with admin `http//localhost:3000/signin` (jwt)
- [ ] create account `http//localhost:3000/account`
- [ ] get code and share with `user` or `support`
- [ ] support & user can signup and signin to app with the `code`
- [ ] `user` can create/update/get/get with filer/delete product
- [ ] `support` can manage user and confirm product that user entered
- [ ] `admin` can get all account & create account
