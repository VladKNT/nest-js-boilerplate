import { MigrationInterface, QueryRunner } from 'typeorm';

export class RefreshToken1570439202193 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`
      CREATE TABLE "refresh_token" (
        "id" SERIAL NOT NULL,
        "token" character varying NOT NULL,
        "userId" integer,
        CONSTRAINT "UQ_c31d0a2f38e6e99110df62ab0af" UNIQUE ("token"),
        CONSTRAINT "PK_b575dd3c21fb0831013c909e7fe" PRIMARY KEY ("id")
      )
    `, undefined);

    await queryRunner.query(`
      ALTER TABLE "refresh_token" ADD
      CONSTRAINT "FK_8e913e288156c133999341156ad" FOREIGN KEY ("userId")
      REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `, undefined);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`ALTER TABLE "refresh_token" DROP CONSTRAINT "FK_8e913e288156c133999341156ad"`, undefined);
    await queryRunner.query(`DROP TABLE "refresh_token"`, undefined);
  }

}
