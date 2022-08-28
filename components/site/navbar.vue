<script setup lang="ts">
// TODO: workaround for https://github.com/nuxt/framework/issues/5546
import { unref as _unref } from 'vue';

const label1 = ref<HTMLElement | null>(null);
const { width: label1Width } = useElementSize(label1);

const label2 = ref<HTMLElement | null>(null);
const { width: label2Width } = useElementSize(label2);

const label3 = ref<HTMLElement | null>(null);
const { width: label3Width } = useElementSize(label3);

const itemsWidth = computed<string>(() => {
	const widestLabelWidth: number = Math.max(
		label1Width.value,
		label2Width.value,
		label3Width.value
	);

	if (!widestLabelWidth) {
		return 'auto';
	}

	return `${widestLabelWidth}px`;
});
</script>

<template>
	<nav class="site-navbar">
		<ul class="site-navbar__link-list">
			<li class="site-navbar__item">
				<nuxt-link to="/" class="site-navbar__link">
					<fa-icon icon="fa-light fa-user-tie-hair"></fa-icon>
					<span ref="label1" class="site-navbar__label">About Me</span>
				</nuxt-link>
			</li>
			<li class="site-navbar__item">
				<nuxt-link to="/projects" class="site-navbar__link">
					<fa-icon icon="fa-light fa-display-code"></fa-icon>
					<span ref="label2" class="site-navbar__label">Projects</span>
				</nuxt-link>
			</li>
			<li class="site-navbar__item">
				<nuxt-link to="/blog" class="site-navbar__link">
					<fa-icon icon="fa-light fa-newspaper"></fa-icon>
					<span ref="label3" class="site-navbar__label">Blog</span>
				</nuxt-link>
			</li>
		</ul>
	</nav>
</template>

<style lang="scss">
@use '~/assets/css/text';

.site-navbar {
	font-size: 1.2rem;
	padding: 0.6em var(--content-padding);
	border-bottom: 1px solid var(--bg-color-5);
	background-color: #000000cf;
	backdrop-filter: blur(1rem);

	&__link-list {
		list-style-type: none;
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 2.4em;
		margin: auto;
		max-width: var(--content-width);
	}

	&__item {
		min-width: v-bind(itemsWidth);
	}

	&__link {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 0.3em;
		color: var(--text-color-3);
		text-decoration: none;
		white-space: nowrap;

		&:hover,
		&:focus-visible {
			color: var(--text-color-1);
		}

		&:active {
			color: var(--text-color-5);
		}

		&.router-link-active {
			color: var(--text-color-0);
		}
	}

	&__label {
		font-size: 0.6em;
		line-height: 1;
		white-space: nowrap;
	}
}

@media (min-width: 540px) {
	.site-navbar {
		padding: 1em var(--content-padding);

		&__item {
			min-width: auto;
		}

		&__link {
			flex-direction: row;
			gap: 0.6em;

			&:hover,
			&:focus-visible {
				.site-navbar__label {
					@include text.animated-underline--visible;
				}
			}
		}

		&__label {
			@include text.animated-underline;
			font-size: 1em;
			line-height: 1.4;
		}
	}
}
</style>
