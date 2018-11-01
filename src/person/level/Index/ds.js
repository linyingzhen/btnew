/**
 * const prefixCls = 'style-129479';
 * const images = '/static/images/src/person/level/Index';
 * @Author: czy0729
 * @Date: 2018-10-25 17:10:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-25 17:35:18
 * @Path bt_mb_new /src/person/level/Index/ds.js
 */
import Utils from '@utils';

export const images = Utils.cdn('/static/images/src/person/level/Index');
export const tabsDS = [{ title: '用户等级' }, { title: '积分记录' }];
export const taskDS = [
  {
    label: '每日签到',
    desc: '随机加5-10分',
    icon: 'sign-fill',
    style: {
      background: `linear-gradient(
        135deg,
        rgba(255, 205, 162, 1) 0%,
        rgba(255, 158, 105, 1) 100%
      )`
    },
    href: '/event/sign',
    btn: '去签到'
  },
  {
    label: '发现发布图文、视频',
    desc: '加1分，10个赞加1分，精选加20分',
    icon: 'discovery-fill',
    style: {
      background: `linear-gradient(
        135deg,
        rgba(177, 222, 177, 1) 0%,
        rgba(111, 189, 118, 1) 100%
      )`
    },
    href: '/discovery',
    btn: '去发布'
  },
  {
    label: '社区发布帖子',
    desc: '加5分',
    icon: 'bbs-fill',
    style: {
      background: `linear-gradient(
        135deg,
        rgba(141, 197, 252, 1) 0%,
        rgba(84, 147, 247, 1) 100%
      )`
    },
    href: '/bbs',
    btn: '去发帖'
  },
  {
    label: '回复发现、帖子',
    desc: '1次加1分',
    icon: 'comment-fill',
    style: {
      background: `linear-gradient(
        135deg,
        rgba(168, 181, 255, 1) 0%,
        rgba(111, 126, 255, 1) 100%
      )`
    },
    href: '/bbs',
    btn: '去回复'
  }
];
