export function isInViewPort(el) {
	let rect = el.getBoundingClientRect()
	return rect.top >= window.innerHeight || document.documentElement.clientHeight || rect.bottom <= 0
}

export function isInView(element) {
	const viewWidth = window.innerWidth || document.documentElement.clientWidth
	const viewHeight = window.innerHeight || document.documentElement.clientHeight
	const { top, right, bottom, left } = element.getBoundingClientRect()

	return top >= 0 && left >= 0 && right <= viewWidth && bottom <= viewHeight
}
