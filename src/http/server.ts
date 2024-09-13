import fastify from 'fastify'
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { createGoalRoute } from './routes/create-goal'
import { createCompletionRoute } from './routes/create-completion'
import { getPendingGoalsRoute } from './routes/get-pending-goals'
import { getWeekSummaryRoutes } from './routes/get-week-summary'
import fastifyCors from '@fastify/cors'

//Cria uma nova instância do framework Fastify e a armazena na variável app. Essa instância será usada para definir as rotas, middlewares e outras configurações do servidor
const app = fastify().withTypeProvider<ZodTypeProvider>()

app.register(fastifyCors, {
  origin: '*',
})

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(createGoalRoute)
app.register(createCompletionRoute)
app.register(getPendingGoalsRoute)
app.register(getWeekSummaryRoutes)

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
