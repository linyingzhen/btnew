/**
 * const prefixCls = 'style-157735';
 * const images = '/static/images/src/discovery/fish/Post';
 * @Author: czy0729
 * @Date: 2018-08-11 16:03:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-23 10:14:44
 * @Path m.benting.com.cn /src/discovery/fish/Post/ds.js
 */
export const infoTypeDS = {
  video: 1,
  image: 2,
  article: 3
};

// 缓存产品数据，有新产品需要手动更新
// 数组根据以下接口返回数据整理得出
// Api.P('get_shop_only-goods-list', {
//   _: {
//     limit: 0,
//     search: {
//       goodsType: [36, 37, 38, 40, 49, 50, 51]
//     }
//   }
// });

// const goodsMap = {
//   36: 0,
//   38: 1,
//   37: 2,
//   40: 3,
//   49: 4,
//   51: 5,
//   50: 6
// };
// const goodsDS = [
//   {
//     label: '鱼竿',
//     value: '36',
//     children: []
//   },
//   {
//     label: '鱼饵',
//     value: '38',
//     children: []
//   },
//   {
//     label: '鱼线',
//     value: '37',
//     children: []
//   },
//   {
//     label: '鱼漂',
//     value: '40',
//     children: []
//   },
//   {
//     label: '装备',
//     value: '49',
//     children: []
//   },
//   {
//     label: '服饰',
//     value: '51',
//     children: []
//   },
//   {
//     label: '配件',
//     value: '50',
//     children: []
//   }
// ];
// const get = async parId => {
//   const { goodsList } = await Api.P('get_shop_only-goods-list', {
//     _: {
//       limit: 0,
//       search: {
//         goodsType: parId
//       }
//     }
//   });

//   goodsList.forEach(item => {
//     goodsDS[goodsMap[parId]].children.push({
//       label: item.title.replace('本汀', ''),
//       value: parseInt(item.gid),
//       parId
//     });
//   });
// };
// get(36);
// get(38);
// get(37);
// get(40);
// get(49);
// get(51);
// get(50);

