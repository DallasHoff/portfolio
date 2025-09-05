<script lang="ts" setup>
import { albums } from '~/data/photos';

usePageMeta({
	title: 'Photos',
	subtitle: 'By Dallas Hoffman',
});
</script>

<template>
	<div class="page-photos">
		<nuxt-layout>
			<template #hero>
				<animation-spinning-arcs />
			</template>
			<photos-album-list :albums="albums"></photos-album-list>
		</nuxt-layout>
	</div>
</template>
