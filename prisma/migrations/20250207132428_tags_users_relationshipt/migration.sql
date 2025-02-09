-- CreateTable
CREATE TABLE "_tagsTousers" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_tagsTousers_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_tagsTousers_B_index" ON "_tagsTousers"("B");

-- AddForeignKey
ALTER TABLE "_tagsTousers" ADD CONSTRAINT "_tagsTousers_A_fkey" FOREIGN KEY ("A") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_tagsTousers" ADD CONSTRAINT "_tagsTousers_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
