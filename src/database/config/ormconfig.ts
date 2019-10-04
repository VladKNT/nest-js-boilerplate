import { ConnectionOptions } from 'typeorm';

const ormconfig: ConnectionOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ['dist/database/models/**/*.entity{.ts,.js}'],
  migrations: ['dist/database/migrations/**/*.js'],
  subscribers: ['dist/database/subscribers/**/*.js'],
  cli: {
    entitiesDir: 'src/database/entities',
    migrationsDir: 'src/database/migrations',
    subscribersDir: 'src/database/subscribers',
  },
  synchronize: false,
  logging: true,
};

export = ormconfig;
