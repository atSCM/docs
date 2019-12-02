/* global dataLayer */

import { append } from './dom';

export function gtag() {
  if (process.browser) {
    // eslint-disable-next-line prefer-rest-params
    dataLayer.push(arguments);
  }
}

export function trackEvent(name, data) {
  return gtag('event', name, data);
}

export function init(trackingId) {
  if (process.browser) {
    window.dataLayer = window.dataLayer || [];

    append(document.body, 'script', {
      async: true,
      src: `https://www.googletagmanager.com/gtag/js?id=${trackingId}`,
    });

    gtag('js', new Date());
    gtag('config', trackingId);
  }
}
