/**
 * This is the code which will be injected into a given page...
 */

// CONFIGURATION
const interval = 5000 // ms (milliseconds) 1000ms=1s
const scrollDistance = 300 // px (pixels)
const bottomDistanceBeforeNextPage = 100;


// ----------------------------------------------
// DOM Utility Functions - https://stackoverflow.com/questions/22191576/javascript-createelement-and-setattribute
const el = (sel, par) => (par || document).querySelector(sel);
const els = (sel, par) => (par || document).querySelectorAll(sel);
const elNew = (tag, prop) => Object.assign(document.createElement(tag), prop);
const attr = (el, attr) => Object.entries(attr).forEach(([k, v]) => el.setAttribute(k, v));
const css = (el, styles) => Object.assign(el.style, styles);

// CONSTANTS
const popupId = "timmy-popup";
let isRunning = false;
let refreshId;
importFontAwesome();
const nextPageURL = getNextPageURL();

// MAIN
startScript()
document.body.onkeyup = toggleScript;

// UTILS
function importFontAwesome() {
	const fwLink = elNew("link", {
		rel: 'stylesheet',
		type: 'text/css',
		href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'
	});
  document.getElementsByTagName("head")[0].appendChild(fwLink);
}

function getNextPageURL() {
	/*
		// XPATH - does not work since Nodes are not interactable
		const xpath = "//*[contains(text(), '下一章')]";
		// XPathResult returns Node
		// https://developer.mozilla.org/en-US/docs/Web/API/XPathResult
		// https://developer.mozilla.org/en-US/docs/Web/API/Node
		let nextPageElem = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	*/
	let nextPageURL;
	// Get URL from next page button's a href
	let nextPageElem;
	const elems = document.body.getElementsByTagName("a");
	for (let i = 0; i < elems.length; i++) {
		if (elems[i].textContent.includes('下一章')) {
			nextPageElem = elems[i];
			break;
		}
	}
	if (nextPageElem) {
		console.log(`Next Chapter URL via next page button: ${nextPageElem.getAttribute('href')}`)
		return nextPageElem.getAttribute('href');
	}

	// Get URL from regex
	const currentChapURL = window.location.pathname
	const currentChapText = window.location.pathname.split('/').pop().split('.')[0];
	const currentChapId = parseInt(currentChapText, 10);
	// regex - get last chapter ID from format: "shehui/ruguomeiyoumingtian/120556.html"
	const nextChapURL = window.location.href.replace(/\/[^\/]*$/, `/${currentChapId + 1}.html`);
	console.log(`Next Chapter URL via REGEX: ${nextChapURL}`)
	return nextChapURL;
}

function toggleScript(e) {
  // detect spacebar click
	if (e.key == " " || e.code == "Space" || e.keyCode == 32) {
		if (isRunning) stopScript();
		else startScript();
    isRunning = !isRunning
  }
}

function scrollDown() {	
  console.log(`current scroll: ${window.innerHeight + window.scrollY}`)
	console.log(`buttom: ${document.body.offsetHeight - bottomDistanceBeforeNextPage}`)
	/*
	console.log(`current pageYOffset: ${window.pageYOffset}, nextPageElem pageYOffset: ${nextPageElem.offsetTop}`);
  console.log(`current scrollY: ${window.scrollY}`);
	// next page is sometimes at the TOP and the BOTTOM
	// || nextPageElem !== null && window.scrollY >= nextPageElem.offsetTo
	*/

  if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - bottomDistanceBeforeNextPage)
		window.location.href = nextPageURL;
	else window.scrollBy(0, scrollDistance);
}

function startScript() {
	console.log("Starting script")
	refreshId = setInterval(scrollDown, interval);
	showPopup();
}

function stopScript() {
	console.log("Stopping script")
	clearInterval(refreshId);
	hidePopup();
}

function showPopup() {
	const popup = elNew("div", {
		id: popupId,
		style: `
			position: fixed;
			bottom: 0;
			right: 0;
			zIndex: 1000205;
		`
	});
	const btn = elNew("button", {
		innerHTML: '<i class="fa fa-spinner fa-spin"></i> Running',
		style: `
			background-color: red;
			border: none;
			color: white;
			padding: 6px 12px;
			font-size: 16px;
		`,
		onclick: () => stopScript()
	});
	popup.appendChild(btn);
  document.body.appendChild(popup);
}

function hidePopup() {
	document.getElementById(popupId).remove();
}


// UNUSED UTILITIES
function removeAds() {
	const imgElems = document.getElementsByTagName('img');
	for (var i = 0; i < imgElems.length; i++) {
		imgElems[i].remove()
	}
	
	// Remove advertisements
	const insElems = document.getElementsByTagName('ins');
	for (var i = 0; i < insElems.length; i++) {
		insElems[i].remove()
	}

	// Remove blank space left by ads
	const adElems = document.getElementsByClassName('adsbygoogle');
	for (var i = 0; i < insElems.length; i++) {
		adElems[i].remove()
	}
}