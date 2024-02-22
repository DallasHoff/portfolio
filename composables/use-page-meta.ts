type PageMeta = {
	title?: string;
	subtitle?: string;
	description?: string;
};

export function usePageMeta(data?: PageMeta) {
	const pageMeta = useState<PageMeta>('page-meta', () => ({}));

	if (data) {
		pageMeta.value = data;
	}

	return pageMeta;
}
