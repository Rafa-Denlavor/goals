import dayjs from "dayjs";
import { count, and, eq, gte, lte, sql, desc, asc } from "drizzle-orm";
import { db } from "../db";
import { goals, goalsCompletions } from "../db/schema";

type TGoalsPerDay = Record<string, { id: string; title: string; description: string; createdAt: string }[]>;

export async function getWeekSummary(userId: string) {
  const firstDayOfWeek = dayjs().startOf("week").toDate();
  const lastDayOfWeek = dayjs().endOf("week").toDate();

  const goalsCreatedUpToWeek = db.$with("goals_created_up_to_week").as(
    db
      .select({
        id: goals.id,
        title: goals.title,
        description: goals.description,
        desiredWeeklyFrequency: goals.desiredWeeklyFrequency,
        createdAt: goals.createdAt,
      })
      .from(goals)
      .where(and(lte(goals.createdAt, lastDayOfWeek), eq(goals.userId, userId)))
  );

  const goalsCompletedInWeek = db.$with("goal_completion_counts").as(
    db
      .select({
        id: goalsCompletions.id,
        title: goals.title,
        description: goals.description,
        completedAt: goalsCompletions.createdAt,
        completedAtDate: sql/*sql*/ `
          DATE(${goalsCompletions.createdAt})
        `.as("completedAtDate"),
      })
      .from(goalsCompletions)
      .innerJoin(goals, eq(goals.id, goalsCompletions.goalId))
      .where(
        and(
          gte(goalsCompletions.createdAt, firstDayOfWeek),
          lte(goalsCompletions.createdAt, lastDayOfWeek)
        )
      )
      .orderBy(desc(goalsCompletions.createdAt))
  );

  const goalsCompletedByWeekDay = db.$with("goals_completed_by_week_day").as(
    db
      .select({
        completedAtDate: goalsCompletedInWeek.completedAtDate,
        completions: sql/*sql*/ `
        JSON_AGG(
          JSON_BUILD_OBJECT(
            'id', ${goalsCompletedInWeek.id},
            'description', ${goalsCompletedInWeek.description},
            'title', ${goalsCompletedInWeek.title},
            'completedAt', ${goalsCompletedInWeek.completedAt}
          )
        )
      `.as("completions"),
      })
      .from(goalsCompletedInWeek)
      .groupBy(goalsCompletedInWeek.completedAtDate)
      .orderBy(desc(goalsCompletedInWeek.completedAtDate))
  );

  const result = await db
    .with(goalsCreatedUpToWeek, goalsCompletedInWeek, goalsCompletedByWeekDay)
    .select({
      completed: sql/*sql*/ `
      (SELECT COUNT(*) FROM ${goalsCompletedInWeek})
    `.mapWith(Number),
      total: sql/*sql*/ `
      (SELECT SUM(${goalsCreatedUpToWeek.desiredWeeklyFrequency}) FROM ${goalsCreatedUpToWeek})
    `.mapWith(Number),
      goalsPerDay: sql/*sql*/<TGoalsPerDay>`
      JSON_OBJECT_AGG(
        ${goalsCompletedByWeekDay.completedAtDate},
        ${goalsCompletedByWeekDay.completions}
      )
    `,
    })
    .from(goalsCompletedByWeekDay);

  return {
    summary: result,
  };
}
