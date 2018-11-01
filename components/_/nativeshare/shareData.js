/* eslint-disable */
import {
  noop,
  getContentFromDescTag,
  getHrefFromIconTag,
  getTitleFromTitleTag
} from './utils';

export default {
  link: typeof location !== 'undefined' ? location.href : '',
  title: getTitleFromTitleTag(),
  desc: getContentFromDescTag(),
  icon: getHrefFromIconTag(),
  from: '',
  success: noop,
  fail: noop,
  trigger: noop
};
