// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
    css: ["~/assets/css/main.css"],
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
    nitro: {
        experimental: {
            database: true,
        },
    },
    runtimeConfig: {
        jwtAccessSecret: process.env.JWT_ACCESS_TOKEN_SECRET,
        jwtRefreshSecret: process.env.JWT_REFRESH_TOKEN_SECRET,
        // Cloudinary
        cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME,
        cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
        cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET,
    }
});
