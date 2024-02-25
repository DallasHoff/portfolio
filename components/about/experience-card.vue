<script setup lang="ts">
defineProps({
	years: { type: String },
	title: { type: String },
	subtitle: { type: String },
	description: { type: String },
});
</script>

<template>
	<div class="about-experience-card">
		<div class="about-experience-card__years">{{ years }}</div>
		<h3 class="about-experience-card__title">{{ title }}</h3>
		<div class="about-experience-card__subtitle">{{ subtitle }}</div>
		<p class="about-experience-card__description">{{ description }}</p>
	</div>
</template>

<style lang="scss">
@use 'cards';

.about-experience-card {
	@include cards.solid-card;
	--card-glow-color: transparent;
	font-size: 1rem;
	background-image: radial-gradient(
		circle at 90% 100%,
		color-mix(in srgb, var(--card-glow-color) 50%, transparent) 0%,
		transparent 8em
	);

	&:nth-child(3n + 1) {
		--card-glow-color: var(--accent-color-a3);
	}

	&:nth-child(3n + 2) {
		--card-glow-color: var(--accent-color-b3);
	}

	&:nth-child(3n + 3) {
		--card-glow-color: var(--accent-color-c3);
	}

	&__years {
		float: right;
		line-height: 1.5;
		margin-left: 1.5em;
		margin-bottom: 1em;
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
