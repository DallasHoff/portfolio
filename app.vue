<script lang="ts" setup>
const route = useRoute();

const appName: string = 'Dallas Hoffman';
const defaultDescription: string = 'I build applications for the web.';
const keywords: string[] = [
	'Dallas Hoffman',
	'portfolio',
	'blog',
	'web developer',
	'programmer',
	'software engineer',
];

const title = computed<string>(() => {
	const delimiter = ' | ';
	const titleSegs: string[] = [appName];

	route.matched.forEach((routeLevel) => {
		titleSegs.unshift(routeLevel.meta.title ?? '');
	});

	return titleSegs
		.filter((seg, i, segs) => !!seg && seg !== segs[i + 1])
		.join(delimiter);
});

const description = computed<string>(() => {
	return route.meta.description ?? defaultDescription;
});

useHead(() => ({
	title: title.value,
	charset: 'utf-8',
	viewport: 'width=device-width, initial-scale=1',
	htmlAttrs: {
		lang: 'en',
	},
	meta: [
		{ name: 'og:title', content: title.value },
		{ name: 'twitter:title', content: title.value },
		{ name: 'application-name', content: appName },
		{ name: 'og:site_name', content: appName },
		{ name: 'apple-mobile-web-app-title', content: appName },
		{ name: 'description', content: description.value },
		{ name: 'og:description', content: description.value },
		{ name: 'twitter:description', content: description.value },
		{ name: 'keywords', content: keywords.join(', ') },
		{ name: 'twitter:card', content: 'summary' },
		{ name: 'format-detection', content: 'telephone=no' },
		{ name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
		{ name: 'msapplication-tap-highlight', content: 'no' },
		{ name: 'msapplication-TileColor', content: '#48e9de' },
		{ name: 'theme-color', content: '#0e1825' },
	],
	link: [
		{
			rel: 'manifest',
			href: '/site.webmanifest',
		},
		{
			rel: 'icon',
			type: 'image/png',
			sizes: '32x32',
			href: '/favicon-32x32.png',
		},
		{
			rel: 'icon',
			type: 'image/png',
			sizes: '16x16',
			href: '/favicon-16x16.png',
		},
		{
			rel: 'apple-touch-icon',
			sizes: '180x180',
			href: '/apple-touch-icon.png',
		},
		{ rel: 'mask-icon', color: '#48e9de', href: '/safari-pinned-tab.svg' },
	],
}));
</script>

<template>
	<nuxt-page></nuxt-page>
</template>
