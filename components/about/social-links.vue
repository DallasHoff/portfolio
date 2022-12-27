<script setup lang="ts">
const links: { label: string; icon: string; url: string }[] = [
	{
		label: 'My LinkedIn Profile',
		icon: 'fa-brands fa-linkedin',
		url: 'https://www.linkedin.com/in/dallas-hoffman/',
	},
	{
		label: 'My GitHub Profile',
		icon: 'fa-brands fa-github',
		url: 'https://github.com/DallasHoff',
	},
	{
		label: 'Email Me',
		icon: 'fa-light fa-envelope',
		url: 'mailto:contact@dallashoffman.com',
	},
];
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
