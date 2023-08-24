export const CONTZA_PRODUCTION_URL = "https://app.contza.com";

export const formatSlug = (slug: string): string => {
    return slug.replaceAll("/", "_");
};
