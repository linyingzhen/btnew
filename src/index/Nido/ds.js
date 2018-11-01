/**
 * const prefixCls = 'style-117608';
 * const images = '/static/images/src/index/Nido';
 * @Author: czy0729
 * @Date: 2018-06-24 18:01:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-26 13:44:19
 * @Path m.benting.com.cn /src/index/Nido/ds.js
 */
import Utils from '@utils';

export const images = Utils.cdn('/static/images/src/index/Nido');
export const menuDS = [
  {
    icon: 'bt',
    label: '本汀官网',
    href: '/'
  },
  {
    icon: 'sign',
    label: '每日签到',
    href: '/event/sign'
  },
  {
    icon: 'point',
    label: '积分中心',
    href: '/points'
  },
  {
    icon: 'book',
    label: '垂钓学院',
    href: '/school'
  },
  {
    icon: 'coupon',
    label: '社区福利',
    href: '/event/coupon'
  },
  {
    icon: 'gift',
    label: '粉丝福利',
    href: '/event',
    login: true
  },
  {
    icon: 'video2',
    label: '垂钓视频',
    href: '/video'
  },
  {
    icon: 'nearby',
    label: '附近',
    href: '/nearby'
  }
];
export const mockTopic = {
  list: [
    {
      tid: 4,
      subject: '分享一下你的野钓经验？',
      dateline: 1522029258,
      closed: 1,
      topicList: [
        {
          niname: '灵动1987',
          faceImg: 'static/uploads/png/20170519/591e5f9e2c2bc.png',
          threadId: 93116,
          topicId: 4,
          userId: 4711309810694711,
          content:
            '人们喜欢钓鱼不都是为了吃鱼， 为的是钓鱼过程中的那份心情。钓鱼最大的好处，就是可以静静地坐在那里，什么都不用想，只是目不转睛地盯着浮标，等着鱼儿上钩， 此刻，平常生活中的闲事、琐事、烦心事，全都抛到脑后，让人得到彻底放松。'
        },
        {
          niname: '喵老板',
          faceImg: '140696',
          threadId: 93096,
          topicId: 4,
          userId: 4608069988300960,
          content:
            '晚上去水库野钓的时候看见别人在钓鱼时千万别问:有口吗？别问我为什么，上次被下的差点掉水里。'
        },
        {
          niname: '松江奇鱼',
          faceImg: '154529',
          threadId: 93054,
          topicId: 4,
          userId: 4568450504623169,
          content:
            '我的野钓经验：首先你得找到一个有鱼的地方作钓，没鱼的地方再怎么钓还是次次空军；再者是上鱼后入护前先检查一下鱼护有没有破个大洞，不注意鱼钻洞跑了还是空军；最后是鱼护拉出水时得悠着点，当心鱼护挂底址破了你还是空军。[尴尬]'
        }
      ],
      topicTotal: 402
    },
    {
      tid: 3,
      subject: '钓鱼时，最让你崩溃的瞬间是？',
      dateline: 1522029258,
      closed: 1,
      topicList: [
        {
          niname: '灵动平凡',
          faceImg: '148600',
          threadId: 90938,
          topicId: 3,
          userId: 4592557630737344,
          content: '正钓的美，正期待上大物呢，家里人打电话让回家。'
        },
        {
          niname: '灵动7572',
          faceImg: '254713',
          threadId: 90914,
          topicId: 3,
          userId: 4687405759568680,
          content: '遇上大鱼，搏斗了好久，最终因为各种原因，没钓起来，鱼跑了'
        },
        {
          niname: 'shanrulong',
          faceImg: '93568',
          threadId: 90879,
          topicId: 3,
          userId: 4599766574451693,
          content: '大鱼带着鱼钩，鱼线和鱼漂走了，还顺便带走了我的鱼竿！'
        }
      ],
      topicTotal: 340
    },
    {
      tid: 2,
      subject: '分享一下你至今最大的渔获',
      dateline: 1522029258,
      closed: 1,
      topicList: [
        {
          niname: '张锦坤',
          faceImg: 'static/uploads/jpeg/20170525/5926e039d3a9d.jpeg',
          threadId: 89042,
          topicId: 2,
          userId: 4569898986946768,
          content: '去年用3.9米的爆草钓上一条11斤的白鲢'
        },
        {
          niname: '宏东',
          faceImg: '263408',
          threadId: 89035,
          topicId: 2,
          userId: 4688463321237242,
          content: '三小时110斤，4.5米爆草，1.5主，0.8子，放鱼400斤'
        },
        {
          niname: '灵动82314',
          faceImg: 'static/uploads/png/20170519/591e5f9e2c2bc.png',
          threadId: 89033,
          topicId: 2,
          userId: 4691119048298272,
          content: '新人求罩，互拉进群！谢谢各位老司机！带小弟一块玩，一块娱乐'
        }
      ],
      topicTotal: 227
    }
  ]
};
