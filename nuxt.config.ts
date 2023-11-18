// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
    modules: [
        '@unocss/nuxt',
    ],
    css: ["~/assets/tailwind.css", "~/assets/main.css"],
    ssr: false
})
