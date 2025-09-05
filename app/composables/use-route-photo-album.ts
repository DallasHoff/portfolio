import { kebabCase } from 'lodash-es';
import { photosRoot, type Album } from '~/data/photos';

export async function useRoutePhotoAlbum() {
	const route = useRoute();
	const albumSlug = route.params.album;
	const photoSlug = route.params.photo;

	const data = await import(`~/data/photos/albums/${albumSlug}.ts`);
	const album = data.album as Album;

	const coverPhotoPath = computed(() => {
		return `${photosRoot}/${album.slug}/${album.coverPhotoPath}`;
	});

	const photo = computed(() => {
		if (!photoSlug) return null;

		const routePhoto = album.photos.find(
			(photo) => kebabCase(photo.title) === photoSlug,
		);

		return routePhoto ?? null;
	});

	const routePhotoIndex = computed(() => {
		return album.photos.findIndex((p) => p === photo.value);
	});

	const prevPhotoPath = computed(() => {
		const prevPhoto = album.photos[routePhotoIndex.value - 1];
		const lastPhoto = album.photos[album.photos.length - 1];
		const photo = prevPhoto ?? lastPhoto;

		if (!photo) {
			throw new Error('No photo found');
		}

		return getPhotoPath(photo, album);
	});

	const nextPhotoPath = computed(() => {
		const nextPhoto = album.photos[routePhotoIndex.value + 1];
		const firstPhoto = album.photos[0];
		const photo = nextPhoto ?? firstPhoto;

		if (!photo) {
			throw new Error('No photo found');
		}

		return getPhotoPath(photo, album);
	});

	return {
		album,
		photo,
		coverPhotoPath,
		routePhotoIndex,
		prevPhotoPath,
		nextPhotoPath,
	};
}
