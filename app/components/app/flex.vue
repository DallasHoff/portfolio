<script setup lang="ts">
const props = defineProps({
	column: { type: Boolean, default: false },
	wrap: { type: Boolean, default: false },
	gap: {
		type: [String, Number, Array] as PropType<
			string | number | [string | number, string | number]
		>,
		default: 0,
	},
});

const directionVal = computed(() => (props.column ? 'column' : 'row'));
const wrapVal = computed(() => (props.wrap ? 'wrap' : 'nowrap'));
const gapVal = computed(() => {
	return Array.isArray(props.gap)
		? [getGapVal(props.gap[0]), getGapVal(props.gap[1])].join(' ')
		: getGapVal(props.gap);
});

function getGapVal(gap: string | number) {
	return typeof gap === 'number'
		? ([0, 0.25, 0.5, 1, 1.5, 3][Math.round(gap)] ?? 0) + 'rem'
		: gap;
}
</script>

<template>
	<div class="app-flex">
		<slot></slot>
	</div>
</template>

<style scoped lang="scss">
.app-flex {
	display: flex;
	flex-direction: v-bind(directionVal);
	flex-wrap: v-bind(wrapVal);
	gap: v-bind(gapVal);
}
</style>
