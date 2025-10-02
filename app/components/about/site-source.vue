<template>
	<div class="about-site-source">
		<fa-icon icon="fa-light fa-bracket-curly-left" size="2xl"></fa-icon>
		<p>
			This site is
			<nuxt-link
				to="https://github.com/DallasHoff/portfolio"
				v-umami="'repo-link'"
				>open source</nuxt-link
			>.
		</p>
		<fa-icon icon="fa-light fa-bracket-curly-right" size="2xl"></fa-icon>
	</div>
</template>

<style lang="scss">
.about-site-source {
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 1rem;
	text-align: center;
}
</style>
