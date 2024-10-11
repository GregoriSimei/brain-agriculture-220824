# Iniciar a aplicação
Ja deixei o .env da aplicação dentro do próprio repositório. Assim, para executar a aplicação basta ter o docker instalado e rodar o comando `docker-compose up`.
Caso não tenha do docker instalado, vai precisar alterar a variável HOST para 127.0.0.1 e a variável DB_HOST para 127.0.0.1.

Na inicialização, deve ter o banco configurado corretamente pois, como um dos requisitos era criar o mock, eu implementei na inicialização, um script responsável por popular o banco de dados (desconsiderar, caso tenha o docker instalado e rode o comando `docker-compose up`)

# Endpoints
```
[GET] http://127.0.0.1:3333/farms/dashes - Buscar dados do dashboard

[POST] http://127.0.0.1:3333/farms - Criar uma fazenda
{
    "cnpj": "08592439000162",
    "name": "fazenda teste do parana",
    "area": 15000,
    "vegetationArea": 2000,
    "city": "Sao paulo",
    "state": "Sao paulo"
}

[POST] http://127.0.0.1:3333/farms/:farm_id/farmings - Criar uma area de cultivo
{
    "name": "suinocultura",
    "area": 200
}

[POST] http://127.0.0.1:3333/producers - Criar um produtor
{
    "name": "gregori",
    "cpf": "10363125000"
}

[PUT] http://127.0.0.1:3333/farms/:farm_id/producers - Adicionar produtor na fazenda
{
    "cpf": "10363125000"
}

[PATCH] http://127.0.0.1:3333/producers/:producer_id - Atualizar dados do produtor
{
    "name": "atualizado 3"
}

[DELETE] http://127.0.0.1:3333/producers/:producer_id - Deletar produtor
```

# Estrutura de dados da aplicação
[![image](https://github.com/GregoriSimei/tinnova-220824-brain-agriculture/blob/main/docs/SerasaAPI.drawio.png)](/)
<br>Obs: esse arquivo se encontra na pasta docs, dentro do projeto
