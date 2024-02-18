<script setup lang="ts">
defineProps({
	links: {
		type: Array as PropType<{ label: string; icon: string; url: string }[]>,
		required: true,
	},
});
</script>

<template>
	<ul class="about-social-links">
		<li v-for="link in links">
			<nuxt-link
				:aria-label="link.label"
				:to="link.url"
				class="about-social-links__link"
			>
				<fa-icon :icon="link.icon"></fa-icon>
			</nuxt-link>
		</li>
	</ul>
</template>

<style lang="scss">
@use 'buttons';

.about-social-links {
	font-size: 1.2rem;
	list-style-type: none;
	display: flex;
	justify-content: center;
	gap: 1.2em;

	&__link {
		@include buttons.circle-button;
	}
}
</style>
