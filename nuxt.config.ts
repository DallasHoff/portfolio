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
	modules: [
		'@nuxt/image',
		'@vueuse/nuxt',
		'@vesp/nuxt-fontawesome',
		'nuxt-umami',
	],
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
	umami: {
		id: '69c5403b-d533-4dec-a87d-96d56bb33abf',
		host: 'https://umami.cordus.app',
		domains: ['dallashoffman.com'],
		autoTrack: true,
		useDirective: true,
	},
});
