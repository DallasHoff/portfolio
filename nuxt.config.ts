export default defineNuxtConfig({
	compatibilityDate: '2025-08-08',
	experimental: {
		viewTransition: true,
		defaults: { nuxtLink: { trailingSlash: 'append' } },
	},
	vite: {
		css: {
			preprocessorOptions: {
				scss: {
					loadPaths: ['./app/assets/css'],
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
	modules: ['@nuxt/image', '@vueuse/nuxt', '@vesp/nuxt-fontawesome'],
	image: {
		cloudflare: {
			baseURL: 'https://dallashoffman.com',
		},
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
				'faLoader',
			],
		},
	},
});
