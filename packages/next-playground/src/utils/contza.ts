import ContzaSDK from "@contza/sdk";

export const contza = new ContzaSDK(process.env.CONTZA_WEBSITE, process.env.CONTZA_API_KEY, {
    contzaUrl: "http://localhost:3000/api",
});