export const goodsDS = [
  {
    label: '鱼竿',
    value: '36',
    children: [
      { label: '神鹤轻强硬', value: 208, parId: 36 },
      { label: '天弧斩月刀-鲤（黑蓝尊贵版）', value: 976, parId: 36 },
      { label: '天弧斩月刀-鲤（黑银轻赢版）', value: 958, parId: 36 },
      { label: '神鹤战斗极', value: 792, parId: 36 },
      { label: '金迦潘求败', value: 211, parId: 36 },
      { label: '天弧斩月刀-鲤（黑白精英版）', value: 923, parId: 36 },
      { label: '天弧斩月刀-鲤（黑金进取版）', value: 922, parId: 36 },
      { label: '金迦潘引领', value: 212, parId: 36 },
      { label: '金迦潘硬弓', value: 210, parId: 36 },
      { label: '金迦潘强弓', value: 209, parId: 36 },
      { label: '桃园财神终极版', value: 215, parId: 36 },
      { label: '彪悍黑坑技5H6H7H', value: 803, parId: 36 },
      { label: '神乐暴强硬', value: 237, parId: 36 },
      { label: '棍王硬攻强攻', value: 374, parId: 36 },
      { label: '财神超硬调', value: 219, parId: 36 },
      { label: '大显神通普惠版', value: 575, parId: 36 },
      { label: '大显神通超硬', value: 239, parId: 36 },
      { label: '大显神通鲫硬版', value: 241, parId: 36 },
      { label: '潇裟狂强弩', value: 257, parId: 36 },
      { label: '傲江雪手作', value: 1062, parId: 36 },
      { label: '老首长系列长竿', value: 382, parId: 36 },
      { label: '爆草所长版', value: 371, parId: 36 },
      { label: '洪发山巨物', value: 364, parId: 36 },
      { label: '财神超硬调纪念版', value: 362, parId: 36 },
      { label: '千鹤超硬调', value: 359, parId: 36 },
      { label: '红花金棍吴郭版', value: 357, parId: 36 },
      { label: '神武鲤硬调', value: 351, parId: 36 },
      { label: '恶棍', value: 327, parId: 36 },
      { label: '恶霸之暴强', value: 325, parId: 36 },
      { label: '红环黑棍【战斗】', value: 324, parId: 36 },
      { label: '鬼斧神工', value: 322, parId: 36 },
      { label: '洪发山鲤硬调纪念版', value: 310, parId: 36 },
      { label: '刚厉特作大物', value: 307, parId: 36 },
      { label: '大黑脘', value: 300, parId: 36 },
      { label: '洪发山强弓', value: 299, parId: 36 },
      { label: '洪发山硬作', value: 298, parId: 36 },
      { label: '洪发山大物', value: 297, parId: 36 },
      { label: '福山', value: 296, parId: 36 },
      { label: '洪发山硬弓', value: 295, parId: 36 },
      { label: '有乐町劲功', value: 294, parId: 36 },
      { label: '胜北浪强弓', value: 293, parId: 36 },
      { label: '傲江雪特作', value: 292, parId: 36 },
      { label: '神武巨物鲤', value: 291, parId: 36 },
      { label: '大武生鲤', value: 290, parId: 36 },
      { label: '财神之神乐', value: 268, parId: 36 },
      { label: '财神黄金八万', value: 267, parId: 36 },
      { label: '弩火天尊（硬）', value: 266, parId: 36 },
      { label: '火舞', value: 265, parId: 36 },
      { label: '彪悍特作大物', value: 264, parId: 36 },
      { label: '宫本武藏鲤', value: 263, parId: 36 },
      { label: '刚厉特作', value: 262, parId: 36 },
      { label: '柴舟', value: 261, parId: 36 },
      { label: '神鹤巨物鲤', value: 260, parId: 36 },
      { label: '红缨枪鲤硬调', value: 259, parId: 36 },
      { label: '爆草青鲟版', value: 258, parId: 36 },
      { label: '财神鲤硬调', value: 256, parId: 36 },
      { label: '财神鲤硬调五周年', value: 255, parId: 36 },
      { label: '魔裟斗强弓', value: 254, parId: 36 },
      { label: '咏春轻细硬', value: 253, parId: 36 },
      { label: '弩火天尊战斗', value: 252, parId: 36 },
      { label: '如来终极版', value: 251, parId: 36 },
      { label: '大门裸棍轻量版', value: 250, parId: 36 },
      { label: '代官山', value: 249, parId: 36 },
      { label: '大门裸棍常规版', value: 248, parId: 36 },
      { label: '洪发山轻细硬', value: 247, parId: 36 },
      { label: '咏春并继', value: 246, parId: 36 },
      { label: '炎之鲫硬调', value: 245, parId: 36 },
      { label: '贺春鲫硬调', value: 244, parId: 36 },
      { label: '财神轻细硬', value: 243, parId: 36 },
      { label: '东势鲫硬调', value: 242, parId: 36 },
      { label: '恶棍-欺硬怕软', value: 240, parId: 36 },
      { label: '爆草加强版', value: 238, parId: 36 },
      { label: '爆草定制版', value: 236, parId: 36 },
      { label: '魔裟斗综合金版花纹', value: 235, parId: 36 },
      { label: '财神竞技', value: 234, parId: 36 },
      { label: '神乎其技', value: 233, parId: 36 },
      { label: '彪悍', value: 232, parId: 36 },
      { label: '财神吴郭版', value: 231, parId: 36 },
      { label: '大门羽川丽', value: 230, parId: 36 },
      { label: '宗师经典硬作', value: 229, parId: 36 },
      { label: '宗师', value: 228, parId: 36 },
      { label: '池霸竞技吴郭版7H', value: 226, parId: 36 },
      { label: '池霸竞技仁', value: 224, parId: 36 },
      { label: '神棍超硬调', value: 223, parId: 36 },
      { label: '竞鲫本汀钓鱼学院纪念版', value: 222, parId: 36 },
      { label: '竞鲫超硬调', value: 221, parId: 36 },
      { label: '傲江雪并继鲤调子', value: 220, parId: 36 },
      { label: '汀神青鲟轻硬大物', value: 218, parId: 36 },
      { label: '汀神限量版', value: 217, parId: 36 },
      { label: '汀神轻硬大物', value: 216, parId: 36 },
      { label: '宫本武藏大师版', value: 214, parId: 36 },
      { label: '银棍', value: 213, parId: 36 }
    ]
  },
  {
    label: '鱼饵',
    value: '38',
    children: [
      { label: '一正宗拉爆鱼饵', value: 810, parId: 38 },
      { label: '印第安绿水', value: 303, parId: 38 },
      { label: '印第安绿水VIP版，绿水VIP礼盒版', value: 304, parId: 38 },
      { label: '一正宗拉爆红鱼饵', value: 577, parId: 38 },
      { label: '拉爆阿魏', value: 305, parId: 38 },
      { label: '一正宗冷冻饵', value: 302, parId: 38 },
      { label: '一正宗迷魂散', value: 301, parId: 38 },
      { label: '一正宗黄面面', value: 289, parId: 38 },
      { label: '一正宗鱼饵', value: 288, parId: 38 }
    ]
  },
  {
    label: '鱼线',
    value: '37',
    children: [
      { label: '乐牌鱼线常规版彩乐', value: 828, parId: 37 },
      { label: '乐牌鱼线经典版彩乐', value: 335, parId: 37 },
      { label: '乐牌鱼线水藻线', value: 337, parId: 37 },
      { label: '乐牌鱼线经典版黑乐', value: 340, parId: 37 },
      { label: '乐牌鱼线金版黑乐', value: 344, parId: 37 },
      { label: '乐牌鱼线金乐', value: 343, parId: 37 },
      { label: '乐牌鱼线大美人', value: 341, parId: 37 },
      { label: '乐牌鱼线合乐', value: 346, parId: 37 },
      { label: '乐牌鱼线魔幻变色线隐乐', value: 345, parId: 37 },
      { label: '乐牌鱼线白乐', value: 350, parId: 37 },
      { label: '乐牌鱼线线组绑匪', value: 347, parId: 37 },
      { label: '暴徒飞磕线', value: 1019, parId: 37 },
      { label: '竞技仕挂串钩子线组套装', value: 578, parId: 37 },
      { label: '乐牌大力马防咬线彩色8编', value: 349, parId: 37 },
      { label: '乐牌大力马防咬线灰色8编4编', value: 348, parId: 37 }
    ]
  },
  {
    label: '鱼漂',
    value: '40',
    children: [
      { label: '神鹤巴纳浮漂系列', value: 896, parId: 40 },
      { label: '神鹤竞技芦苇漂', value: 859, parId: 40 },
      { label: '顶风巴尔衫木系列浮漂', value: 339, parId: 40 },
      { label: '神鹤羽毛电子漂', value: 988, parId: 40 },
      { label: '顶风纳米浮漂系列', value: 342, parId: 40 },
      { label: '顶风巴纳漂系列', value: 338, parId: 40 },
      { label: '千鹤纳米浮漂01-07系列', value: 361, parId: 40 },
      { label: '千鹤纳米浮漂08-15系列', value: 365, parId: 40 },
      { label: '夜光漂水无影电子漂', value: 334, parId: 40 },
      { label: '神鹤孔雀羽浮漂', value: 354, parId: 40 },
      { label: ' 神鹤竞技漂尊贵版', value: 353, parId: 40 },
      { label: '纪念版鱼霸漂', value: 336, parId: 40 },
      { label: '亚野渔夫孔雀羽毛浮漂', value: 360, parId: 40 },
      { label: '亚野渔夫纳米渔漂', value: 358, parId: 40 },
      { label: '亚野渔夫芦苇浮漂', value: 356, parId: 40 },
      { label: '亚野渔夫大物漂', value: 355, parId: 40 },
      { label: '神鹤竞技漂典雅版 ', value: 352, parId: 40 },
      { label: '大师版漂盒', value: 281, parId: 40 }
    ]
  },
  {
    label: '装备',
    value: '49',
    children: [
      { label: '钓客版便携鱼护', value: 971, parId: 49 },
      { label: '钓客版漂盒', value: 989, parId: 49 },
      { label: '18年年度巨献品质钓伞', value: 805, parId: 49 },
      { label: '2018新款钓箱', value: 804, parId: 49 },
      { label: '竞技仕挂串钩子线组套装', value: 578, parId: 49 },
      { label: '古烈钓鱼包', value: 576, parId: 49 },
      { label: '多功能钓鱼拉杆箱', value: 395, parId: 49 },
      { label: '手工编织龙珠鱼护', value: 386, parId: 49 },
      { label: '轻量版大师钓鱼包', value: 385, parId: 49 },
      { label: '竹烟波月竿挂支架', value: 287, parId: 49 },
      { label: '藤原手作支架', value: 286, parId: 49 },
      { label: '大师钓鱼包', value: 285, parId: 49 },
      { label: '大师版鱼护', value: 284, parId: 49 },
      { label: '大师版钓鱼椅', value: 280, parId: 49 },
      { label: '巨星版双层钓鱼伞', value: 279, parId: 49 },
      { label: '大师版钓伞单双层', value: 278, parId: 49 },
      { label: '母夜叉防水钓鱼灯', value: 276, parId: 49 },
      { label: '大师版钓鱼灯', value: 275, parId: 49 },
      { label: '大师版经典钓箱', value: 274, parId: 49 },
      { label: '大师版黄金台钓箱', value: 273, parId: 49 },
      { label: '神农树藤网头', value: 272, parId: 49 },
      { label: '藤原手作网头', value: 271, parId: 49 },
      { label: '竹烟波月玉柄', value: 270, parId: 49 },
      { label: '藤原手作力抄', value: 269, parId: 49 }
    ]
  },
  {
    label: '服饰',
    value: '51',
    children: [
      { label: '健将钓鱼服', value: 827, parId: 51 },
      { label: '夏季户外钓鱼防晒服【精简版】', value: 308, parId: 51 },
      { label: '黄金甲钓鱼服', value: 313, parId: 51 },
      { label: '冰丝袖套头套', value: 320, parId: 51 },
      { label: '篮网钓鱼服', value: 311, parId: 51 },
      { label: '先锋版钓鱼服', value: 309, parId: 51 },
      { label: '迷彩钓鱼服', value: 315, parId: 51 },
      { label: '大师版钓鱼裤', value: 318, parId: 51 },
      { label: '大师版钓鱼帽', value: 277, parId: 51 },
      { label: '学院T恤', value: 316, parId: 51 },
      { label: '户外垂钓休闲裤', value: 977, parId: 51 },
      { label: '野隐单层冲锋衣', value: 1107, parId: 51 },
      { label: '野隐冲锋衣', value: 1099, parId: 51 },
      { label: '羽绒马甲', value: 1086, parId: 51 },
      { label: '加绒卫衣', value: 1085, parId: 51 },
      { label: '古烈大师帽', value: 1063, parId: 51 },
      { label: '垂钓休闲帽', value: 785, parId: 51 },
      { label: '防水保暖钓鱼手套', value: 387, parId: 51 },
      { label: '秋冬户外夹克外套', value: 332, parId: 51 },
      { label: '户外休闲加长棉衣', value: 331, parId: 51 },
      { label: '秋冬运动休闲服', value: 330, parId: 51 },
      { label: '户外休闲棉衣', value: 329, parId: 51 },
      { label: '呢子加长外套', value: 328, parId: 51 },
      { label: '战狼冲锋衣', value: 326, parId: 51 },
      { label: '战狼迷彩裤', value: 323, parId: 51 },
      { label: '户外休闲秋冬帽', value: 321, parId: 51 },
      { label: '户外休闲裤', value: 319, parId: 51 },
      { label: '大师版T恤POP衫', value: 317, parId: 51 },
      { label: '定制版钓鱼服', value: 314, parId: 51 },
      { label: '经典版钓鱼服', value: 312, parId: 51 },
      { label: '夏季户外钓鱼防晒服【舒适版】', value: 306, parId: 51 },
      { label: '五合一钓鱼眼镜', value: 283, parId: 51 },
      { label: '大师版钓鱼眼镜', value: 282, parId: 51 }
    ]
  },
  {
    label: '配件',
    value: '50',
    children: [
      { label: '藤原手作之力抄', value: 1061, parId: 50 },
      { label: '藤原手作之神枝', value: 1060, parId: 50 },
      { label: '手把缠绕带吸汗带龙骨止汗带', value: 579, parId: 50 },
      { label: '竞技仕挂串钩子线组套装', value: 578, parId: 50 },
      { label: '刻度铅', value: 384, parId: 50 },
      { label: '竞技太空豆小配件套装', value: 383, parId: 50 },
      { label: '紫竹根脱钩器', value: 379, parId: 50 },
      { label: '钛合金竞技脱钩器', value: 378, parId: 50 },
      { label: '细铅皮座渔具小配件', value: 377, parId: 50 },
      { label: '垂钓配件套餐', value: 376, parId: 50 },
      { label: '竞技浮漂座', value: 375, parId: 50 },
      { label: '6+1竞技太空豆', value: 373, parId: 50 },
      { label: '五合一小配件', value: 372, parId: 50 },
      { label: '八字环连接器', value: 370, parId: 50 },
      { label: '原胶黑色橄榄圆柱形 太空豆', value: 369, parId: 50 },
      { label: '优质铜头旋转漂座', value: 368, parId: 50 },
      { label: '蛇腹新关东鱼钩', value: 367, parId: 50 },
      { label: '雷鬼伊势尼鱼钩', value: 366, parId: 50 }
    ]
  }
];
