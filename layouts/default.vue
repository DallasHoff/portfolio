<script setup lang="ts">
const pageMeta = usePageMeta();
const { data: navbar } = await useContentFromPath('/navbar');
</script>

<template>
	<div class="layout-default">
		<app-navbar v-if="navbar" :links="navbar.links"></app-navbar>
		<header class="layout-default__header">
			<div class="layout-default__hero">
				<slot name="hero"></slot>
			</div>
			<div class="layout-default__content">
				<h1 v-if="pageMeta.title" class="layout-default__title">
					{{ pageMeta.title }}
				</h1>
				<div v-if="pageMeta.subtitle" class="layout-default__subtitle">
					{{ pageMeta.subtitle }}
				</div>
				<div v-if="$slots.header" class="layout-default__header-slot">
					<slot name="header"></slot>
				</div>
			</div>
		</header>
		<main class="layout-default__main">
			<slot></slot>
		</main>
	</div>
</template>

<style lang="scss">
@use 'cards';

.layout-default {
	&__header {
		--layout-default-header-breakout-size: 2.2em;
		font-size: 2rem;
		position: relative;
		min-height: 240px;
		height: 30vh;
		max-height: 480px;
		margin-bottom: var(--layout-default-header-breakout-size);
		background-color: var(--bg-color-3);
		border-bottom: 1px solid var(--bg-color-5);
		text-shadow: var(--text-shadow-1);
	}

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
		justify-content: center;
		gap: 0.4em;
		position: absolute;
		bottom: calc(var(--layout-default-header-breakout-size) * -1);
		left: 0;
		right: 0;
		width: calc(100vw - (var(--content-padding) * 2));
		max-width: var(--content-width);
		padding: 0.8em;
		margin: auto;
		text-align: center;
	}

	&__header-slot {
		font-size: 1rem;
		margin-top: 0.4em;
	}

	&__title {
		view-transition-name: layout-default__title;
		font-size: 1.2em;
		line-height: 1.1;
		text-wrap: pretty;
		word-break: normal;
	}

	&__subtitle {
		view-transition-name: layout-default__subtitle;
		font-size: 0.5em;
		line-height: 1.4;
		text-wrap: pretty;
		word-break: normal;
	}

	&__main {
		margin: 0 auto;
		padding: var(--content-padding);
		padding-bottom: calc(var(--content-padding) * 2);
		max-width: calc(var(--content-width) + (var(--content-padding) * 2));
	}
}

@media (min-width: 600px) {
	.layout-default {
		&__header {
			font-size: 2.5rem;
		}
	}
}
</style>
