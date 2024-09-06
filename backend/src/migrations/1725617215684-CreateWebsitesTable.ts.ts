import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateWebsitesTable1625617215684 implements MigrationInterface {
  name = 'CreateWebsitesTable1625617215684'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TYPE "website_status_enum" AS ENUM('online', 'offline')`);
    await queryRunner.query(`
        CREATE TABLE "websites" (
            "id" SERIAL NOT NULL,
            "name" character varying(255) NOT NULL,
            "url" character varying(255) NOT NULL,
            "status" "website_status_enum" NOT NULL DEFAULT 'offline',
            CONSTRAINT "UQ_a34249682ea550940f77969fd7b" UNIQUE ("url"),
            CONSTRAINT "PK_da80e50ae0d986d43c9eb80ab70" PRIMARY KEY ("id")
        )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "websites"`);
    await queryRunner.query(`DROP TYPE "website_status_enum"`);
  }
}
