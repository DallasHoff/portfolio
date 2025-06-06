<script setup lang="ts">
import { navbarLinks } from '~/data/navbar-links';
</script>

<template>
	<div class="layout-empty">
		<app-navbar :links="navbarLinks"></app-navbar>
		<main class="layout-empty__main">
			<slot></slot>
		</main>
	</div>
</template>
