type PageMeta = {
	title?: string | (string | undefined)[];
	subtitle?: string;
	description?: string;
	coverPhotoPath?: string;
};

export function usePageMeta(data?: PageMeta) {
	const pageMeta = useState<PageMeta>('page-meta', () => ({}));

	if (data) {
		pageMeta.value = data;
	}

	return pageMeta;
}

export function getPageTitle(
	pageMeta: PageMeta,
	delimiter: string,
	...additionalParts: string[]
): string {
	const pageTitleInput = pageMeta.title;
	const pageTitleSegs = Array.isArray(pageTitleInput)
		? pageTitleInput
		: [pageTitleInput];
	const titleSegs = [...pageTitleSegs, ...additionalParts];

	return titleSegs
		.filter((seg, i, segs) => !!seg && seg !== segs[i + 1])
		.join(delimiter);
}
