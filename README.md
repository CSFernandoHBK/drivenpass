# SafePass

SafePass is a password management system for web accounts and WiFi networks. This repository only refers to the **backend** of the application.

## Used technologies

<div style="display: flex; justify-content: space-around; margin-bottom: 20px; margin-top: 20px">
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" width="60" height="60"/>
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original-wordmark.svg" width="60" height="60"/>
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original-wordmark.svg" width="60" height="60"/>
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg" width="60" height="60"/>
</div>

The project was written using **Typescript** and **Express**. As a database, **PostgreSQL** was chosen, and its operation was carried out through **Prisma ORM**. For automated tests, **Jest** was used.

### Auxiliar technologies

As a password management system, encryption is a fundamental aspect of how it works. Bcrypt was used to encrypt user registration data. To encrypt the credentials that the user registers in the system, Cryptr was used.

## How to run for development

1. Clone this repository
2. Install all dependencies

```
npm i
```

3. Create a PostgreSQL database with whatever name you want
4. Configure the `.env.development` file using the `.env.example` file
5. Run all migrations

```
npx prisma migrate dev
```
Ps: If you have problems with the missing .env: create an .env file with the same settings as the .env.development, run the migration, then delete the .env file.

6. Run the back-end in a development environment:

```bash
npm run dev
```

## Routes

Still writing... :)

### Registration and login

* <h3>POST /user/sign-up</h3>

* <h3>POST /user/sign-in</h3>


### Credentials

* <h3>POST /credential</h3>


* <h3>GET /credential/:id</h3>


* <h3>GET /credential</h3>


* <h3>DELETE /credential/:id</h3>


### Networks

* <h3>POST /network</h3>


* <h3>GET /network/:id</h3>


* <h3>GET /network</h3>


* <h3>DELETE /network/:id</h3>


## How to run for tests

Still writing... :)
