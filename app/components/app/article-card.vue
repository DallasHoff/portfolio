<script setup lang="ts">
defineProps({
	path: { type: String, required: true },
	title: { type: String, required: true },
	subtitle: { type: String },
	description: { type: String },
	image: { type: String },
});

const bgLoaded = ref<boolean>(false);
const bgOpacity = computed<number>(() => (bgLoaded.value ? 0.8 : 0));
</script>

<template>
	<nuxt-link :to="path" class="app-article-card">
		<nuxt-img
			v-if="image"
			:src="image"
			alt=""
			loading="lazy"
			width="800"
			densities="1x 2x"
			format="auto"
			provider="cloudflare"
			class="app-article-card__img"
			@load="bgLoaded = true"
		></nuxt-img>
		<div class="app-article-card__content">
			<h3 class="app-article-card__title">
				{{ title }}
			</h3>
			<div v-if="subtitle" class="app-article-card__subtitle">
				{{ subtitle }}
			</div>
			<p v-if="description" class="app-article-card__description">
				{{ description }}
			</p>
		</div>
	</nuxt-link>
</template>

<style lang="scss">
@use 'cards';

.app-article-card {
	@include cards.solid-card;
	position: relative;
	font-size: 1rem;
	color: inherit;
	text-decoration: none;
	overflow: hidden;

	&__img {
		position: absolute;
		right: 0;
		top: 0;
		bottom: 0;
		width: 60%;
		max-width: 400px;
		mask-image: linear-gradient(70deg, #0000 0%, #0000 20%, #fff 100%);
		opacity: v-bind(bgOpacity);
		transition: opacity 300ms;
	}

	&__content {
		position: relative;
	}

	&__title {
		font-size: 1.1em;
		margin-bottom: 0.35em;
	}

	&__subtitle {
		font-size: 0.95em;
		line-height: 1.4;
		margin-bottom: 0.5em;
		color: var(--text-color-0);
	}

	&__description {
		font-size: 0.8em;
		text-wrap: pretty;
	}
}
</style>
