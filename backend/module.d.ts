declare namespace NodeJs{
    export interface ProcessEnv{
        PORT: string;
        DATABASE_URL: string;
        JWT_TOKEN: string;
        JWT_REFRESH_TOKEN: string;
    }
}