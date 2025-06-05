// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
	compatibilityDate: '2025-06-05',
	experimental: {
		viewTransition: true,
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
					api: 'modern-compiler',
					loadPaths: ['./assets/css'],
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
	modules: ['@nuxt/image', 'nuxt-lodash', '@vueuse/nuxt'],
	lodash: {
		prefix: '_',
		upperAfterPrefix: false,
	},
});
