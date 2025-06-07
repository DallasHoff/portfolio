import { album as southAfrica2025 } from './albums/2025-south-africa';

export const albums = [southAfrica2025];

export const photosRoot = '/images/photos';

export type Album = {
	title: string;
	subtitle: string;
	slug: string;
	coverPhotoPath: string;
	photos: Photo[];
};

export type Photo = {
	title: string;
	path: string;
	width: number;
	height: number;
	ratio: [width: number, height: number];
};
