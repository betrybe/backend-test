# ApiBlogs

## Instalação
Instruções para instalar e configurar o projeto em seu computador.
1. Seguir o [passo a passo](https://hexdocs.pm/phoenix/installation.html) de instalação do Phoenix e suas dependências
2. Rodar o comando abaixo na pasta em que será criado o projeto

		mix phx.new api_blogs
3. Responder sim (`y`) para instalar as dependências

		Fetch and install dependencies? [Yn]
4. Entrar na pasta criada 

		cd api_blogs
5. Caso necessário, no arquivo `config/dev.exs`, configurar a base de dados, mudando o nome de usuário e senha
6. Criar a base de dados com 

		mix ecto.create
7. Obter os arquivos da pasta `api_blogs` [do repositório](https://github.com/helenapato/backend-test/tree/master/api_blogs) e colocá-los na pasta de mesmo nome no seu computador, sobrescrevendo os arquivos presentes nela
8. Instalar a dependência do Guardian com 

		mix deps.get 
9. Rodar as migrations com 

		mix ecto.migrate
10. No final do arquivo `config/config.exs`, adicionar o trecho abaixo. Rodar `mix guardian.gen.secret` para gerar a secret_key e substituí-la no local indicado.

		# Guardian config 
		config :api_blogs, ApiBlogs.Guardian, 
			issuer: "api_blogs", 
			secret_key: "Secret key. Use `mix guardian.gen.secret` to generate one"

## Testando
Para rodar os testes do user controller, use o comando abaixo, dentro da pasta `api_blogs`

	mix test test/api_blogs_web/controllers/user_controller_test.exs
Para testar manualmente, inicie o servidor com 

	mix phx.server
e use o Postman para enviar as requisições, lembrando que os endpoints `GET /user` e `GET /user/:id` precisam de um token JWT no header para serem aceitos. O token é gerado ao adicionar um usuário na base ou fazer login, e deve ser inserido no header manualmente como mostrado abaixo.

![Exemplo de inserção do token JWT no Postman](https://miro.medium.com/max/1400/1*iEe9LDRGZleHCcFZrKGrYg.png "Inserindo token JWT no header do Postman")

Exemplos de requisições podem ser conferidos no [readme](https://github.com/helenapato/backend-test/blob/master/README.md) do projeto.
