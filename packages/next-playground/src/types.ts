declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NEXT_PUBLIC_CONTZA_WEBSITE: string;
            CONTZA_API_KEY: string;
        }
    }
}

export {};
