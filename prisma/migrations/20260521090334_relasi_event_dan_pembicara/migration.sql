/*
  Warnings:

  - Added the required column `pembicara_id` to the `events` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."events" ADD COLUMN     "pembicara_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."events" ADD CONSTRAINT "events_pembicara_id_fkey" FOREIGN KEY ("pembicara_id") REFERENCES "public"."pembicara"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
