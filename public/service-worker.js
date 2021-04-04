/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/6.1.1/workbox-sw.js'
);

/*
 * Use this to toggle workbox logs on and off
 * in localhost evironment as they can be quite
 * obnoxious.
 */
workbox.setConfig({ debug: false });

// Custom precaching
// Include offline.html in the manifest
workbox.precaching.precacheAndRoute([
  { url: '/index.html', revision: null },
  { url: '/offline.html', revision: null },
]);

workbox.recipes.pageCache();

workbox.recipes.googleFontsCache();

workbox.recipes.staticResourceCache();

workbox.recipes.imageCache();

workbox.recipes.offlineFallback();
