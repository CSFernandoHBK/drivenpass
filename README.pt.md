SafePass é um sistema de gerenciamento de senhas, voltado para contas web e redes wifi. Este repositório se refere apenas ao backend da aplicação.

O projeto foi escrito utilizando Typescript e Express. Como banco de dados, optou-se pelo PostGreSQL, sendo sua operação realizada através da Prisma ORM. Para os testes automatizados, utilizou-se o Jest.

Sendo um sistema de gerenciamento de senhas, a criptografia é um aspecto fundamental do seu funcionamento. Bcrypt foi utilizado para criptografar os dados de cadastro do usuário. Já para criptografar as credenciais que o usuário cadastra no sistema, utilizou-se o Cryptr.

Se você tiver problemas com a falta do .env: crie um arquivo .env com as mesmas configurações do .env.development, rode a migração, daí exclua o arquivo .env.