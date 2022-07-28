-- CreateTable
CREATE TABLE "Process" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Process_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ProcessToProject" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ProcessToProject_AB_unique" ON "_ProcessToProject"("A", "B");

-- CreateIndex
CREATE INDEX "_ProcessToProject_B_index" ON "_ProcessToProject"("B");

-- AddForeignKey
ALTER TABLE "_ProcessToProject" ADD CONSTRAINT "_ProcessToProject_A_fkey" FOREIGN KEY ("A") REFERENCES "Process"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProcessToProject" ADD CONSTRAINT "_ProcessToProject_B_fkey" FOREIGN KEY ("B") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
