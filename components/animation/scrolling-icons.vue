<script setup lang="ts">
defineProps({
	icon: { type: String, required: true },
	iconColor: { type: String, default: '#45759c' },
	bgColor: { type: String, default: '#1b1625' },
});
</script>

<template>
	<div class="animation-scrolling-icons">
		<template v-for="_ of 12">
			<app-marquee orientation="vertical">
				<div v-for="_ of 6" class="animation-scrolling-icons__icon">
					<fa-icon :icon="icon" size="xl"></fa-icon>
				</div>
			</app-marquee>
			<app-marquee orientation="vertical" reversed>
				<div v-for="_ of 6" class="animation-scrolling-icons__icon">
					<fa-icon :icon="icon" size="xl"></fa-icon>
				</div>
			</app-marquee>
		</template>
	</div>
</template>

<style lang="scss">
.animation-scrolling-icons {
	display: flex;
	background-color: v-bind(bgColor);

	&__icon {
		margin: 0.8rem;
		color: v-bind(iconColor);
	}
}
</style>
