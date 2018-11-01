/**
 * const prefixCls = 'style-875827';
 * const images = '/static/images/common/const';
 * @Author: czy0729
 * @Date: 2018-10-15 09:50:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-15 09:56:13
 * @Path m.benting.com.cn /common/const/utils.js
 */
export function checkDeviceType() {
  if (typeof navigator === 'undefined') {
    return null;
  }

  const agent = navigator.userAgent;
  const isAndroid = /(Android)/i.test(agent);
  const isiOS = /(iPhone|iPad|iPod|iOS)/i.test(agent) && !isAndroid;

  if (isiOS) {
    return 'ios';
  }

  if (isAndroid) {
    return 'android';
  }

  return 'other';
}
