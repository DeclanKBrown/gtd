/*
  Warnings:

  - Made the column `started` on table `Review` required. This step will fail if there are existing NULL values in that column.
  - Made the column `stepOne` on table `Review` required. This step will fail if there are existing NULL values in that column.
  - Made the column `stepTwo` on table `Review` required. This step will fail if there are existing NULL values in that column.
  - Made the column `stepThree` on table `Review` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Review" ALTER COLUMN "started" SET NOT NULL,
ALTER COLUMN "started" SET DEFAULT true,
ALTER COLUMN "stepOne" SET NOT NULL,
ALTER COLUMN "stepOne" SET DEFAULT false,
ALTER COLUMN "stepTwo" SET NOT NULL,
ALTER COLUMN "stepTwo" SET DEFAULT false,
ALTER COLUMN "stepThree" SET NOT NULL,
ALTER COLUMN "stepThree" SET DEFAULT false;
