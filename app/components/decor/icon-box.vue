<script setup lang="ts">
import { prominent } from 'color.js';

const props = defineProps({
	iconSrc: { type: String, required: true },
	label: { type: String, default: '' },
	scale: { type: Number, default: 1 },
	useIconColors: { type: Boolean, default: false },
});

const iconSize = computed<number>(() => props.scale * 32);
const iconColor1 = ref<string | null>(null);
const iconColor2 = ref<string | null>(null);
const iconColor3 = ref<string | null>(null);
const colorsReady = ref<boolean>(false);

onMounted(async () => {
	if (props.useIconColors) {
		const prominentOutput = await prominent(props.iconSrc, {
			amount: 4,
			group: 40,
		});

		let colors: [number, number, number][] = [];
		for (let color of prominentOutput) {
			if (Array.isArray(color) && !color.every((c) => c < 100)) {
				colors.push(color);
			}
		}
		const [color1, color2, color3] = colors;

		function tupleToColor(rgbTuple?: [number, number, number]) {
			return rgbTuple ? `rgb(${rgbTuple.join(' ')})` : null;
		}

		iconColor1.value = tupleToColor(color1);
		iconColor2.value = tupleToColor(color2 ?? color1);
		iconColor3.value = tupleToColor(color3 ?? color1);
		colorsReady.value = true;
	}
});
</script>

<template>
	<div class="decor-icon-box">
		<figure
			class="decor-icon-box__figure"
			:class="{ 'decor-icon-box__figure--colors-ready': colorsReady }"
		>
			<nuxt-img
				:src="iconSrc"
				alt=""
				:width="iconSize"
				:height="iconSize"
				class="decor-icon-box__icon"
			></nuxt-img>
			<figcaption class="decor-icon-box__caption">
				{{ label }}
			</figcaption>
		</figure>
	</div>
</template>

<style lang="scss">
@use 'cards';

.decor-icon-box {
	container-type: inline-size;
	width: calc(v-bind(scale) * 5rem);
	font-size: calc(v-bind(scale) * 1rem);

	&__figure {
		@include cards.glowy-card;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding: 15cqw;

		&::after {
			--icon-color-1: v-bind(iconColor1);
			--icon-color-2: v-bind(iconColor2);
			--icon-color-3: v-bind(iconColor3);
			background: conic-gradient(
				var(--icon-color-1, var(--accent-color-a2)) 0deg,
				var(--icon-color-2, var(--accent-color-b2)) 110deg,
				var(--icon-color-3, var(--accent-color-c2)) 220deg,
				var(--icon-color-2, var(--accent-color-b2)) 310deg,
				var(--icon-color-1, var(--accent-color-a2)) 360deg
			);
		}

		&::before,
		&::after {
			transition: opacity 600ms;
		}

		&--colors-ready {
			&::before {
				opacity: 0;
			}

			&::after {
				opacity: 1;
			}
		}
	}

	&__icon {
		display: block;
		width: 40cqw;
		height: auto;
		aspect-ratio: 1 / 1;
		margin: 0 auto 0.25em;
	}

	&__caption {
		font-size: 0.6em;
		line-height: 1.25em;
		text-align: center;
	}
}
</style>
