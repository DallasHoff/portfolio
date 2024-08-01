<script lang="ts" setup>
usePageMeta({
	title: 'Dallas Hoffman',
	subtitle: 'Web Application Developer in Orlando, FL',
});

const { data: socialLinks } = await useContentFromPath('/about/social-links');
const { data: aboutMe } = await useContentFromPath('/about/about-me');
const { data: experience } = await useContentFromPath('/about/experience');
const { data: favoriteTools } = await useContentFromPath(
	'/about/favorite-tools',
);
</script>

<template>
	<div class="page-about">
		<nuxt-layout>
			<template #hero>
				<animation-triangle-snakes></animation-triangle-snakes>
			</template>
			<template #header>
				<about-social-links
					v-if="socialLinks"
					:links="socialLinks.links"
				></about-social-links>
			</template>
			<section v-if="aboutMe" class="page-about__section">
				<h2>About Me</h2>
				<content-renderer
					:value="aboutMe"
					class="page-about__about-me"
				></content-renderer>
			</section>
			<section v-if="favoriteTools" class="page-about__section">
				<h2>Tools I Love</h2>
				<about-favorite-tools
					:tools="favoriteTools.tools"
				></about-favorite-tools>
			</section>
			<section v-if="experience" class="page-about__section">
				<h2>Experience</h2>
				<div class="page-about__experience">
					<about-experience-card
						v-for="card of experience.career"
						v-bind="card"
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
