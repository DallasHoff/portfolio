// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
	compatibilityDate: '2025-06-05',
	experimental: {
		viewTransition: true,
		defaults: { nuxtLink: { trailingSlash: 'append' } },
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
	css: ['~/assets/css/app.scss'],
	typescript: {
		strict: true,
		typeCheck: true,
		shim: false,
	},
	modules: [
		'@nuxt/image',
		'nuxt-lodash',
		'@vueuse/nuxt',
		'@vesp/nuxt-fontawesome',
	],
	image: {
		cloudflare: {
			baseURL: 'https://dallashoffman.com',
		},
	},
	lodash: {
		prefix: '_',
		upperAfterPrefix: false,
	},
	fontawesome: {
		component: 'fa',
		suffix: true,
		icons: {
			brands: ['faLinkedin', 'faGithub'],
		},
		proIcons: {
			light: [
				'faUserTieHair',
				'faDisplayCode',
				'faNewspaper',
				'faEnvelope',
				'faBracketCurlyLeft',
				'faBracketCurlyRight',
				'faCalendarPlus',
				'faCalendarPen',
				'faImage',
				'faLeft',
				'faRight',
			],
		},
	},
});
