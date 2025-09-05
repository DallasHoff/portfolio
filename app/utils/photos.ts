import { kebabCase } from 'lodash-es';
import { photosRoot, type Album, type Photo } from '~/data/photos';

export function getPhotoSrc(photo: Photo, album: Album) {
	return `${photosRoot}/${album.slug}/${photo.path}`;
}

export function getPhotoPath(photo: Photo, album: Album) {
	return `/photos/${album.slug}/${kebabCase(photo.title)}/`;
}

export function getPhotoId(photo: Photo, album: Album) {
	return `photo--${album.slug}--${kebabCase(photo.title)}`;
}
