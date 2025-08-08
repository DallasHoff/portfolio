<script lang="ts" setup>
usePageMeta({
	title: 'Projects',
	subtitle: 'By Dallas Hoffman',
});
</script>

<template>
	<div class="page-projects">
		<nuxt-layout>
			<template #hero>
				<animation-game-of-life />
			</template>
			<p class="page-projects__soon">More soon&hellip;</p>
		</nuxt-layout>
	</div>
</template>

<style lang="scss">
.page-projects {
	&__soon {
		font-size: 1.2em;
		text-align: center;
		margin-top: 2rem;
	}
}
</style>
