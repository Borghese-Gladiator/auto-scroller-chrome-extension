// this is the code which will be injected into a given page...
const interval = 5000 // ms (milliseconds) 1000ms=1s
const distance = 300 // px (pixels)

// spacebar plays/pauses script
let isRunning = false

addFontAwesome()

document.body.onkeyup = function (e) {
  // detect spacebar click
  if (e.keyCode === 32 || e.key === ' ') {
    if (isRunning) {
      // stop script
      clearInterval(a); // stop interval
      removeRunningIcon();
    } else {
      var a = setInterval(startScroll, interval);
      addRunningIcon();
    }
    isRunning = !isRunning
  }
}

function startScroll() {
  window.scrollBy(0, distance);
  if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
    // get last chapter ID from format: "shehui/ruguomeiyoumingtian/120556.html"
    const currentChapText = window.location.pathname.split('/').pop().split('.')[0];
    const currentChapId = parseInt(currentChapText, 10);
    const nextChapURL = window.location.href.replace(/\/[^\/]*$/, `/${currentChapId + 1}.html`);

    // move to next chapter URL
    alert(`Next chapter: ${nextChapURL}`);
    window.location.href = nextChapURL
  }
}

function addFontAwesome() {
  const linkElement = document.createElement('link');
  linkElement.setAttribute('rel', 'stylesheet');
  linkElement.setAttribute('type', 'text/css');
  linkElement.setAttribute('href', 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css');
  document.getElementsByTagName("head")[0].appendChild(linkElement);
}

function addRunningIcon() {
  // create a new div element
  const newDiv = document.createElement("button");
  newDiv.id = "bottom-right-popup"
  newDiv.style.position = "fixed";
  newDiv.style.bottom = "0";
  newDiv.style.right = "0";

  // create a new button element
  const newButton = document.createElement("button");
  newButton.style.backgroundColor = "red";
  newButton.style.border = "none";
  newButton.style.color = "white";
  newButton.style.padding = "12px 24px";
  newButton.style.fontSize = "16px";

  // set to icon
  newButton.innerHTML = '<i class="fa fa-spinner fa-spin"></i>Running'

  // add newButton to newDiv
  newDiv.appendChild(newButton)

  // add the newly created element and its content into the DOM
  document.body.appendChild(newDiv);
}

function removeRunningIcon() {
  document.getElementById("bottom-right-popup").remove();
}

// const newContent = document.createTextNode("Hi there and greetings!");
// newButton.appendChild(newContent);