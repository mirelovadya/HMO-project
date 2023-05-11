-- CreateTable
CREATE TABLE `customer` (
    `customerIndex` INTEGER NOT NULL AUTO_INCREMENT,
    `fullName` TEXT NOT NULL,
    `id` TEXT NOT NULL,
    `address` TEXT NULL,
    `dateOfBirthay` DATETIME(0) NULL,
    `phone` TEXT NULL,
    `mobilePhone` TEXT NULL,
    `image` LONGTEXT NULL,

    PRIMARY KEY (`customerIndex`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `vaccinations` (
    `vaccinationsIndex` INTEGER NOT NULL AUTO_INCREMENT,
    `date` DATETIME(0) NULL,
    `vaccineManufacturerIndex` INTEGER NOT NULL,
    `customerCustomerIndex` INTEGER NULL,

    PRIMARY KEY (`vaccinationsIndex`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `vaccineManufacturer` (
    `vaccineManufacturerIndex` INTEGER NOT NULL AUTO_INCREMENT,
    `vaccineManufacturerName` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `userName_UNIQUE`(`vaccineManufacturerName`),
    PRIMARY KEY (`vaccineManufacturerIndex`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `diseases` (
    `diseasesIndex` INTEGER NOT NULL AUTO_INCREMENT,
    `startDate` DATETIME(0) NULL,
    `endDate` DATETIME(0) NULL,
    `customerIndex` INTEGER NOT NULL,

    UNIQUE INDEX `customerIndex_UNIQUE`(`customerIndex`),
    PRIMARY KEY (`diseasesIndex`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `vaccinations` ADD CONSTRAINT `vaccinations_customerCustomerIndex_fkey` FOREIGN KEY (`customerCustomerIndex`) REFERENCES `customer`(`customerIndex`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `vaccinations` ADD CONSTRAINT `vaccinations_vaccineManufacturerIndex_fkey` FOREIGN KEY (`vaccineManufacturerIndex`) REFERENCES `vaccineManufacturer`(`vaccineManufacturerIndex`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `diseases` ADD CONSTRAINT `diseases_customerIndex_fkey` FOREIGN KEY (`customerIndex`) REFERENCES `customer`(`customerIndex`) ON DELETE RESTRICT ON UPDATE CASCADE;
