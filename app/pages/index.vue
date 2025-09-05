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
				<animation-triangle-snakes />
			</template>
			<template #header>
				<about-social-links :links="socialLinks" />
			</template>
			<app-flex column :gap="5">
				<section>
					<h2>About Me</h2>
					<about-me-text />
				</section>
				<section>
					<h2>Tools I Love</h2>
					<app-content-bleed>
						<about-favorite-tools :tools="favoriteTools" />
					</app-content-bleed>
				</section>
				<section>
					<h2>Experience</h2>
					<app-flex column :gap="3">
						<about-experience-card
							v-for="experience of careerExperience"
							:info="experience"
						></about-experience-card>
					</app-flex>
				</section>
				<section>
					<about-site-source />
				</section>
			</app-flex>
		</nuxt-layout>
	</div>
</template>

<style scoped lang="scss">
.page-about {
	h2 {
		text-align: center;
		margin-bottom: 1rem;
	}
}
</style>
