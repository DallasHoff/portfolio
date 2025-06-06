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
		return `/photos/${album.slug}/${_kebabCase(photo.title)}`;
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

	return {
		album,
		getPhotoSrc,
		getPhotoPath,
		getPhotoId,
		coverPhotoPath,
		routePhoto,
	};
}
