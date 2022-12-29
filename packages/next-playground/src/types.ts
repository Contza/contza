declare global {
    namespace NodeJS {
        interface ProcessEnv {
            CONTZA_WEBSITE: string;
            CONTZA_API_KEY: string;
        }
    }
}

export {};
