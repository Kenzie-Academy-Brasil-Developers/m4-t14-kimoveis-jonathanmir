import { MigrationInterface, QueryRunner } from "typeorm";

export class TablesAndRelations1678304478214 implements MigrationInterface {
    name = 'TablesAndRelations1678304478214'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Address" ("id" SERIAL NOT NULL, "street" character varying(45) NOT NULL, "zipCode" character varying(8) NOT NULL, "number" character varying(7), "city" character varying(20) NOT NULL, "state" character varying(20) NOT NULL, CONSTRAINT "PK_9034683839599c80ebe9ebb0891" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Category" ("id" SERIAL NOT NULL, "name" character varying(45) NOT NULL, CONSTRAINT "UQ_0ac420e8701e781dbf1231dc230" UNIQUE ("name"), CONSTRAINT "PK_c2727780c5b9b0c564c29a4977c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "RealEstate" ("id" SERIAL NOT NULL, "sold" boolean NOT NULL DEFAULT false, "value" numeric(12,2) NOT NULL DEFAULT '0', "size" integer NOT NULL, "createdAt" date NOT NULL DEFAULT now(), "updatedAt" date NOT NULL DEFAULT now(), "addressId" integer, "categoryId" integer, CONSTRAINT "REL_5cddc16f08ac35e548b39a3fa9" UNIQUE ("addressId"), CONSTRAINT "PK_1e80687649717ed24e73ed8ba9f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "User" ("id" SERIAL NOT NULL, "name" character varying(45) NOT NULL, "email" character varying(45) NOT NULL, "admin" boolean NOT NULL DEFAULT false, "password" character varying(120) NOT NULL, "createdAt" date NOT NULL DEFAULT now(), "updatedAt" date NOT NULL DEFAULT now(), "deletedAt" date, CONSTRAINT "UQ_4a257d2c9837248d70640b3e36e" UNIQUE ("email"), CONSTRAINT "PK_9862f679340fb2388436a5ab3e4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Schedule" ("id" SERIAL NOT NULL, "date" date NOT NULL, "hour" TIME NOT NULL, "userId" integer, "realEstateId" integer, CONSTRAINT "PK_1e0db675cb5a22276ffd69b1a5a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "RealEstate" ADD CONSTRAINT "FK_5cddc16f08ac35e548b39a3fa9d" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "RealEstate" ADD CONSTRAINT "FK_c1d671b3d17bccc9f9340381a5e" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Schedule" ADD CONSTRAINT "FK_a655e58df86f8c68b7710b76639" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Schedule" ADD CONSTRAINT "FK_47f1b15d5bf112ff05ecad452c8" FOREIGN KEY ("realEstateId") REFERENCES "RealEstate"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Schedule" DROP CONSTRAINT "FK_47f1b15d5bf112ff05ecad452c8"`);
        await queryRunner.query(`ALTER TABLE "Schedule" DROP CONSTRAINT "FK_a655e58df86f8c68b7710b76639"`);
        await queryRunner.query(`ALTER TABLE "RealEstate" DROP CONSTRAINT "FK_c1d671b3d17bccc9f9340381a5e"`);
        await queryRunner.query(`ALTER TABLE "RealEstate" DROP CONSTRAINT "FK_5cddc16f08ac35e548b39a3fa9d"`);
        await queryRunner.query(`DROP TABLE "Schedule"`);
        await queryRunner.query(`DROP TABLE "User"`);
        await queryRunner.query(`DROP TABLE "RealEstate"`);
        await queryRunner.query(`DROP TABLE "Category"`);
        await queryRunner.query(`DROP TABLE "Address"`);
    }

}
