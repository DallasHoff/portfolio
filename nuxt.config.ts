// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
	experimental: {
		viewTransition: true,
	},
	runtimeConfig: {
		public: {},
	},
	imports: {
		dirs: ['types'],
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
	css: [
		'@fortawesome/fontawesome-svg-core/styles.css',
		'@/assets/css/app.scss',
	],
	typescript: {
		strict: true,
		typeCheck: true,
		shim: false,
	},
	modules: ['@nuxt/image', 'nuxt-lodash', '@vueuse/nuxt', '@nuxt/content'],
	lodash: {
		prefix: '_',
		upperAfterPrefix: false,
	},
	content: {
		contentHead: false,
	},
});
