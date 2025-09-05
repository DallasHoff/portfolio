<template>
	<div class="app-content-bleed">
		<slot></slot>
	</div>
</template>

<style scoped lang="scss">
.app-content-bleed {
	margin: 0 calc(var(--content-padding) * -1);
}
</style>
