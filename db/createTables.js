#!/usr/bin/env node

require("dotenv").config();

const { Client } = require("pg");

const SQLCREATE = `
    CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY,
  "userName" varchar,
  "password" varchar,
  "role" varchar
);

CREATE TABLE "snippets" (
  "id" SERIAL PRIMARY KEY,
  "title" varchar,
  "description" varchar,
  "code" varchar,
  "language" varchar
);

CREATE TABLE "tags" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar
);

-- Junction table for user's favorite snippets
CREATE TABLE "user_favorites" (
  "user_id" INTEGER REFERENCES "users" ("id") ON DELETE CASCADE,
  "snippet_id" INTEGER REFERENCES "snippets" ("id") ON DELETE CASCADE,
  PRIMARY KEY ("user_id", "snippet_id")
);

-- Junction table for user's own snippets
CREATE TABLE "user_snippets" (
  "user_id" INTEGER REFERENCES "users" ("id") ON DELETE CASCADE,
  "snippet_id" INTEGER REFERENCES "snippets" ("id") ON DELETE CASCADE,
  PRIMARY KEY ("user_id", "snippet_id")
);

-- Junction table for snippet tags (many-to-many)
CREATE TABLE "snippet_tags" (
  "snippet_id" INTEGER REFERENCES "snippets" ("id") ON DELETE CASCADE,
  "tag_id" INTEGER REFERENCES "tags" ("id") ON DELETE CASCADE,
  PRIMARY KEY ("snippet_id", "tag_id")
);

`;

async function main() {
    const client = new Client({
        connectionString: process.env.DATABASE_URL
    });

    console.log("Seeding Database . . .");
    try {
        await client.connect();
        await client.query(SQLCREATE);
        await client.end();

        console.log("Database Seeded Successfully");
    } catch (err) {
        console.log("Error while seeding database: ", err);
    }
}

main();
