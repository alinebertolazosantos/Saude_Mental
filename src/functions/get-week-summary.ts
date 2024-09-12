import { and, count, eq, gte, lte, sql } from 'drizzle-orm'
import { db } from '../db'
import { goalCompletions, goals } from '../db/schema'
import dayjs from 'dayjs'

export async function getWeekSummary() {
  const firstDayOfWeek = dayjs().startOf('week').toDate()
  const lastDayOfWeek = dayjs().endOf('week').toDate()

  //Metadas criadas durante ou antes dessa semana
  const goalsCreatedUpToWeek = db.$with('goals_created_up_to_week').as(
    db
      .select({
        id: goals.id,
        title: goals.title,
        desiredWeeklyFrequency: goals.desiredWeeklyFrequency,
        createdAt: goals.createdAt,
      })
      .from(goals)
      .where(lte(goals.createdAt, lastDayOfWeek))
  )

  //Metas que já foram completadas
  const goalsCompletedInWeek = db.$with('goals_completed_in_week').as(
    db
      .select({
        Id: goalCompletions.id,
        title: goals.title,
        completedAt: goalCompletions.createdAt,
        completedAtDate: sql /**/`
        DATE(${goalCompletions.createdAt})    
        `.as('completedAtDate'),
      })
      .from(goalCompletions)
      .innerJoin(goals, eq(goals.id, goalCompletions.id))
      .where(
        and(
          gte(goalCompletions.createdAt, firstDayOfWeek),
          lte(goalCompletions.createdAt, lastDayOfWeek)
        )
      )
  )

  const goalsCompletedByWeekDay = db.$with('goals_completed_by_week_day').as(
    db
      .select({
        completedAtDate: goalsCompletedInWeek.completedAtDate,
        completions: sql /**/`


            `,
      })
      .from(goalsCreatedUpToWeek)
      .groupBy(goalsCompletedInWeek.completedAtDate)
  )

  return {
    summary: 'teste',
  }
}
