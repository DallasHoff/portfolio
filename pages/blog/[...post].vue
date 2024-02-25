<script lang="ts" setup>
const route = useRoute();
const { data: post } = await useContentFromPath(route.path);

usePageMeta({
	title: post.value?.title,
	description: post.value?.description,
});
</script>

<template>
	<div class="page-blog-post">
		<nuxt-layout>
			<template #hero>
				<img v-if="post" :src="post.hero" alt="" class="page-blog-post__hero" />
			</template>
			<template #header>
				<div class="page-blog-post__header-info">
					<div v-if="post?.published" class="page-blog-post__header-item">
						<fa-icon icon="fa-light fa-calendar-plus"></fa-icon>
						<span>
							Published
							<time :datetime="post.published">
								{{ formatDate(post.published) }}
							</time>
						</span>
					</div>
					<div v-if="post?.updated" class="page-blog-post__header-item">
						<fa-icon icon="fa-light fa-calendar-pen"></fa-icon>
						<span>
							Updated
							<time :datetime="post.updated">
								{{ formatDate(post.updated) }}
							</time>
						</span>
					</div>
				</div>
			</template>
			<content-renderer v-if="post" :value="post"></content-renderer>
		</nuxt-layout>
	</div>
</template>

<style lang="scss">
.page-blog-post {
	.layout-default__title,
	&__header-info {
		font-size: 0.9em;
	}

	&__hero {
		object-fit: cover;
		width: 100%;
		height: 100%;
	}

	&__header-info {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5em 2em;
		justify-content: center;
	}

	&__header-item {
		display: flex;
		align-items: center;
		gap: 0.5em;
	}
}
</style>
