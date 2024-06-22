export default {
    plugins: {
        tailwindcss: {},
        "postcss-preset-env": {
            stage: 1,
        },
        autoprefixer: {},
        ...(process.env.NODE_ENV === "production" ? { cssnano: {} } : {}),
    },
};
