export default function (varName: string): string {
	if (process.client && window?.getComputedStyle && document?.documentElement) {
		return (
			window
				.getComputedStyle(document.documentElement)
				.getPropertyValue(varName) ?? ''
		);
	}

	return '';
}
