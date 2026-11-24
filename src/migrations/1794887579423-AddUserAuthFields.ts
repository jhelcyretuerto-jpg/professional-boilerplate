import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserAuthFields1794887579423 implements MigrationInterface {
    name = 'AddUserAuthFields1794887579423';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE \`users\`
            ADD \`isVerified\` tinyint NOT NULL DEFAULT 0,
            ADD \`verificationToken\` varchar(255) NULL,
            ADD \`verificationTokenExpiry\` datetime NULL,
            ADD \`resetPasswordToken\` varchar(255) NULL,
            ADD \`resetPasswordExpires\` datetime NULL`
        );
        await queryRunner.query(
            `CREATE UNIQUE INDEX \`IDX_users_verificationToken\` ON \`users\` (\`verificationToken\`)`
        );
        await queryRunner.query(
            `CREATE UNIQUE INDEX \`IDX_users_resetPasswordToken\` ON \`users\` (\`resetPasswordToken\`)`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `DROP INDEX \`IDX_users_resetPasswordToken\` ON \`users\``
        );
        await queryRunner.query(
            `DROP INDEX \`IDX_users_verificationToken\` ON \`users\``
        );
        await queryRunner.query(
            `ALTER TABLE \`users\`
            DROP COLUMN \`resetPasswordExpires\`,
            DROP COLUMN \`resetPasswordToken\`,
            DROP COLUMN \`verificationTokenExpiry\`,
            DROP COLUMN \`verificationToken\`,
            DROP COLUMN \`isVerified\``
        );
    }
}
