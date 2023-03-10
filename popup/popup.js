// var app = chrome.runtime.getBackgroundPage();

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

// button runs external script
function runContentScript() {
  chrome.tabs.executeScript({
    code: `const interval = ${intervalInputElem.value}; const distance = ${distanceInputElem.value}`
  }, function () {
    chrome.tabs.executeScript({ file: 'contentScript.js' });
  });
}
document.getElementById('startBtn').addEventListener('click', runContentScript)