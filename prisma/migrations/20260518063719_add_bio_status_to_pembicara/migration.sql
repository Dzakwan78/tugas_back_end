-- DropIndex
DROP INDEX "public"."pembicara_email_key";

-- AlterTable
ALTER TABLE "public"."pembicara" ADD COLUMN     "bio" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "status" TEXT NOT NULL DEFAULT '',
ALTER COLUMN "photo" DROP NOT NULL;
