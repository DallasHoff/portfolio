<template>
	<transition name="fade">
		<slot></slot>
	</transition>
</template>

<style lang="scss">
.fade-enter-active,
.fade-leave-active {
	transition: opacity 300ms ease;
}

.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}
</style>
