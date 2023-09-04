/** @type {import("next").NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ["storage.googleapis.com"],
    },
    i18n: {
        locales: ["fi-FI", "en_US"],
        defaultLocale: "en_US",
        localeDetection: false,
    },
    experimental: {
        appDir: true,
    },
};

module.exports = nextConfig;
