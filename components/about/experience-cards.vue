<script setup lang="ts">
const experience: {
	company: string;
	title: string;
	years: string;
	description: string;
}[] = [
	{
		company: 'Applied Research Associates',
		title: 'Junior Software Engineer',
		years: '2021 - Present',
		description:
			'Building enterprise Angular web applications with modern web tooling, helping to design and implement user interfaces and systems to accept and process complex user data.',
	},
	{
		company: 'Southern Automation, Logistics & Technology',
		title: 'Software Development Intern',
		years: '2021',
		description:
			'Interned working on a medical practice management system built with ASP.NET, improving the frontend interface, modifying SQL procedures, and expanding and debugging C# scripts.',
	},
	{
		company: 'Freelance',
		title: 'Freelance Web Developer',
		years: '2018 - 2020',
		description:
			'Started out building promotional websites for small businesses.',
	},
];
</script>

<template>
	<div class="about-experience-cards">
		<div v-for="exp in experience" class="about-experience-cards__card">
			<div class="about-experience-cards__years">{{ exp.years }}</div>
			<h3 class="about-experience-cards__company">{{ exp.company }}</h3>
			<div class="about-experience-cards__title">{{ exp.title }}</div>
			<p class="about-experience-cards__description">{{ exp.description }}</p>
		</div>
	</div>
</template>

<style lang="scss">
@use 'cards';

.about-experience-cards {
	font-size: 1rem;
	display: flex;
	flex-direction: column;
	gap: 1em;

	&__card {
		@include cards.solid-card;
		--card-glow-color: transparent;
		padding: 1.2rem 1.8rem;
		background-image: radial-gradient(
			circle at 90% 100%,
			color-mix(in srgb, var(--card-glow-color) 50%, transparent) 0%,
			transparent 8em
		);

		&:nth-child(3n + 1) {
			--card-glow-color: var(--accent-color-a3);
		}

		&:nth-child(3n + 2) {
			--card-glow-color: var(--accent-color-b3);
		}

		&:nth-child(3n + 3) {
			--card-glow-color: var(--accent-color-c3);
		}
	}

	&__years {
		float: right;
		line-height: 1.5;
		margin-left: 1.5em;
		margin-bottom: 1em;
	}

	&__company {
		font-size: 1.1em;
		line-height: 1.4;
		margin-bottom: 0.35em;
	}

	&__title {
		font-size: 0.95em;
		line-height: 1.4;
		margin-bottom: 0.5em;
		color: var(--text-color-0);
	}

	&__description {
		font-size: 0.8em;
	}
}
</style>
