import {
    timestamp,
    pgTable,
    text,
    primaryKey,
    integer,
    boolean,
} from "drizzle-orm/pg-core";
import type { AdapterAccountType } from "next-auth/adapters";
import crypto from "crypto";
import { relations, sql } from "drizzle-orm";

export const users = pgTable("user", {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    name: text("name"),
    email: text("email").unique(),
    emailVerified: timestamp("emailVerified", { mode: "date" }),
    image: text("image"),
});

export const accounts = pgTable(
    "account",
    {
        userId: text("userId")
            .notNull()
            .references(() => users.id, { onDelete: "cascade" }),
        type: text("type").$type<AdapterAccountType>().notNull(),
        provider: text("provider").notNull(),
        providerAccountId: text("providerAccountId").notNull(),
        refresh_token: text("refresh_token"),
        access_token: text("access_token"),
        expires_at: integer("expires_at"),
        token_type: text("token_type"),
        scope: text("scope"),
        id_token: text("id_token"),
        session_state: text("session_state"),
    },
    (account) => ({
        compoundKey: primaryKey({
            columns: [account.provider, account.providerAccountId],
        }),
    })
);

export const sessions = pgTable("session", {
    sessionToken: text("sessionToken").primaryKey(),
    userId: text("userId")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
    "verificationToken",
    {
        identifier: text("identifier").notNull(),
        token: text("token").notNull(),
        expires: timestamp("expires", { mode: "date" }).notNull(),
    },
    (verificationToken) => ({
        compositePk: primaryKey({
            columns: [verificationToken.identifier, verificationToken.token],
        }),
    })
);

export const stories = pgTable("story", {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    content: text("content").notNull(),
    topics: text("topics")
        .array()
        .default(sql`'{}'::text[]`),
    userId: text("userId")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    publish: boolean("publish").default(false),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const comments = pgTable("comment", {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    content: text("content").notNull(),
    userId: text("userId")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    storyId: text("storyId")
        .notNull()
        .references(() => stories.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const likes = pgTable("like", {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    userId: text("userId")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    storyId: text("storyId")
        .notNull()
        .references(() => stories.id, { onDelete: "cascade" }),
});

export const savedStories = pgTable("savedStory", {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    userId: text("userId")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    storyId: text("storyId")
        .notNull()
        .references(() => stories.id, { onDelete: "cascade" }),
});

export const userRelations = relations(users, ({ many }) => ({
    stories: many(stories),
    comments: many(comments),
    likes: many(likes),
    savedStories: many(savedStories),
}));

export const storyRelations = relations(stories, ({ one, many }) => ({
    author: one(users, {
        fields: [stories.userId],
        references: [users.id],
    }),
    comments: many(comments),
    likes: many(likes),
    savedStories: many(savedStories),
}));

export const commentRelations = relations(comments, ({ one, many }) => ({
    author: one(users, {
        fields: [comments.userId],
        references: [users.id],
    }),
    story: one(stories, {
        fields: [comments.storyId],
        references: [stories.id],
    }),
}));

export const likeRelations = relations(likes, ({ one, many }) => ({
    author: one(users, {
        fields: [likes.userId],
        references: [users.id],
    }),
    story: one(stories, {
        fields: [likes.storyId],
        references: [stories.id],
    }),
}));

export const savedStoriesRelations = relations(
    savedStories,
    ({ one, many }) => ({
        author: one(users, {
            fields: [savedStories.userId],
            references: [users.id],
        }),
        story: one(stories, {
            fields: [savedStories.storyId],
            references: [stories.id],
        }),
    })
);

export const topics = pgTable("topic", {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    topics: text("topics")
        .array()
        .default(sql`'{}'::text[]`),
    userId: text("userId")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});
