import { album as southAfrica2025 } from './albums/2025-south-africa';
import { album as dallasTexas2024 } from './albums/2024-dallas-texas';
import { album as clashFest2023 } from './albums/2023-clash-fest';
import { album as hayHouse2019 } from './albums/2019-hay-house';
import { album as fortMyers2019 } from './albums/2019-fort-myers';
import { album as washingtonDc2021 } from './albums/2021-washington-dc';
import { album as clashFest2025 } from './albums/2025-clash-fest';
import { album as ships2017 } from './albums/2017-ships';
import { album as indianapolis2017 } from './albums/2017-indianapolis';
import { album as anaheim2017 } from './albums/2017-anaheim';
import { album as disneyWorld2020 } from './albums/2020-disney-world';
import { album as leuGardens2025 } from './albums/2025-leu-gardens';
import { album as lakeEola2025 } from './albums/2025-lake-eola';

export const albums = [
	leuGardens2025,
	clashFest2025,
	lakeEola2025,
	southAfrica2025,
	dallasTexas2024,
	clashFest2023,
	washingtonDc2021,
	disneyWorld2020,
	fortMyers2019,
	hayHouse2019,
	anaheim2017,
	indianapolis2017,
	ships2017,
];

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
