<script lang="ts" setup>
definePageMeta({
	title: 'Dallas Hoffman',
	subtitle: 'Web Application Developer in Orlando, FL',
});

const currentYear = new Date().getFullYear();
</script>

<template>
	<div class="page-about">
		<nuxt-layout>
			<template #hero>
				<animation-triangle-snakes></animation-triangle-snakes>
			</template>
			<template #header>
				<about-social-links></about-social-links>
			</template>
			<section class="page-about__section">
				<h2>About Me</h2>
				<p class="page-about__about-me">
					Skilled at learning new concepts quickly, planning ahead, and creative
					thinking, I am a self-starter that loves to stay up to date on the
					newest technologies and put them to use. I have been working in web
					programming for over {{ currentYear - 2017 }} years, learning,
					building, and competing all the way. I am especially experienced with
					JavaScript/TypeScript and developing interactive and user-friendly
					interfaces.
				</p>
			</section>
			<section class="page-about__section">
				<h2>Experience</h2>
				<about-experience-cards></about-experience-cards>
			</section>
			<section class="page-about__section">
				<h2>Tools I Love</h2>
				<about-favorite-tools></about-favorite-tools>
			</section>
		</nuxt-layout>
	</div>
</template>

<style lang="scss">
.page-about {
	&__section {
		margin-bottom: 2rem;

		& > h2 {
			text-align: center;
			margin-bottom: 0.5rem;
		}
	}

	&__about-me {
		text-align: center;
	}

	.about-favorite-tools {
		margin: 0 calc(var(--content-padding) * -1);
	}
}
</style>
