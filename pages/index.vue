<script lang="ts" setup>
definePageMeta({
	title: 'Dallas Hoffman',
});
</script>

<template>
	<div class="page-about">
		<nuxt-layout>
			<template #hero>
				<animation-triangle-snakes></animation-triangle-snakes>
			</template>
			<template #header>
				<about-social-links></about-social-links>
			</template>
			<p>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
				nec nulla consectetur, placerat lacus at, pharetra turpis. Integer
				ultrices justo ligula, et blandit lorem ultrices non. Aenean consequat
				ipsum et ex dapibus, ac pellentesque nunc fermentum. Curabitur mattis
				condimentum semper. Pellentesque porttitor, purus eu ornare tincidunt,
				tellus justo blandit mauris, sit amet interdum elit libero non metus.
				Mauris vitae sem at tortor auctor accumsan. Quisque ultricies, magna non
				porttitor ullamcorper, quam nulla ultricies urna, quis vulputate odio
				augue eget urna.
			</p>
			<hr />
			<p>
				Ut eu ante tortor. Donec non efficitur mi. Cras faucibus purus quis
				cursus sodales. Cras nec metus aliquet, pulvinar dui accumsan, posuere
				tortor. Aliquam sodales consequat magna et porttitor. Maecenas faucibus
				vulputate pellentesque. Class aptent taciti sociosqu ad litora torquent
				per conubia nostra, per inceptos himenaeos.
			</p>
			<p>
				Nulla facilisi. Pellentesque habitant morbi tristique senectus et netus
				et malesuada fames ac turpis egestas. Vestibulum ultrices rutrum dolor,
				nec maximus felis ullamcorper et. Phasellus ultricies lacus et porttitor
				tincidunt. Suspendisse ac neque leo. Maecenas vitae mauris ut tellus
				rutrum ullamcorper. Donec nec ullamcorper ante.
			</p>
			<p>
				Nulla sed est eu libero tempus eleifend in quis libero. Praesent lacinia
				lobortis ante ut tristique.
			</p>
		</nuxt-layout>
	</div>
</template>
