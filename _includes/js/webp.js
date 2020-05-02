if (window.addEventListener) {
  // W3C standard
  window.addEventListener('load', webp, false);
} else if (window.attachEvent) {
  // Microsoft
  window.attachEvent('onload', webp);
}

function webp() {
  var elem = document.createElement('canvas');
  var hasWebp =
    !!(elem.getContext && elem.getContext('2d')) &&
    elem.toDataURL('image/webp').indexOf('data:image/webp') === 0;
  if (!hasWebp) {
    // no WebP
    var items = document.getElementsByClassName('img');
    for (var i = 0; i < items.length; i++) {
      items[i].src = items[i].src.replace('.webp', '');
    }
  }
}
