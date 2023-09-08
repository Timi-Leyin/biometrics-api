declare namespace NodeJS {
  interface ProcessEnv {
    ENV_MODE: "development" | "production";
    DEV_PORT: string;
    REQLOG_API_KEY: string;
    SQL_DATABASE: string;
    SQL_USER: string;
    SQL_PASS: string;
    SQL_HOST: string;
    // Add more environment variables here
  }
}
