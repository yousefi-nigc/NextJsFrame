-- AlterTable
ALTER TABLE "assessment_acceptance_factors" ADD COLUMN     "evacuationPlanClear" BOOLEAN,
ADD COLUMN     "mobilityFactorMulti" TEXT,
ADD COLUMN     "noPanicRisk" BOOLEAN,
ADD COLUMN     "perceptionAwareness" BOOLEAN;
