<script lang="ts" setup>
definePageMeta({
	title: 'Dallas Hoffman',
	subtitle: 'Web Application Developer in Orlando, FL',
});

const yearsExperience = new Date().getFullYear() - 2017;
const { data: socialLinks } = await useAsyncData(() => {
	return queryContent('/about/social-links').findOne();
});
const { data: aboutMe } = await useAsyncData(() => {
	return queryContent('/about/about-me').findOne();
});
const { data: experience } = await useAsyncData(() => {
	return queryContent('/about/experience').findOne();
});
const { data: favoriteTools } = await useAsyncData(() => {
	return queryContent('/about/favorite-tools').findOne();
});
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
					:data="{ yearsExperience }"
					class="page-about__about-me"
				></content-renderer>
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
			<section v-if="favoriteTools" class="page-about__section">
				<h2>Tools I Love</h2>
				<about-favorite-tools
					:tools="favoriteTools.tools"
				></about-favorite-tools>
			</section>
			<section v-if="experience" class="page-about__section">
				<h2>Education</h2>
				<div class="page-about__experience">
					<about-experience-card
						v-for="card of experience.education"
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
		margin-bottom: 2rem;

		& > h2 {
			text-align: center;
			margin-bottom: 0.5rem;
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
