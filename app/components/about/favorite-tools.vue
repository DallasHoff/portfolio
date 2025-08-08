<script setup lang="ts">
export type FavoriteTool = { label: string; icon: string };

const props = defineProps({
	tools: {
		type: Array as PropType<FavoriteTool[]>,
		required: true,
	},
});

const toolsGroups = _chunk(props.tools, Math.ceil(props.tools.length / 2));
</script>

<template>
	<div class="about-favorite-tools">
		<app-marquee
			v-for="(toolsGroup, groupIdx) in toolsGroups"
			fade-edges
			pause-on-hover
			:duration-seconds="40"
			:reversed="groupIdx % 2 === 1"
		>
			<decor-icon-box
				v-for="tool in toolsGroup"
				:icon-src="`/images/icons/${tool.icon}.svg`"
				:label="tool.label"
				:scale="0.9"
			></decor-icon-box>
		</app-marquee>
	</div>
</template>

<style lang="scss">
.about-favorite-tools {
	.decor-icon-box {
		margin: 1rem;
	}
}
</style>
