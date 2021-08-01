/**
 *
 * Asynchronously loads the component for MatchItem
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
