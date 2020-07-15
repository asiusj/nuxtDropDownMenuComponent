export default {
    buildModules: ["@nuxt/typescript-build"],
    plugins: [
        {
            src: "@/plugins/mdi",
        },
        {
            src: "@/plugins/oclick",
            mode: "client",
        },
    ],
    modules: ["bootstrap-vue/nuxt"],
};
