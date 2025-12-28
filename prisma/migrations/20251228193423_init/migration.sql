-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "emailVerified" BOOLEAN NOT NULL DEFAULT false,
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "role" TEXT,
    "banned" BOOLEAN DEFAULT false,
    "banReason" TEXT,
    "banExpires" TIMESTAMP(3),

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "session" (
    "id" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "token" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "userId" TEXT NOT NULL,
    "impersonatedBy" TEXT,

    CONSTRAINT "session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "account" (
    "id" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "accessToken" TEXT,
    "refreshToken" TEXT,
    "idToken" TEXT,
    "accessTokenExpiresAt" TIMESTAMP(3),
    "refreshTokenExpiresAt" TIMESTAMP(3),
    "scope" TEXT,
    "password" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "verification" (
    "id" TEXT NOT NULL,
    "identifier" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "verification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "floor" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "level" DOUBLE PRECISION NOT NULL,
    "description" TEXT,
    "projectId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "floor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "assessment" (
    "id" TEXT NOT NULL,
    "floorId" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "assessment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "assessment_risk_factors" (
    "id" TEXT NOT NULL,
    "assessmentId" TEXT NOT NULL,
    "qi" DOUBLE PRECISION,
    "qm" DOUBLE PRECISION,
    "tempDestruction" DOUBLE PRECISION,
    "tempDestructionMulti" TEXT,
    "avgDimension" DOUBLE PRECISION,
    "materialClass" DOUBLE PRECISION,
    "materialClassMulti" TEXT,
    "length" DOUBLE PRECISION,
    "width" DOUBLE PRECISION,
    "area" DOUBLE PRECISION,
    "height" DOUBLE PRECISION,
    "accessType" TEXT,
    "windowArea" DOUBLE PRECISION,
    "staticVentArea" DOUBLE PRECISION,
    "mechVentFlow" DOUBLE PRECISION,
    "ventingRatio_k" DOUBLE PRECISION,
    "accessSides" INTEGER,
    "heightAbove" DOUBLE PRECISION,
    "depthBelow" DOUBLE PRECISION,
    "floorLevel" DOUBLE PRECISION,
    "factor_q" DOUBLE PRECISION,
    "factor_i" DOUBLE PRECISION,
    "factor_g" DOUBLE PRECISION,
    "factor_e" DOUBLE PRECISION,
    "factor_v" DOUBLE PRECISION,
    "factor_z" DOUBLE PRECISION,
    "risk_P" DOUBLE PRECISION,
    "risk_P1" DOUBLE PRECISION,
    "risk_P2" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "assessment_risk_factors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "assessment_acceptance_factors" (
    "id" TEXT NOT NULL,
    "assessmentId" TEXT NOT NULL,
    "mainActivity" DOUBLE PRECISION,
    "mainActivityKey" TEXT,
    "secondaryActivity" DOUBLE PRECISION,
    "heatTransferType" DOUBLE PRECISION,
    "heatTransferTypeKey" TEXT,
    "generatorLocation" DOUBLE PRECISION,
    "generatorLocationKey" TEXT,
    "energySource" DOUBLE PRECISION,
    "energySourceKey" TEXT,
    "electricalSystem" DOUBLE PRECISION,
    "flammableLiquids" DOUBLE PRECISION,
    "combustibleDust" DOUBLE PRECISION,
    "combustibleDustKey" TEXT,
    "weldingOperations" DOUBLE PRECISION,
    "additionalCarpentryPlastic" DOUBLE PRECISION,
    "specialRisk" DOUBLE PRECISION,
    "occupantCount" INTEGER,
    "occupantFactor" DOUBLE PRECISION,
    "occupantFactorKey" TEXT,
    "exitWidths" TEXT,
    "exitWidthTotal" DOUBLE PRECISION,
    "mobilityFactor" DOUBLE PRECISION,
    "exitCountToOpenSpace" INTEGER,
    "valueTotal" DOUBLE PRECISION,
    "valueYear" INTEGER,
    "replaceability" DOUBLE PRECISION,
    "dependencyType" TEXT,
    "dependencyManual" DOUBLE PRECISION,
    "factor_a" DOUBLE PRECISION,
    "factor_t" DOUBLE PRECISION,
    "factor_c" DOUBLE PRECISION,
    "factor_r" DOUBLE PRECISION,
    "factor_d" DOUBLE PRECISION,
    "level_A" DOUBLE PRECISION,
    "level_A1" DOUBLE PRECISION,
    "level_A2" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "assessment_acceptance_factors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "assessment_protection_factors" (
    "id" TEXT NOT NULL,
    "assessmentId" TEXT NOT NULL,
    "waterStorageType" TEXT,
    "waterCapacity" DOUBLE PRECISION,
    "distributionNetwork" TEXT,
    "hydrantCount25" INTEGER,
    "hydrantCount3" INTEGER,
    "hydrantCount4" INTEGER,
    "detectionType" DOUBLE PRECISION,
    "sprinklerType" DOUBLE PRECISION,
    "fireStationType" DOUBLE PRECISION,
    "waterSupplyType" DOUBLE PRECISION,
    "industrialBrigade" DOUBLE PRECISION,
    "n1" DOUBLE PRECISION,
    "n2" DOUBLE PRECISION,
    "n3" DOUBLE PRECISION,
    "n4" DOUBLE PRECISION,
    "n5" DOUBLE PRECISION,
    "structureResist" DOUBLE PRECISION,
    "facadeResist" DOUBLE PRECISION,
    "roofResist" DOUBLE PRECISION,
    "wallResist" DOUBLE PRECISION,
    "hasManyWindows" BOOLEAN,
    "noInternalSeparation" BOOLEAN,
    "combustibleInsulation" BOOLEAN,
    "subcompartment" DOUBLE PRECISION,
    "stairways" DOUBLE PRECISION,
    "horizontalExit" DOUBLE PRECISION,
    "sprinklers" DOUBLE PRECISION,
    "subCompartmentEI30" BOOLEAN,
    "subCompartmentEI60" BOOLEAN,
    "partialDetection" BOOLEAN,
    "partialSprinkler" BOOLEAN,
    "otherAutoExtinguish" BOOLEAN,
    "financialDataBackup" BOOLEAN,
    "sparePartsAccess" BOOLEAN,
    "selfRepairCapability" BOOLEAN,
    "relocationAgreements" BOOLEAN,
    "multipleProduction" BOOLEAN,
    "factor_W" DOUBLE PRECISION,
    "factor_N" DOUBLE PRECISION,
    "factor_S" DOUBLE PRECISION,
    "factor_F" DOUBLE PRECISION,
    "factor_U" DOUBLE PRECISION,
    "factor_Y" DOUBLE PRECISION,
    "level_D" DOUBLE PRECISION,
    "level_D1" DOUBLE PRECISION,
    "level_D2" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "assessment_protection_factors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "assessment_final_risks" (
    "id" TEXT NOT NULL,
    "assessmentId" TEXT NOT NULL,
    "factor_Fo" DOUBLE PRECISION,
    "risk_Ro" DOUBLE PRECISION,
    "final_R" DOUBLE PRECISION,
    "final_R1" DOUBLE PRECISION,
    "final_R2" DOUBLE PRECISION,
    "status_R" TEXT,
    "status_R1" TEXT,
    "status_R2" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "assessment_final_risks_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "session_token_key" ON "session"("token");

-- CreateIndex
CREATE UNIQUE INDEX "assessment_floorId_key" ON "assessment"("floorId");

-- CreateIndex
CREATE UNIQUE INDEX "assessment_risk_factors_assessmentId_key" ON "assessment_risk_factors"("assessmentId");

-- CreateIndex
CREATE UNIQUE INDEX "assessment_acceptance_factors_assessmentId_key" ON "assessment_acceptance_factors"("assessmentId");

-- CreateIndex
CREATE UNIQUE INDEX "assessment_protection_factors_assessmentId_key" ON "assessment_protection_factors"("assessmentId");

-- CreateIndex
CREATE UNIQUE INDEX "assessment_final_risks_assessmentId_key" ON "assessment_final_risks"("assessmentId");

-- AddForeignKey
ALTER TABLE "session" ADD CONSTRAINT "session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "account" ADD CONSTRAINT "account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project" ADD CONSTRAINT "project_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "floor" ADD CONSTRAINT "floor_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assessment" ADD CONSTRAINT "assessment_floorId_fkey" FOREIGN KEY ("floorId") REFERENCES "floor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assessment_risk_factors" ADD CONSTRAINT "assessment_risk_factors_assessmentId_fkey" FOREIGN KEY ("assessmentId") REFERENCES "assessment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assessment_acceptance_factors" ADD CONSTRAINT "assessment_acceptance_factors_assessmentId_fkey" FOREIGN KEY ("assessmentId") REFERENCES "assessment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assessment_protection_factors" ADD CONSTRAINT "assessment_protection_factors_assessmentId_fkey" FOREIGN KEY ("assessmentId") REFERENCES "assessment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assessment_final_risks" ADD CONSTRAINT "assessment_final_risks_assessmentId_fkey" FOREIGN KEY ("assessmentId") REFERENCES "assessment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
