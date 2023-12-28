<script setup lang="ts">
const favoriteTools: { label: string; icon: string }[] = [
	{ label: 'VSCode', icon: 'file-type-vscode' },
	{ label: 'JavaScript', icon: 'file-type-js-official' },
	{ label: 'TypeScript', icon: 'file-type-typescript-official' },
	{ label: 'Node.js', icon: 'file-type-node' },
	{ label: 'HTML', icon: 'file-type-html' },
	{ label: 'CSS', icon: 'file-type-css' },
	{ label: 'SCSS', icon: 'file-type-scss2' },
	{ label: 'ESLint', icon: 'file-type-eslint' },
	{ label: 'Firebase', icon: 'file-type-firebase' },
	{ label: 'Vue', icon: 'file-type-vue' },
	{ label: 'Nuxt', icon: 'file-type-nuxt' },
	{ label: 'Vite', icon: 'file-type-vite' },
	{ label: 'Vitest', icon: 'vitest' },
	{ label: 'Pinia', icon: 'pinia' },
	{ label: 'Angular', icon: 'angular' },
	{ label: 'Lodash', icon: 'lodash' },
	{ label: 'Prettier', icon: 'file-type-prettier' },
	{ label: 'Capacitor', icon: 'file-type-capacitor' },
	{ label: 'SQLite', icon: 'sqlite' },
	{ label: 'NGINX', icon: 'file-type-nginx' },
];
const favoriteToolsGroups = _chunk(
	favoriteTools,
	Math.ceil(favoriteTools.length / 2)
);
</script>

<template>
	<div class="about-favorite-tools">
		<app-marquee
			v-for="(toolsGroup, groupIdx) in favoriteToolsGroups"
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
