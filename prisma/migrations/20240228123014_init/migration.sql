-- CreateEnum
CREATE TYPE "userStatus" AS ENUM ('active', 'inactive', 'rejected', 'deleted');

-- CreateEnum
CREATE TYPE "accountType" AS ENUM ('customer', 'admin', 'casher');

-- CreateEnum
CREATE TYPE "stuffRole" AS ENUM ('headChef', 'casher', 'dishwaster', 'barista', 'prepCook', 'hostess', 'pastryCook', 'kitchenManager', 'generalManager', 'ExecutiveChef');

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "uuid" VARCHAR(255),
    "firstName" VARCHAR(255) NOT NULL,
    "lastName" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "username" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "status" "userStatus" NOT NULL DEFAULT 'inactive',
    "accountType" "accountType" NOT NULL DEFAULT 'customer',
    "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "emailOtp" VARCHAR(6) DEFAULT '',
    "phoneOtp" VARCHAR(6) DEFAULT '',
    "phoneNumber" VARCHAR(500) NOT NULL,
    "firstLogin" BOOLEAN NOT NULL DEFAULT true,
    "phoneIsVerified" BOOLEAN NOT NULL DEFAULT false,
    "emailIsVerified" BOOLEAN NOT NULL DEFAULT false,
    "otpExpiry" TIMESTAMP(3),

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "category" (
    "id" SERIAL NOT NULL,
    "categoryName" VARCHAR(255) NOT NULL,
    "description" VARCHAR(255),
    "adminId" INTEGER NOT NULL,

    CONSTRAINT "category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product" (
    "id" SERIAL NOT NULL,
    "uuid" VARCHAR(255),
    "productName" VARCHAR(255) NOT NULL,
    "description" VARCHAR(255),
    "price" DECIMAL(10,2) NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 0,
    "categoryId" INTEGER NOT NULL,
    "adminId" INTEGER NOT NULL,

    CONSTRAINT "product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order" (
    "id" SERIAL NOT NULL,
    "customerId" INTEGER,
    "tableNumber" INTEGER,
    "orderDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL,
    "totalPrice" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "gst" DECIMAL(65,30) NOT NULL DEFAULT 0,

    CONSTRAINT "order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orderItem" (
    "id" SERIAL NOT NULL,
    "orderId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "subtotal" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "orderItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stuff" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "mobileNumber" TEXT,
    "hireDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "salary" DECIMAL(65,30) NOT NULL,
    "address" TEXT,
    "description" VARCHAR(255),
    "role" "stuffRole" NOT NULL,
    "createdBy" INTEGER NOT NULL,

    CONSTRAINT "stuff_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");

-- CreateIndex
CREATE UNIQUE INDEX "user_phoneNumber_key" ON "user"("phoneNumber");

-- CreateIndex
CREATE INDEX "user_email_idx" ON "user"("email");

-- AddForeignKey
ALTER TABLE "category" ADD CONSTRAINT "category_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orderItem" ADD CONSTRAINT "orderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orderItem" ADD CONSTRAINT "orderItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stuff" ADD CONSTRAINT "stuff_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
