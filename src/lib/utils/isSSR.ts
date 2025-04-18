import 'server-only';

import { headers } from 'next/headers';

// For RSC navigations, it uses either `Accept: text/x-component` or `Accept: */*`,
// For SSR browsers and other clients, `Accept: text/html`
const isSSR = () =>
  !(
    headers().get('accept')?.includes('text/x-component') ||
    headers().get('accept')?.includes('*/*')
  ) || headers().get('accept')?.includes('text/html');

export default isSSR;
