/**
 * const prefixCls = 'style-367768';
 * const images = '/static/images';
 * @Author: czy0729
 * @Date: 2018-10-28 03:35:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-21 12:09:16
 * @Path bt_mb_new /paths.js
 */
const paths = [
  /* ==================== discovery 动态 ==================== */
  ['/discovery/fish/post', '/discovery/fish/post', '渔获有礼发布'],
  ['/discovery/fish/category/:id?', '/discovery/fish/category', '渔获有礼分类'],
  ['/discovery/fish/:id/:gid?', '/discovery/fish', '渔获有礼'],
  ['/discovery/redpacket/coin', '/discovery/redpacket/coin', '金币红包'],
  ['/discovery/redpacket/cash', '/discovery/redpacket/cash', '现金红包'],
  ['/discovery/detail/:id?', '/discovery/detail', '动态详情'],
  ['/discovery/post/:id?', '/discovery/post', '动态发布'],
  ['/discovery/:id?', '/discovery', '动态'],

  /* ==================== bbs 社区 ==================== */
  ['/bbs/registration/:id', '/bbs/registration', '活动报名'],
  ['/bbs/floor/detail/:id', '/bbs/floor/detail', '踩楼详情'],
  ['/bbs/floor', '/bbs/floor', '踩楼列表'],
  ['/bbs/topic/detail/:id/:tabId?', '/bbs/topic/detail', '话题详情'],
  ['/bbs/topic/:id?', '/bbs/topic', '话题列表'],
  ['/bbs/block/:id', '/bbs/block', '帖子板块'],
  ['/bbs/article/:id', '/bbs/article', '帖子详情'],
  ['/bbs/post/:id?', '/bbs/post', '帖子发布/帖子编辑'],
  ['/bbs/:id?', '/bbs', '社区'],

  /* ==================== video 社区/视频 ==================== */
  ['/video/post', '/video/post', '视频发布'],
  ['/video/detail/:id', '/video/detail', '视频详情'],
  ['/video/:id?', '/video', '视频页'],

  /* ==================== school 垂钓学院 ==================== */
  ['/school/tech/:id', '/school/tech', '教学专题'],
  ['/school/video/:id', '/school/video', '视频类'],

  /* ==================== event 活动 ==================== */
  ['/event/cashback/submit/:id', '/event/cashback/submit', '粉丝福利提交资料'],
  ['/event/cashback/:id', '/event/cashback', '粉丝福利'],

  ['/event/car/success/:id', '/event/car/success', '送车活动报名成功'],
  ['/event/car/success_publish/:id', '/event/car/success_publish', '送车活动渔获发布成功'],
  ['/event/car/user_status/:id/:uid', '/event/car/user_status', '送车活动报名状况'],
  ['/event/car/status/:id', '/event/car/status', '送车活动我的活动状况'],
  ['/event/car/user/:id', '/event/car/user', '送车活动用户报名状况'],
  ['/event/car/signup/:id', '/event/car/signup', '送车活动报名'],
  ['/event/car/post/:id', '/event/car/post', '送车活动发渔获'],
  ['/event/car/:id?', '/event/car', '送车活动'],

  /* ==================== person 用户中心 ==================== */
  ['/person/address/update/:id', '/person/address/update', '我的地址编辑'],
  [
    '/person/event/registration/detail/:id',
    '/person/event/registration/detail',
    '活动报名填写资料'
  ],
  ['/person/event/prize/:id', '/person/event/prize', '领取奖品'],
  ['/person/feedback/detail/:id', '/person/feedback/detail', '我的反馈'],
  ['/person/help/detail/:id?', '/person/help/detail', '帮助详情'],
  ['/person/help/search/:id?', '/person/help/search', '帮助搜索'],
  ['/person/order/address/:id', '/person/order/address', '选择订单地址'],
  ['/person/prize/detail/:id', '/person/prize/detail', '礼品详情'],
  ['/person/goods/detail/:id', '/person/goods/detail', '我的礼单'],
  ['/person/prize/info/:id', '/person/prize/info', '完善相关信息'],
  ['/person/prize/success/:id', '/person/prize/success', '答谢金发放成功'],
  ['/person/vip/detail/:id', '/person/vip/detail', '#todo'],
  ['/person/publish/:id?', '/person/publish', '我的发布'],
  ['/person/friends/search', '/person/friends/search', '搜索好友'],
  ['/person/friends/:id?', '/person/friends', '我的好友'],
  ['/person/zone/:id?', '/person/zone', '用户空间'],

  /* ==================== shop 商城 ==================== */
  ['/shop/auction/detail/:id', '/shop/auction/detail', '竞拍详情'],
  ['/shop/auction/:id?', '/shop/auction', '竞拍'],
  ['/shop/miaosha/detail/:id', '/shop/miaosha/detail', '极速秒杀详情'],
  ['/shop/jianlou/detail/:id', '/shop/jianlou/detail', '金币捡漏详情'],
  ['/shop/guess/detail/:id', '/shop/guess/detail', '欢乐猜鱼详情'],
  ['/shop/wabao/detail/:id', '/shop/wabao/detail', '积分挖宝详情'],
  ['/shop/wabao/calculate/:id', '/shop/wabao/calculate', '计算详情'],
  ['/shop/category/:id', '/shop/category', '商品分类'],
  ['/shop/goods/:id', '/shop/goods', '商品详情'],

  /* ==================== other ==================== */
  ['/chat/:id', '/chat', '私聊'],
  ['/auth/detail/:id', '/auth/detail', '防伪详情'],
  ['/pay/result/:id', '/pay/result', '支付结果'],
  ['/star/detail/:id', '/star/detail', '名人简介'],
  ['/nearby/detail/:id', '/nearby/detail', '经销商详情']
];

exports = paths;
module.exports = paths;
