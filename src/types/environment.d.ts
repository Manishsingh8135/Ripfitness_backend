// src/types/environment.d.ts

declare global {
    namespace NodeJS {
      interface ProcessEnv {
        NODE_ENV: 'development' | 'production' | 'test';
        PORT: string;
        MONGODB_URI: string;
        JWT_SECRET: string;
        // Add other environment variables you're using
      }
    }
  }
  
  export {};