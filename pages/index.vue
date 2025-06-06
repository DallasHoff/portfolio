<script lang="ts" setup>
import { careerExperience } from '~/data/about/experience';
import { favoriteTools } from '~/data/about/favorite-tools';
import { socialLinks } from '~/data/about/social-links';

usePageMeta({
	title: 'Dallas Hoffman',
	subtitle: 'Web Application Developer in Orlando, FL',
});
</script>

<template>
	<div class="page-about">
		<nuxt-layout>
			<template #hero>
				<animation-triangle-snakes></animation-triangle-snakes>
			</template>
			<template #header>
				<about-social-links :links="socialLinks"></about-social-links>
			</template>
			<section class="page-about__section">
				<h2>About Me</h2>
				<p class="page-about__about-me">
					Skilled at learning new concepts quickly, planning ahead, and creative
					thinking, I am a self-starter that loves to stay up to date on the
					newest technologies and put them to use. I have been working in web
					programming for over <about-years-experience /> years, learning,
					building, and competing all the way. I am especially experienced with
					JavaScript/TypeScript and developing interactive and user-friendly
					interfaces.
				</p>
			</section>
			<section class="page-about__section">
				<h2>Tools I Love</h2>
				<about-favorite-tools :tools="favoriteTools"></about-favorite-tools>
			</section>
			<section class="page-about__section">
				<h2>Experience</h2>
				<div class="page-about__experience">
					<about-experience-card
						v-for="experience of careerExperience"
						:info="experience"
					></about-experience-card>
				</div>
			</section>
			<section class="page-about__section">
				<about-site-source></about-site-source>
			</section>
		</nuxt-layout>
	</div>
</template>

<style lang="scss">
.page-about {
	&__section {
		margin-bottom: 2.5rem;

		& > h2 {
			text-align: center;
			margin-bottom: 1rem;
		}
	}

	&__about-me {
		text-align: center;
	}

	&__experience {
		display: flex;
		flex-direction: column;
		gap: 1em;
	}

	.about-favorite-tools {
		margin: 0 calc(var(--content-padding) * -1);
	}

	.about-site-source {
		margin-top: 3rem;
	}
}
</style>
