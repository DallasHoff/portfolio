export async function useContentFromPath(path: string) {
	return await useAsyncData('content:' + path, () => {
		return queryContent(path).findOne();
	});
}
