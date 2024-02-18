<script setup lang="ts">
defineProps({
	links: {
		type: Array as PropType<{ label: string; icon: string; path: string }[]>,
		required: true,
	},
});

const linkListRef = ref<HTMLElement | null>(null);
const labelRefs = ref<HTMLElement[]>([]);
const itemsWidth = ref<string>('auto');

useResizeObserver(linkListRef, () => {
	const labelWidths = labelRefs.value.map((ref) => ref.offsetWidth);
	const widestLabelWidth = Math.max(...labelWidths);
	itemsWidth.value = widestLabelWidth ? `${widestLabelWidth}px` : 'auto';
});
</script>

<template>
	<nav class="app-navbar">
		<ul ref="linkListRef" class="app-navbar__link-list">
			<li v-for="link in links" class="app-navbar__item">
				<nuxt-link :to="link.path" class="app-navbar__link">
					<fa-icon :icon="link.icon"></fa-icon>
					<span ref="labelRefs" class="app-navbar__label">
						{{ link.label }}
					</span>
				</nuxt-link>
			</li>
		</ul>
	</nav>
</template>

<style lang="scss">
@use 'text';

.app-navbar {
	view-transition-name: app-navbar;
	font-size: 1.2rem;
	display: flex;
	align-items: center;
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
	.app-navbar {
		padding: 1em var(--content-padding);

		&__item {
			min-width: auto;
		}

		&__link {
			flex-direction: row;
			gap: 0.6em;

			&:hover,
			&:focus-visible {
				.app-navbar__label {
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
