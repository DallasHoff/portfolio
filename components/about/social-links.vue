<template>
	<ul class="about-social-links">
		<li>
			<nuxt-link
				aria-label="My LinkedIn Profile"
				to="https://www.linkedin.com/in/dallas-hoffman/"
				class="about-social-links__link"
			>
				<fa-icon icon="fa-brands fa-linkedin"></fa-icon>
			</nuxt-link>
		</li>
		<li>
			<nuxt-link
				aria-label="My GitHub Profile"
				to="https://github.com/DallasHoff"
				class="about-social-links__link"
			>
				<fa-icon icon="fa-brands fa-github"></fa-icon>
			</nuxt-link>
		</li>
		<li>
			<nuxt-link
				aria-label="Email Me"
				to="mailto:contact@dallashoffman.com"
				class="about-social-links__link"
			>
				<fa-icon icon="fa-light fa-envelope"></fa-icon>
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
