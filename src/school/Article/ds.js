/**
 * const prefixCls = 'style-201037';
 * const images = '/static/images/src/school/Article';
 * @Author: czy0729
 * @Date: 2018-09-07 14:58:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-09-07 14:59:42
 * @Path m.benting.com.cn /src/school/Article/ds.js
 */
import { articleBlockDS } from '../Index/ds';

export const tabsDS = articleBlockDS.map(item => ({ title: item.label }));
