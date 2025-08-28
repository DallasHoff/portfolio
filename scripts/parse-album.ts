import path from 'path';
import fs from 'fs/promises';
import { imageSizeFromFile } from 'image-size/fromFile';
import { format } from 'prettier';
import prettierConfig from '../.prettierrc.json';
import type { Album } from '../app/data/photos';

/**
 * Parse a directory of images to create the start of an album configuration file.
 * Example: `npx tsx ./scripts/parse-album.ts ./public/images/photos/2025-south-africa`
 */

// Check arguments
const [_exe, _file, basePath] = process.argv;

if (!basePath) {
	console.log(
		'Specify the base directory path where the album images are stored.',
	);
	process.exit(1);
}

const albumSlug = path.basename(basePath);
const basePathAbsolute = path.resolve(basePath);
const imgPaths: string[] = [];

// Initialize Album object to build
const album: Album = {
	title: '',
	subtitle: '',
	slug: albumSlug,
	coverPhotoPath: '',
	photos: [],
};

// Get the paths of all the photos
async function walk(currentDir: string) {
	const entries = await fs.readdir(currentDir, { withFileTypes: true });

	for (let entry of entries) {
		const entryPathAbsolute = path.join(currentDir, entry.name);
		const entryPath = path.relative(basePathAbsolute, entryPathAbsolute);

		if (entry.isDirectory()) {
			await walk(entryPathAbsolute);
		} else if (entry.isFile() && !entry.name.startsWith('.')) {
			imgPaths.push(entryPath);
		}
	}
}
await walk(basePathAbsolute);

function gcd(a: number, b: number): number {
	a = Math.abs(a);
	b = Math.abs(b);

	while (b !== 0) {
		const r = b;
		b = a % b;
		a = r;
	}

	return a;
}

function ratio(a: number, b: number): [number, number] {
	const d = gcd(a, b);
	return [a / d, b / d];
}

// Get photo dimensions and prepare photo objects
for (let imgPath of imgPaths) {
	const imgPathFull = path.join(basePath, imgPath);
	const dimensions = await imageSizeFromFile(imgPathFull);

	album.photos.push({
		title: imgPath.split('.')[0] ?? '',
		path: imgPath,
		width: dimensions.width,
		height: dimensions.height,
		ratio: ratio(dimensions.width, dimensions.height),
	});
}

// Create album file
const albumFile = `
import type { Album } from '..';\n
export const album: Album = ${JSON.stringify(album)};
`;
// @ts-ignore
const formattedAlbumFile = await format(albumFile, {
	...prettierConfig,
	parser: 'typescript',
});

// Write album file
const albumFilePath = path.join(
	basePathAbsolute,
	`../../../../data/photos/albums/${albumSlug}.ts`,
);
await fs.writeFile(albumFilePath, formattedAlbumFile);

console.log(`Success! Wrote album configuration to: ${albumFilePath}`);
