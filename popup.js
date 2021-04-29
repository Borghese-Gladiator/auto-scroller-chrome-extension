document.addEventListener('DOMContentLoaded', function () {
  console.log("LOADING");
  const nextPageButton = document.getElementById('nextPageButton');
  const showSnackbarButton = document.getElementById('showSnackbar');
  nextPageButton.addEventListener('click', function () {
    chrome.tabs.update({
      url: "https://www.sitepoint.com/create-chrome-extension-10-minutes-flat/"
    })
    window.scrollTo(0, 300)
  });
  showSnackbarButton.addEventListener('click', function myFunction() {
    var x = document.getElementById("snackbar");
    x.className = "show";
    setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
  })

}, false);
/*
{
  "manifest_version": 2,
  "name": "GTmetrix Analyzer Plugin",
  "description": "This extension will analyze a page using GTmetrix",
  "version": "1.0",
  "browser_action": {
    "default_icon": {
      "16": "images/get_started16.png",
      "32": "images/get_started32.png",
      "48": "images/get_started48.png",
      "128": "images/get_started128.png"
    },
    "default_popup": "popup.html"
  },
  "permissions": [
    "activeTab",
    "tabs"
  ],
  "icons": {
    "16": "images/get_started16.png",
    "32": "images/get_started32.png",
    "48": "images/get_started48.png",
    "128": "images/get_started128.png"
  }
}


*/