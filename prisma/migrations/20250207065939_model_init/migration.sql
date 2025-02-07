-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "userName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'user',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "snippets" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "snippets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tags" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "snippet_tags" (
    "snippet_id" INTEGER NOT NULL,
    "tag_id" INTEGER NOT NULL,

    CONSTRAINT "snippet_tags_pkey" PRIMARY KEY ("snippet_id","tag_id")
);

-- CreateTable
CREATE TABLE "user_favorites" (
    "user_id" INTEGER NOT NULL,
    "snippet_id" INTEGER NOT NULL,

    CONSTRAINT "user_favorites_pkey" PRIMARY KEY ("user_id","snippet_id")
);

-- CreateTable
CREATE TABLE "user_snippets" (
    "user_id" INTEGER NOT NULL,
    "snippet_id" INTEGER NOT NULL,

    CONSTRAINT "user_snippets_pkey" PRIMARY KEY ("user_id","snippet_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "tags_name_key" ON "tags"("name");

-- AddForeignKey
ALTER TABLE "snippet_tags" ADD CONSTRAINT "snippet_tags_snippet_id_fkey" FOREIGN KEY ("snippet_id") REFERENCES "snippets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "snippet_tags" ADD CONSTRAINT "snippet_tags_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_favorites" ADD CONSTRAINT "user_favorites_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_favorites" ADD CONSTRAINT "user_favorites_snippet_id_fkey" FOREIGN KEY ("snippet_id") REFERENCES "snippets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_snippets" ADD CONSTRAINT "user_snippets_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_snippets" ADD CONSTRAINT "user_snippets_snippet_id_fkey" FOREIGN KEY ("snippet_id") REFERENCES "snippets"("id") ON DELETE CASCADE ON UPDATE CASCADE;
