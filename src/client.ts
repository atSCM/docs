import * as sapper from '@sapper/app';
import { init as initAnalytics } from './lib/analytics';
import { analyticsTrackingId } from './config';

initAnalytics(analyticsTrackingId);

sapper.start({
  target: document.querySelector('#sapper'),
});
