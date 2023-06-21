/*
  Warnings:

  - A unique constraint covering the columns `[registrantId]` on the table `Attendee` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[eventId,userId]` on the table `Attendee` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Attendee_registrantId_key" ON "Attendee"("registrantId");

-- CreateIndex
CREATE UNIQUE INDEX "Attendee_eventId_userId_key" ON "Attendee"("eventId", "userId");
