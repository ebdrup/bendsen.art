// the way to use this script is to change the "src" attribute of any iframe or script you want to defer loading to an attribute called "data-src" instead
// also for iframes you can add the css class "blank", that will leave a blank placeholde until it's loaded, so the screen doesn't jump when it's loaded
if (window.addEventListener) {
  // W3C standard
  window.addEventListener('load', defer, false);
} else if (window.attachEvent) {
  // Microsoft
  window.attachEvent('onload', defer);
}
function defer() {
  if (
    (location.hostname === 'localhost' || location.hostname === '127.0.0.1') &&
    URLSearchParams &&
    new URLSearchParams(window.location.search).get('defer') === 'false'
  ) {
    return;
  }
  setTimeout(function () {
    load(document.getElementsByTagName('iframe'));
    // load(document.getElementsByTagName('script'));
  }, 2000);

  function load(items) {
    for (var i = 0; i < items.length; i++) {
      if (items[i].getAttribute('data-src')) {
        items[i].setAttribute('src', items[i].getAttribute('data-src'));
        items[i].className = items[i].className.replace('blank', '');
      }
    }
  }
}
