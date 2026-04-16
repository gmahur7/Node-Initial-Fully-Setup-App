export interface EnvironmentVariables {
  PORT: number;
  DATABASE_URL: string;
  NODE_ENV: "development" | "test" | "production";
}
