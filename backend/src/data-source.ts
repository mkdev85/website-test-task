import { DataSource } from "typeorm";
import config from "./config/config";

export const AppDataSource = new DataSource({
  type: "postgres", // or your database type
  host: config.get('database.host'),
  port: config.get('database.port'),
  username: config.get('database.username'),
  password: config.get('database.password'),
  database: config.get('database.name'),
  entities: ["src/models/**/*.ts"],
  migrations: ["src/migrations/**/*.ts"],  // Ensure this points correctly
  synchronize: false, // set to false in production
  logging: true,
});