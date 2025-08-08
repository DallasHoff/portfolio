import { photosRoot, type Album, type Photo } from '~/data/photos';

export async function usePhotoAlbum() {
	const route = useRoute();
	const albumSlug = route.params.album;
	const photoSlug = route.params.photo;

	const data = await import(`~/data/photos/albums/${albumSlug}.ts`);
	const album = data.album as Album;

	const getPhotoSrc = (photo: Photo) => {
		return `${photosRoot}/${album.slug}/${photo.path}`;
	};

	const getPhotoPath = (photo: Photo) => {
		return `/photos/${album.slug}/${_kebabCase(photo.title)}/`;
	};

	const getPhotoId = (photo: Photo) => {
		return `photo--${album.slug}--${_kebabCase(photo.title)}`;
	};

	const coverPhotoPath = computed(() => {
		return `${photosRoot}/${album.slug}/${album.coverPhotoPath}`;
	});

	const routePhoto = computed(() => {
		if (!photoSlug) return null;

		const photo = album.photos.find(
			(photo) => _kebabCase(photo.title) === photoSlug,
		);

		return photo ?? null;
	});

	const routePhotoIndex = computed(() => {
		return album.photos.findIndex((photo) => photo === routePhoto.value);
	});
	const routePhotoRatioX = computed(() => routePhoto.value?.ratio[0] ?? 1);
	const routePhotoRatioY = computed(() => routePhoto.value?.ratio[1] ?? 1);

	const prevPhotoPath = computed(() => {
		const prevPhoto = album.photos[routePhotoIndex.value - 1];
		const lastPhoto = album.photos[album.photos.length - 1];
		const photo = prevPhoto ?? lastPhoto;

		if (!photo) {
			throw new Error('No photo found');
		}

		return getPhotoPath(photo);
	});
	const nextPhotoPath = computed(() => {
		const nextPhoto = album.photos[routePhotoIndex.value + 1];
		const firstPhoto = album.photos[0];
		const photo = nextPhoto ?? firstPhoto;

		if (!photo) {
			throw new Error('No photo found');
		}

		return getPhotoPath(photo);
	});

	return {
		album,
		getPhotoSrc,
		getPhotoPath,
		getPhotoId,
		coverPhotoPath,
		routePhoto,
		routePhotoIndex,
		routePhotoRatioX,
		routePhotoRatioY,
		prevPhotoPath,
		nextPhotoPath,
	};
}
