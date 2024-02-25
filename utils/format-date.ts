export function formatDate(
	dateStr: string,
	dateStyle: 'short' | 'full' | 'long' | 'medium' = 'short',
) {
	const date = new Date(dateStr + 'T00:00:00.000-05:00');
	const formatter = new Intl.DateTimeFormat(undefined, { dateStyle });
	return formatter.format(date);
}
