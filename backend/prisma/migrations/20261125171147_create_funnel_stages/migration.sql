-- CreateTable
CREATE TABLE "funnel_stages" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "funnel_stages_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "funnel_stages_key_key" ON "funnel_stages"("key");

-- CreateIndex
CREATE UNIQUE INDEX "funnel_stages_position_key" ON "funnel_stages"("position");
