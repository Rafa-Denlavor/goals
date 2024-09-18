import { pgTable, text, integer, timestamp } from "drizzle-orm/pg-core";
import { createId } from "@paralleldrive/cuid2";

export const goals = pgTable("goals", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  title: text("title").notNull(),
  description: text('description'),
  desiredWeeklyFrequency: integer("desired_weekly_frequency").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  userId: text("user_id")
});

export const goalsCompletions = pgTable("goals_completions", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  goalId: text("goal_id")
    .references(() => goals.id)
    .notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const users = pgTable("users", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  name: text("name").notNull(),
  username: text("username").notNull(),
  password: text("password").notNull(),
  avatar: text("avatar"),
  motivationalPhrase: text("motivational_phrase"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
})
