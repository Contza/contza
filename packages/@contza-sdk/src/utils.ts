export const formatSlug = (slug: string): string => {
    return slug.replaceAll("/", "_");
};
