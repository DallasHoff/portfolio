import type { Photo } from '~/data/photos';

export function usePhotoRatio(
	photo: MaybeRefOrGetter<Photo | null | undefined>,
) {
	const photoRatioX = computed<number>(() => toValue(photo)?.ratio[0] ?? 1);
	const photoRatioY = computed<number>(() => toValue(photo)?.ratio[1] ?? 1);

	return {
		photoRatioX,
		photoRatioY,
	};
}
