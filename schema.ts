import { pgTable, text, serial, integer, timestamp, boolean, jsonb, real } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").unique().notNull(),
  email: text("email").unique().notNull(),
  password: text("password").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const aiAgents = pgTable("ai_agents", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  name: text("name").notNull(),
  personality: jsonb("personality").notNull(),
  bodyParams: jsonb("body_params").notNull(),
  manifest: jsonb("manifest").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  agentId: integer("agent_id").references(() => aiAgents.id),
  content: text("content").notNull(),
  sentenceMode: text("sentence_mode"),
  field: text("field"),
  voice: text("voice"),
  posture: text("posture"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const resonanceScores = pgTable("resonance_scores", {
  id: serial("id").primaryKey(),
  postId: integer("post_id").references(() => posts.id).notNull(),
  userId: integer("user_id").references(() => users.id).notNull(),
  engagementScore: real("engagement_score").notNull(),
  emotionalScore: real("emotional_score").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const userMatches = pgTable("user_matches", {
  id: serial("id").primaryKey(),
  userId1: integer("user_id_1").references(() => users.id).notNull(),
  userId2: integer("user_id_2").references(() => users.id).notNull(),
  matchScore: real("match_score").notNull(),
  sharedFields: jsonb("shared_fields"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const cultivationGoals = pgTable("cultivation_goals", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  title: text("title").notNull(),
  description: text("description"),
  category: text("category").notNull(),
  targetValue: real("target_value"),
  currentValue: real("current_value").default(0),
  completed: boolean("completed").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const journalEntries = pgTable("journal_entries", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  content: text("content").notNull(),
  mood: text("mood"),
  manifest: jsonb("manifest"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const skillPaths = pgTable("skill_paths", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  skillName: text("skill_name").notNull(),
  level: integer("level").default(1).notNull(),
  experience: integer("experience").default(0).notNull(),
  milestones: jsonb("milestones"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const agentInteractions = pgTable("agent_interactions", {
  id: serial("id").primaryKey(),
  agentId1: integer("agent_id_1").references(() => aiAgents.id).notNull(),
  agentId2: integer("agent_id_2").references(() => aiAgents.id).notNull(),
  conversationData: jsonb("conversation_data").notNull(),
  resonanceLevel: real("resonance_level"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const trinityProfiles = pgTable("trinity_profiles", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull().unique(),
  mindEnergy: integer("mind_energy").notNull(),
  bodyEnergy: integer("body_energy").notNull(),
  heartEnergy: integer("heart_energy").notNull(),
  dominantRole: text("dominant_role").notNull(),
  readiness: integer("readiness").notNull(),
  placement: text("placement"),
  skills: jsonb("skills").$type<string[]>(),
  tasks: jsonb("tasks").$type<string[]>(),
  dream: text("dream"),
  assessmentData: jsonb("assessment_data"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const resonanceConnections = pgTable("resonance_connections", {
  id: serial("id").primaryKey(),
  userId1: integer("user_id_1").references(() => users.id).notNull(),
  userId2: integer("user_id_2").references(() => users.id).notNull(),
  compatibilityScore: real("compatibility_score").notNull(),
  connectionType: text("connection_type").notNull(),
  status: text("status").default('active').notNull(),
  lastInteraction: timestamp("last_interaction"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const pods = pgTable("pods", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  goalCategory: text("goal_category").notNull(),
  requiredSkills: jsonb("required_skills").$type<string[]>(),
  status: text("status").default('forming').notNull(),
  startDate: timestamp("start_date"),
  endDate: timestamp("end_date"),
  resonanceTheme: text("resonance_theme"),
  aiGuidance: text("ai_guidance"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const podMembers = pgTable("pod_members", {
  id: serial("id").primaryKey(),
  podId: integer("pod_id").references(() => pods.id).notNull(),
  userId: integer("user_id").references(() => users.id).notNull(),
  joinedAt: timestamp("joined_at").defaultNow().notNull(),
  leftAt: timestamp("left_at"),
  contributionScore: real("contribution_score"),
  feedback: text("feedback"),
});

export const usersRelations = relations(users, ({ one, many }) => ({
  aiAgents: many(aiAgents),
  posts: many(posts),
  resonanceScores: many(resonanceScores),
  cultivationGoals: many(cultivationGoals),
  journalEntries: many(journalEntries),
  skillPaths: many(skillPaths),
  trinityProfile: one(trinityProfiles),
  podMemberships: many(podMembers),
}));

export const aiAgentsRelations = relations(aiAgents, ({ one, many }) => ({
  user: one(users, {
    fields: [aiAgents.userId],
    references: [users.id],
  }),
  posts: many(posts),
}));

export const postsRelations = relations(posts, ({ one, many }) => ({
  user: one(users, {
    fields: [posts.userId],
    references: [users.id],
  }),
  agent: one(aiAgents, {
    fields: [posts.agentId],
    references: [aiAgents.id],
  }),
  resonanceScores: many(resonanceScores),
}));
