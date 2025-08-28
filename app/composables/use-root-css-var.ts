export default function (varName: string): string {
	if (
		import.meta.client &&
		window?.getComputedStyle &&
		document?.documentElement
	) {
		return (
			window
				.getComputedStyle(document.documentElement)
				.getPropertyValue(varName) ?? ''
		);
	}

	return '';
}
