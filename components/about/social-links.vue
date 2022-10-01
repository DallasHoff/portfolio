<template>
	<ul class="about-social-links">
		<li>
			<nuxt-link
				aria-label="My LinkedIn Profile"
				to="https://www.linkedin.com/in/dallas-hoffman/"
				class="about-social-links__link"
			>
				<site-icon icon="fa-brands fa-linkedin"></site-icon>
			</nuxt-link>
		</li>
		<li>
			<nuxt-link
				aria-label="My GitHub Profile"
				to="https://github.com/DallasHoff"
				class="about-social-links__link"
			>
				<site-icon icon="fa-brands fa-github"></site-icon>
			</nuxt-link>
		</li>
		<li>
			<nuxt-link
				aria-label="Email Me"
				to="mailto:contact@dallashoffman.com"
				class="about-social-links__link"
			>
				<site-icon icon="fa-light fa-square-envelope"></site-icon>
			</nuxt-link>
		</li>
	</ul>
</template>

<style lang="scss">
.about-social-links {
	font-size: 1.8rem;
	list-style-type: none;
	display: flex;
	justify-content: center;
	gap: 0.8em;

	&__link {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 1.8em;
		height: 1.8em;
		line-height: 1;
		color: var(--text-color-3);
		background-color: var(--bg-color-4);
		box-shadow: var(--box-shadow-1), inset 0 0 0.2em #ffffff25;
		border-radius: 50%;

		&:hover,
		&:focus-visible {
			color: var(--text-color-1);
			background-color: var(--bg-color-5);
		}

		&:active {
			color: var(--text-color-5);
			background-color: var(--bg-color-3);
		}
	}
}
</style>
