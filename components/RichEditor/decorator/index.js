/**
 * const prefixCls = 'style-125333';
 * const images = '/static/images/components/RichEditor/decorator';
 * @Author: czy0729
 * @Date: 2018-07-11 22:59:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-07-11 23:00:54
 * @Path m.benting.com.cn /components/RichEditor/decorator/index.js
 */
import { CompositeDecorator } from 'draft-js';
import emoji from './emoji';
import link from './link';

export default new CompositeDecorator([emoji, link]);
