/**
 * const prefixCls = 'style-239474';
 * const images = '/static/images/src/index/Sign';
 * @Author: cwz0525
 * @Date: 2018-07-02 10:00:49
 * @Last Modified by: cwz0525
 * @Last Modified time: 2018-07-09 11:46:19
 * @Path m.benting.com.cn /src/index/Sign/ds.js
 */
import Utils from '@utils';

export const getMonth = m => {
  const mounths = [
    '一',
    '二',
    '三',
    '四',
    '五',
    '六',
    '七',
    '八',
    '九',
    '十',
    '十一',
    '十二'
  ];
  return mounths[m];
};

export const getDays = m => {
  const d = new Date();
  let n = 31;
  switch (m) {
    case 4:
    case 6:
    case 9:
    case 11:
      n = 30;
      break;
    case 2:
      if ((d % 4 == 0 && d % 100 != 0) || d % 400 == 0) {
        n = 28;
      } else {
        n = 29;
      }
      break;
    default:
      break;
  }
  const dayArr = [];
  for (let index = 1; index < n + 1;) {
    if (index < 10) {
      dayArr.push(`0${index}`);
    } else {
      dayArr.push(index);
    }
    index += 1;
  }
  return dayArr;
};

export const images = Utils.cdn('/static/images/src/index/Sign');
