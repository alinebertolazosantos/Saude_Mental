import { db } from '.'
import { env } from '../env'
import { goals_completions, goals } from './schema'

async function seed() {
  //console.log('Conectando ao banco de dados:', env)
  // await db.delete(goalCompletions)
  // await db.delete(goals)

  const result = await db.insert(goals).values([
    { title: 'Acordar cedo', desiredWeeklyFrequency: 5 },
    { title: 'Me exercitar', desiredWeeklyFrequency: 3 },
    { title: 'Meditar', desiredWeeklyFrequency: 1 },
  ])
}

seed()
