import { ContzaClient } from "@contza/client";

export const contzaClient = new ContzaClient(
    process.env.NEXT_PUBLIC_CONTZA_WEBSITE,
    process.env.CONTZA_API_KEY,
    {
        contzaUrl: "http://localhost:3000",
    }
);
