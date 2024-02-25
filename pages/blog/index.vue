<script lang="ts" setup>
usePageMeta({
	title: 'Blog',
	subtitle: 'By Dallas Hoffman',
});

const { data: articles } = await useAsyncData(() => {
	return queryContent('blog').sort({ published: -1 }).without('body').find();
});
</script>

<template>
	<div class="page-blog">
		<nuxt-layout>
			<template #hero>
				<animation-spinning-arcs></animation-spinning-arcs>
			</template>
			<div class="page-blog__articles">
				<app-article-card
					v-for="article of articles"
					:path="article._path"
					:title="article.title"
					:subtitle="formatDate(article.published, 'long')"
					:description="article.description"
					:image="article.hero"
				></app-article-card>
			</div>
			<p class="page-blog__soon">More soon&hellip;</p>
		</nuxt-layout>
	</div>
</template>

<style lang="scss">
.page-blog {
	&__articles {
		display: flex;
		flex-direction: column;
		gap: 1em;
	}

	&__soon {
		font-size: 1.2em;
		text-align: center;
		margin-top: 2rem;
	}
}
</style>
