

function reddenPage() {
  var refreshId = setInterval(() => {
    window.scrollBy(0, 100);
    console.log("BLAH");
    // check if bottom is hit
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      // you're at the bottom of the page
      clearInterval(refreshId);
      console.log("BOTTOM");
      
      // get last chapter ID from format: "shehui/ruguomeiyoumingtian/120556.html"
      const currentChapText = window.location.pathname.split('/').pop().split('.')[0];
      console.log(currentChapText)
      const currentChapId = parseInt(currentChapText, 10);
      console.log(currentChapId + 1)
      const nextChapURL = window.location.href.replace(/\/[^\/]*$/, `/${currentChapId + 1}.html`);
      console.log(`Next URL: ${nextChapURL}`);
      
      // move to next chapter URL
      alert(`Next chapter: ${nextChapURL}`);
      window.location.href = nextChapURL
    }
  }, 1000)
  /*
  const elemArr = document.getElementsByTagName("p");
  var scrollingElement = (document.scrollingElement || document.body)
  scrollingElement.scrollTop = elemArr[2].scrollHeight;
  console.log(elemArr)


  
  if (i > elemArr.length) {
    console.log('oh no');
    // window.location.href = '...';
  }
  var scrollingElement = (document.scrollingElement || document.body);
  console.log(scrollingElement);
  // scroll to bottom
  scrollingElement.scrollTop = scrollingElement.scrollHeight;
  // scroll to top
  scrollingElement.scrollTop = 0;
  */
}

chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: reddenPage
  });
});