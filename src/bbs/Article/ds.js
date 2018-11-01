/**
 * const prefixCls = 'style-897441';
 * const images = '/static/images/src/bbs/Article';
 * @Author: czy0729
 * @Date: 2018-07-11 17:27:40
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-16 17:18:45
 * @Path m.benting.com.cn /src/bbs/Article/ds.js
 */
import Utils from '@utils';

export const images = Utils.cdn('/static/images/src/bbs/Article');
export const tabsDS = [{ title: '最新' }, { title: '正序' }, { title: '楼主' }];
export const tabsAllDS = [
  { title: '最新' },
  { title: '正序' },
  { title: '楼主' },
  { title: '我的' }
];
export const competitionTypeDS = [
  {
    label: '金币',
    value: '1'
  },
  {
    label: '积分',
    value: '2'
  }
];
export const seriesDS = [
  '神鹤',
  '金迦潘',
  '财神',
  '棍王',
  '爆草',
  '神棍',
  '汀神',
  '池霸',
  '天弧',
  '超长（8-15米）',
  '销魂单品'
];
export const goodsDS = [
  {
    label: '神鹤',
    child: [
      {
        gid: 1,
        title: '神鹤轻强硬',
        desc: '超轻量综合28调',
        minPrice: 309,
        maxPrice: 499
      },
      {
        gid: 2,
        title: '神鹤战斗极',
        desc: '超轻量休闲黑坑大物19调',
        minPrice: 399,
        maxPrice: 569
      }
    ]
  },
  {
    label: '金迦潘',
    child: [
      {
        gid: 11,
        title: '金迦潘强弓',
        desc: '超轻量综合19调',
        minPrice: 399,
        maxPrice: 609
      },
      {
        gid: 12,
        title: '金迦潘硬弓',
        desc: '超轻量综合大19调',
        minPrice: 509,
        maxPrice: 709
      },
      {
        gid: 13,
        title: '金迦潘求败',
        desc: '超轻量战斗大19调',
        minPrice: 609,
        maxPrice: 809
      },
      {
        gid: 14,
        title: '金迦潘引领',
        desc: '超超轻量综合28调',
        minPrice: 609,
        maxPrice: 809
      }
    ]
  },
  {
    label: '财神',
    child: [
      {
        gid: 21,
        title: '财神超硬调',
        desc: '超轻量鲫竿28调',
        minPrice: 399,
        maxPrice: 529
      },
      {
        gid: 22,
        title: '财神轻细硬',
        desc: '超轻超细综合28调',
        minPrice: 518,
        maxPrice: 679
      },
      {
        gid: 23,
        title: '财神鲤硬调',
        desc: '超轻量鲤竿大28调',
        minPrice: 588,
        maxPrice: 858
      },
      {
        gid: 24,
        title: '财神竞技-礼',
        desc: '超轻量竞技19调6H',
        minPrice: 1050,
        maxPrice: 1299
      },
      {
        gid: 25,
        title: '财神终极版-桃园',
        desc: '超轻量综合大19调',
        minPrice: 1450,
        maxPrice: 1799
      },
      {
        gid: 26,
        title: '财神大师版-宫本武藏',
        desc: '超轻量综合大19调',
        minPrice: 1050,
        maxPrice: 1399
      },
      {
        gid: 27,
        title: '财神鲤硬调五周年纪念版',
        desc: '超轻量鲤竿大28调',
        minPrice: 1039,
        maxPrice: 1239
      }
    ]
  },
  {
    label: '棍王',
    child: [
      {
        gid: 31,
        title: '棍王强攻',
        desc: '超轻量黑坑19调5H',
        minPrice: 468,
        maxPrice: 589
      },
      {
        gid: 32,
        title: '棍王硬攻',
        desc: '超轻量黑坑19调6H',
        minPrice: 499,
        maxPrice: 599
      },
      {
        gid: 33,
        title: '棍王力攻',
        desc: '超轻量黑坑19调7H',
        minPrice: 529,
        maxPrice: 609
      },
      {
        gid: 34,
        title: '棍王暴攻',
        desc: '超轻量黑坑19调8H',
        minPrice: 539,
        maxPrice: 619
      }
    ]
  },
  {
    label: '爆草',
    child: [
      {
        gid: 41,
        title: '爆草高级定制',
        desc: '暴力大物巨物竿19调',
        minPrice: 489,
        maxPrice: 729
      },
      {
        gid: 42,
        title: '爆草加强版',
        desc: '重暴力大物巨物竿19调',
        minPrice: 618,
        maxPrice: 899
      },
      {
        gid: 43,
        title: '爆草青鲟版',
        desc: '强暴力大物巨物19调',
        minPrice: 698,
        maxPrice: 1298
      },
      {
        gid: 44,
        title: '爆草所长版',
        desc: '8、9、10、11、12、13、14、15米超长竿',
        minPrice: 609,
        maxPrice: 899
      }
    ]
  },
  {
    label: '神棍',
    child: [
      {
        gid: 51,
        title: '大显神通-鲫',
        desc: '手作超轻量鲫竿28调',
        minPrice: 549,
        maxPrice: 759
      },
      {
        gid: 52,
        title: '大显神通普惠版',
        desc: '手作超轻量综合28调',
        minPrice: 289,
        maxPrice: 409
      },
      {
        gid: 53,
        title: '大显神通超硬调',
        desc: '手作超轻量综合28调',
        minPrice: 499,
        maxPrice: 809
      },
      {
        gid: 54,
        title: '神棍-超硬调',
        desc: '手作超轻量综合28调',
        minPrice: 1199,
        maxPrice: 1999
      },
      {
        gid: 55,
        title: '神乎其技吴郭版',
        desc: '手作超轻量罗非竿6H7H8H',
        minPrice: 1199,
        maxPrice: 1499
      }
    ]
  },
  {
    label: '汀神',
    child: [
      {
        gid: 61,
        title: '汀神轻硬',
        desc: '超轻量综合19调',
        minPrice: 3388,
        maxPrice: 5188
      },
      {
        gid: 62,
        title: '汀神轻硬大物-青鲟版',
        desc: '强暴力大物巨物19调',
        minPrice: 1199,
        maxPrice: 2059
      },
      {
        gid: 63,
        title: '汀神限量版',
        desc: '超超轻量鲤竿28调',
        minPrice: 9999,
        maxPrice: 15000
      }
    ]
  },
  {
    label: '池霸',
    child: [
      {
        gid: 71,
        title: '池霸-仁',
        desc: '超轻量黑坑19调7H',
        minPrice: 858,
        maxPrice: 988
      },
      {
        gid: 72,
        title: '池霸-义',
        desc: '暴力黑坑19调7H',
        minPrice: 758,
        maxPrice: 888
      },
      {
        gid: 73,
        title: '池霸吴郭版',
        desc: '超轻量罗非竿6H7H8H',
        minPrice: 838,
        maxPrice: 898
      }
    ]
  },
  {
    label: '天弧',
    child: [
      {
        gid: 81,
        title: '天弧斩月刀-黑白版',
        desc: '轻量鲤竿28调',
        minPrice: 179,
        maxPrice: 249
      },
      {
        gid: 82,
        title: '天弧斩月刀-黑金版',
        desc: '轻量鲤竿28调',
        minPrice: 169,
        maxPrice: 239
      },
      {
        gid: 83,
        title: '天弧斩月刀-黑银版',
        desc: '超轻量鲤竿28调',
        minPrice: 248,
        maxPrice: 368
      },
      {
        gid: 84,
        title: '天弧斩月刀-尊贵版',
        desc: '超轻量综合19调',
        minPrice: 1299,
        maxPrice: 1999
      }
    ]
  },
  {
    label: '超长（8-15米）',
    child: [
      {
        gid: 91,
        title: '老首长谦喜版',
        desc: '',
        minPrice: 799,
        maxPrice: 1219
      },
      {
        gid: 92,
        title: '老首长谦善版',
        desc: '',
        minPrice: 1099,
        maxPrice: 1799
      },
      {
        gid: 93,
        title: '老首长谦逊版',
        desc: '',
        minPrice: 1599,
        maxPrice: 2299
      }
    ]
  },
  {
    label: '并继',
    child: [
      {
        gid: 201,
        title: '咏春并继',
        desc: '并继鲫硬调37',
        minPrice: 339,
        maxPrice: 599
      },
      {
        gid: 202,
        title: '傲江雪并继',
        desc: '并继鲤硬调28',
        minPrice: 348,
        maxPrice: 778
      },
      {
        gid: 203,
        title: '傲江雪-竹',
        desc: '并继鲫硬调46',
        minPrice: 5999,
        maxPrice: 5999
      },
      {
        gid: 204,
        title: '青衫隐-竹',
        desc: '并继鲫硬调46',
        minPrice: 6999,
        maxPrice: 6999
      },
      {
        gid: 205,
        title: '剑心藏-竹',
        desc: '并继鲫硬调46',
        minPrice: 5999,
        maxPrice: 5999
      }
    ]
  },
  {
    label: '销魂单品',
    child: [
      {
        gid: 101,
        title: '炎之',
        desc: '超轻量鲫竿37偏28调',
        minPrice: 299,
        maxPrice: 429
      },
      {
        gid: 102,
        title: '竞鲫',
        desc: '超轻量超细身鲫竿28调',
        minPrice: 619,
        maxPrice: 729
      },
      {
        gid: 103,
        title: '彪悍综合系列',
        desc: '超轻量综合28调',
        minPrice: 199,
        maxPrice: 329
      },
      {
        gid: 104,
        title: '神乐暴强硬',
        desc: '超轻量综合大二八偏19调',
        minPrice: 349,
        maxPrice: 550
      },
      {
        gid: 105,
        title: '宗师',
        desc: '超轻量鲤竿28调',
        minPrice: 239,
        maxPrice: 369
      },
      {
        gid: 106,
        title: '潇裟狂强弩',
        desc: '超轻量综合大19调',
        minPrice: 569,
        maxPrice: 799
      },
      {
        gid: 107,
        title: '银棍',
        desc: '超超轻量综合大二八偏19调',
        minPrice: 799,
        maxPrice: 1099
      },
      {
        gid: 108,
        title: '红花金棍吴郭版',
        desc: '超轻量罗非竿7H',
        minPrice: 428,
        maxPrice: 550
      },
      {
        gid: 109,
        title: '彪悍黑坑技',
        desc: '轻量黑坑19调5H6H7H',
        minPrice: 239,
        maxPrice: 299
      },
      {
        gid: 110,
        title: '红环黑棍--战斗',
        desc: '超轻量黑坑19调7H',
        minPrice: 738,
        maxPrice: 968
      },
      {
        gid: 111,
        title: '神乐暴强硬-手作',
        desc: '超轻量综合19调',
        minPrice: 1199,
        maxPrice: 1999
      },
      {
        gid: 112,
        title: '傲江雪特作',
        desc: '超超轻量综合大28调',
        minPrice: 1599,
        maxPrice: 3699
      },
      {
        gid: 113,
        title: '傲江雪手作',
        desc: '超超轻量综合大28调，每个尺寸减500',
        minPrice: 1899,
        maxPrice: 3999
      },
      {
        gid: 114,
        title: '火舞超硬调',
        desc: '超轻量综合28调',
        minPrice: 3188,
        maxPrice: 5188
      }
    ]
  }
];
