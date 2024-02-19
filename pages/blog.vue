<script lang="ts" setup>
const pageMeta = useState<PageMeta>('page-meta');
pageMeta.value = {
	title: 'Blog',
	subtitle: 'By Dallas Hoffman',
};
</script>

<template>
	<div class="page-blog">
		<nuxt-layout>
			<template #hero>
				<animation-spinning-arcs></animation-spinning-arcs>
			</template>
			<p>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi molestie
				nibh nunc, id tempor turpis mollis quis. Suspendisse posuere ipsum
				dolor. Morbi velit tellus, accumsan in pharetra non, gravida quis augue.
				Quisque ornare sapien ullamcorper, rhoncus sapien sit amet, eleifend
				erat.
			</p>
			<hr />
			<p>
				Praesent laoreet diam erat, vitae vulputate lectus pharetra ac. Proin
				erat mauris, tempor non arcu vel, interdum tempor magna. Sed fringilla
				leo ante, a feugiat augue euismod nec. Vestibulum ante ipsum primis in
				faucibus orci luctus et ultrices posuere cubilia curae; Etiam
				ullamcorper hendrerit lectus, sed pellentesque metus gravida nec.
			</p>
			<p>
				Aliquam sed interdum nunc, eu hendrerit ligula. Morbi at placerat felis.
				Duis semper elit eget consequat sollicitudin. Curabitur auctor est
				vulputate metus imperdiet molestie. Vivamus ut accumsan tortor. Nullam
				vehicula lectus nec augue luctus pretium.
			</p>
			<p>
				Morbi molestie nibh nunc, id tempor turpis mollis quis. Suspendisse
				posuere ipsum dolor. Morbi velit tellus, accumsan in pharetra non,
				gravida quis augue. Quisque ornare sapien ullamcorper, rhoncus sapien
				sit amet, eleifend erat. Nullam porta lacus et odio porttitor, sit amet
				lacinia felis facilisis. Quisque luctus ut eros sed porttitor. Nullam id
				mauris aliquet, dignissim magna non, bibendum turpis.
			</p>
			<hr />
			<p>
				Etiam quis congue felis. Suspendisse a tellus ac justo tempus ultricies
				volutpat et lacus. Proin molestie sem eget eros viverra laoreet. Aenean
				pulvinar laoreet convallis.
			</p>
			<p>
				Quisque lacus velit, maximus sed tellus ut, aliquam semper ante. Morbi
				maximus a est non accumsan. Vestibulum vitae erat id elit eleifend
				sollicitudin ac id est. Etiam quis congue felis. Suspendisse a tellus ac
				justo tempus ultricies volutpat et lacus. Proin molestie sem eget eros
				viverra laoreet.
			</p>
		</nuxt-layout>
	</div>
</template>
