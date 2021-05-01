document.addEventListener('DOMContentLoaded', function () {
  const startBtn = document.getElementById('startBtn');
  startBtn.addEventListener('click', function ping() {
    chrome.runtime.sendMessage('startScroll', response => {
      // Do whatever you want, background script is ready now
      console.log(response)
      console.log("BLAH")
    });
  });
  // display scroll interval slider value
  const intervalInputElem = document.getElementById("scrollIntervalRange");
  const intervalSpanElem = document.getElementById("scrollIntervalLabel");
  intervalSpanElem.innerHTML = intervalInputElem.value;
  intervalInputElem.oninput = function () {
    intervalSpanElem.innerHTML = this.value;
  }
  // display scroll distance slider value
  const distanceInputElem = document.getElementById("scrollDistanceRange");
  const distanceSpanElem = document.getElementById("scrollDistanceLabel");
  distanceSpanElem.innerHTML = distanceInputElem.value;
  distanceInputElem.oninput = function () {
    distanceSpanElem.innerHTML = this.value;
  }
}, false);