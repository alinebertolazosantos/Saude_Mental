//O Fastify é um framework web rápido e leve para Node.js, utilizado para criar APIs e servidores HTTP.
import fastify from 'fastify'

//Cria uma nova instância do framework Fastify e a armazena na variável app. Essa instância será usada para definir as rotas, middlewares e outras configurações do servidor
const app = fastify()

// Chama o método listen da instância do Fastify para iniciar o servidor.
app
  .listen({
    //Define a porta em que o servidor irá escutar as requisições. Neste caso, a porta escolhida é a 3333.
    port: 3333,
  })
  .then(() => {
    // É uma promise que é resolvida quando o servidor inicia com sucesso.
    console.log('HTTP server running')
  })
