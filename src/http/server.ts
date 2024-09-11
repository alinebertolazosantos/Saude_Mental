import fastify from 'fastify'
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { createGoal } from '../functions/create-goal'
import z from 'zod'
import { getWeekPendingGoals } from '../functions/get-week-pending-goals'

//Cria uma nova instância do framework Fastify e a armazena na variável app. Essa instância será usada para definir as rotas, middlewares e outras configurações do servidor
const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.get('/pending-goals', async () => {
  const { pendingGoals } = await getWeekPendingGoals()

  return { pendingGoals }
})

app.post(
  '/goals',
  {
    schema: {
      body: z.object({
        title: z.string(),
        desiredWeeklyFrequency: z.number().int().min(1).max(7),
      }),
    },
  },
  async request => {
    const { title, desiredWeeklyFrequency } = request.body

    await createGoal({
      title,
      desiredWeeklyFrequency,
    })
  }
)

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
