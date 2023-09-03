import { defineConfig } from "tsup";

export default defineConfig({
    entry: ["src/**/*.{ts,tsx}"],
    external: ["react", "react-dom"],
    format: ["cjs", "esm"],

    splitting: false,
    dts: true,
    sourcemap: true,
    minify: true,

    esbuildOptions(options) {
        options.banner = {
            js: '"use client"',
        };
    },
});
