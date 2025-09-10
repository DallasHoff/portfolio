import { album as southAfrica2025 } from './albums/2025-south-africa';
import { album as dallasTexas2024 } from './albums/2024-dallas-texas';
import { album as clashFest2023 } from './albums/2023-clash-fest';

export const albums = [southAfrica2025, dallasTexas2024, clashFest2023];

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
