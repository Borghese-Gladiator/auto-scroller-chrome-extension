// this is the code which will be injected into a given page...

// scrolls page
alert('hello ' + document.location.href);
const refreshId = setInterval(() => {
  window.scrollBy(0, 100);
  if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
    // if bottom is hit
    clearInterval(refreshId); // stop interval

    // get last chapter ID from format: "shehui/ruguomeiyoumingtian/120556.html"
    const currentChapText = window.location.pathname.split('/').pop().split('.')[0];
    const currentChapId = parseInt(currentChapText, 10);
    const nextChapURL = window.location.href.replace(/\/[^\/]*$/, `/${currentChapId + 1}.html`);

    // move to next chapter URL
    alert(`Next chapter: ${nextChapURL}`);
    window.location.href = nextChapURL
  }
}, 1000)