import { album as southAfrica2025 } from './albums/2025-south-africa';
import { album as dallasTexas2024 } from './albums/2024-dallas-texas';

export const albums = [southAfrica2025, dallasTexas2024];

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
