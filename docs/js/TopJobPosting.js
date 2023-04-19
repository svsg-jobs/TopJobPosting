// Hide Header on scroll down
// and reveal on scroll up
let didScroll;
let lastScrollTop = 0;
const delta = 50;
const header = document.querySelector('body > header');
const header_h = header.offsetHeight;

window.addEventListener('scroll', function(event) {
	didScroll = true;
});

setInterval(function() {
	if (didScroll) {
		hasScrolled();
		didScroll = false;
	}
}, 250 );

function hasScrolled() {
	const st = window.scrollY;

	// Make sure they scroll more than delta
	if (Math.abs(lastScrollTop - st) <= delta) return;

	// If they scrolled down and are past the navbar prevent to see header_space "behind" the navbar.
	if (st > lastScrollTop && st > header_h) {
		// Scroll Down
		header.style.top = `-${header_h}px`;
	} else {
		// Scroll Up
		if (st + window.innerHeight < document.documentElement.scrollHeight) {
			header.style.top = '0px';
		}
	}
	lastScrollTop = st;
}
