/**
 * const prefixCls = 'style-739508';
 * const images = '/static/images';
 * @Author: lyz0720
 * @Date: 2018-10-26 09:53:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-26 17:05:08
 * @Path bt_mb_new \src\person\btlevel\Index\ds.js.git
 */
import Utils from '@utils';

export const images = Utils.cdn('/static/images/src/person/btlevel/Index');

export const gradeData = [
  {
    id: 0,
    img: '/static/images/src/person/btlevel/Index/0.png',
    title: '初始会员',
    point: 0
  },
  {
    id: 1,
    img: '/static/images/src/person/btlevel/Index/1.png',
    title: '一星会员',
    point: 200
  },
  {
    id: 2,
    img: '/static/images/src/person/btlevel/Index/2.png',
    title: '二星会员',
    point: 600
  },
  {
    id: 3,
    img: '/static/images/src/person/btlevel/Index/3.png',
    title: '三星会员',
    point: 1200
  },
  {
    id: 4,
    img: '/static/images/src/person/btlevel/Index/4.png',
    title: '四星会员',
    point: 2000
  },
  {
    id: 5,
    img: '/static/images/src/person/btlevel/Index/5.png',
    title: '五星会员',
    point: 3000
  },
  {
    id: 6,
    img: '/static/images/src/person/btlevel/Index/6.png',
    title: '黄金会员',
    point: 4000
  },
  {
    id: 7,
    img: '/static/images/src/person/btlevel/Index/7.png',
    title: '白金会员',
    point: 6000
  },
  {
    id: 8,
    img: '/static/images/src/person/btlevel/Index/8.png',
    title: '钻石会员',
    point: 8000
  },
  {
    id: 9,
    img: '/static/images/src/person/btlevel/Index/9.png',
    title: '至尊会员',
    point: 10000
  },
  {
    id: 10,
    img: '/static/images/src/person/btlevel/Index/9.png',
    title: '至尊会员',
    point: 99999
  }
];

export const privilegeDS = [
  {
    label: '见面有礼',
    brief: '每个新用户仅一次领取机会',
    // href: '/person/welfare/meet',
    type: 'gift-fill',
    bgcolor: 'b-yellow'
  },
  {
    label: '生日尊享',
    brief: '会员生日有好礼',
    // href: '/person/welfare/birthday',
    type: 'cake-fill',
    bgcolor: 'b-coral'
  },
  {
    label: '升级尊享',
    brief: '会员升级有好礼',
    // href: '/person/welfare/rank_up',
    type: 'crown-fill',
    bgcolor: 'b-plum'
  },
  {
    label: '超爽积分',
    brief: '兑换抽奖享不停',
    // href: '/person/welfare/point',
    type: 'score-fill',
    bgcolor: 'b-blue'
  },
  {
    label: '其他特权',
    brief: '尊享特权 精彩不停',
    // href: '/person/btlevel',
    type: 'tequan-fill',
    bgcolor: 'b-cyan'
  }
];

export const getBTLevel = level => {
  switch (parseInt(level)) {
    case 1:
      return '一星会员';

    case 2:
      return '二星会员';

    case 3:
      return '三星会员';

    case 4:
      return '四星会员';

    case 5:
      return '五星会员';

    case 6:
      return '黄金会员';

    case 7:
      return '铂金会员';

    case 8:
      return '钻石会员';

    case 9:
      return '至尊会员';

    default:
      return '初始会员';
  }
};
