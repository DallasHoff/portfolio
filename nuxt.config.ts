// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
	runtimeConfig: {
		public: {},
	},
	build: {
		transpile: [
			'@fortawesome/vue-fontawesome',
			'@fortawesome/fontawesome-svg-core',
			'@fortawesome/pro-light-svg-icons',
			'@fortawesome/free-brands-svg-icons',
		],
	},
	vite: {
		css: {
			preprocessorOptions: {
				scss: {
					includePaths: ['./assets/css'],
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
});
