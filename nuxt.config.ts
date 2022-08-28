import { defineNuxtConfig } from 'nuxt';

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
	ssr: false,
	vite: {
		css: {
			preprocessorOptions: {
				scss: {
					loadPaths: ['@/assets/css'],
				},
			},
		},
	},
	typescript: {
		strict: true,
		typeCheck: true,
		shim: false,
	},
	css: [
		'@fortawesome/fontawesome-svg-core/styles.css',
		'@/assets/css/app.scss',
	],
	modules: ['nuxt-lodash', '@vueuse/nuxt'],
	lodash: {
		prefix: '_',
	},
	runtimeConfig: {
		public: {},
	},
});
