<script setup lang="ts">
import { SiteNavbarProps } from '~~/components/site/navbar.vue';

const navbarLinks: SiteNavbarProps['links'] = [
	{
		label: 'About Me',
		path: '/',
		icon: 'fa-light fa-user-tie-hair',
	},
	{
		label: 'Projects',
		path: '/projects',
		icon: 'fa-light fa-display-code',
	},
	{
		label: 'Blog',
		path: '/blog',
		icon: 'fa-light fa-newspaper',
	},
];
</script>

<template>
	<div>
		<site-navbar :links="navbarLinks"></site-navbar>
		<header class="layout-header">
			<div class="layout-header__hero">
				<slot name="hero"></slot>
			</div>
			<div class="layout-header__content">
				<h1 v-if="$route.meta.title" class="layout-header__title">
					{{ $route.meta.title }}
				</h1>
				<div v-if="$route.meta.subtitle" class="layout-header__subtitle">
					{{ $route.meta.subtitle }}
				</div>
				<div v-if="$slots.header" class="layout-header__slot">
					<slot name="header"></slot>
				</div>
			</div>
		</header>
		<main class="layout-main">
			<slot></slot>
		</main>
	</div>
</template>

<style lang="scss" scoped>
@use '~/assets/css/cards';

.layout-header {
	--layout-header-breakout-size: 2.2em;
	font-size: 2.5rem;
	position: relative;
	min-height: 240px;
	height: 30vh;
	max-height: 480px;
	margin-bottom: var(--layout-header-breakout-size);
	background-color: var(--bg-color-3);
	border-bottom: 1px solid var(--bg-color-5);
	text-shadow: var(--text-shadow-1);

	&__hero {
		position: absolute;
		display: flex;
		justify-content: center;
		align-items: flex-start;
		width: 100%;
		height: 100%;
		overflow: hidden;
	}

	&__content {
		@include cards.glassy-card;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 0.4em;
		position: absolute;
		bottom: calc(var(--layout-header-breakout-size) * -1);
		left: 0;
		right: 0;
		width: calc(100vw - (var(--content-padding) * 2));
		max-width: var(--content-width);
		padding: 0.8em;
		margin: auto;
		text-align: center;
	}

	&__slot {
		font-size: 1rem;
	}

	&__title {
		font-size: 1.2em;
		line-height: 1.2;
		word-break: normal;
	}

	&__subtitle {
		font-size: 0.5em;
		line-height: 1.4;
		word-break: normal;
	}
}

.layout-main {
	margin: 0 auto;
	padding: var(--content-padding);
	max-width: calc(var(--content-width) + (var(--content-padding) * 2));
}
</style>
