/* eslint-disable prefer-promise-reject-errors */
/**
 * const prefixCls = 'style-806099';
 * const images = '/static/images/common/api';
 * @Author: czy0729
 * @Date: 2018-06-20 11:13:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-26 15:14:13
 * @Path m.benting.com.cn \common\api\index.js
 */
import fetch from 'isomorphic-unfetch';
import { Toast } from 'antd-mobile';
import Const from '@const';
import Utils from '@utils';
import G from '@stores/g';

let apis;

/**
 * Api.P约定
 * Api.PP不作处理
 * 地址前面为!  代表需要登录才发请求
 * 地址前面为!! 代表需要登录才发请求，并且结果失败时，不作提示
 */
function initApis() {
  apis = {
    /* ==================== 0 其他或未分类 ==================== */
    /**
     * 获取服务器时间
     * @version 171215 1.0
     */
    get_time: '/index/serverTime',

    /**
     * 微信签名
     * @version 180117 1.0
     * @param {String} *url 域名
     */
    'get_wx_js-sign': `${Const.__NEW_API__}/wechat/getjssign`,

    /**
     * 0.0 取微信配置
     * @version 170713 1.0
     * @param {String} *url 域名
     */
    get_wx_config: '/wx/getjssign',

    /**
     * 论坛商品系列标签
     * @version 171215 1.0
     * @param {Int} *labelType 3
     */
    get_bbs_label: '/label/search',

    /**
     * X.X 红人打分
     * @version 180420 1.0
     * @param {Int} *threadId
     * @param {Int} *changeScore 分数
     */
    'do_hong-ren_score': '/discuz/forumpost/scoretips',

    /**
     * X.X 代理商发奖
     * @version 180425 1.0
     * @param {Int} *cdk
     */
    'do_merchant_check-customer-lottery': '/dealer/info/upRecord',

    /**
     * X.X 代理商查看自己所发奖记录
     * @version 180425 1.0
     */
    'get_merchant_customer-lottery-list': '/dealer/info/lotteryDetail',

    /**
     * X.X 当前使用者代理商信息
     * @version 180426 1.0
     */
    'get_merchant_my-info': '/dealer/info',

    /**
     * X.X 当前使用者是否代理商
     * @version 180426 1.0
     */
    'get_merchant_is-merchant': '/dealer/info/isDealer',

    /**
     * X.X 获取汀友会会员列表
     * @version 180509 1.0
     */
    'get_merchant_member-list': '/dealer/info/myAssembly',

    /**
     * X.X 获取汀友会二维码
     * @version 180509 1.0
     * @param {String} *url
     */
    do_merchant_qrcode: `${Const.__NEW_API__}/createqrcode`,

    /**
     * X.X 资金划转
     * @version 180512 1.0
     * @param {String} *type   转换类型 0本汀->灵动 1灵动->本汀
     * @param {Float}  *amount 金额
     */
    do_wallet_exchange: `${Const.__NEW_API__}/transferaccounts`,

    /* ==================== 1-5 登录、注册、换手机 ==================== */
    /**
     * 1.0 发送注册验证码
     * @version 170511 1.0
     * @param {String} *m 手机号
     */
    do_send_register_captcha: '/valcode/sendregcode',

    /**
     * 1.1 发送登录验证码
     * @version 170511 1.0
     * @param {String} *m 手机号
     */
    do_send_login_captcha: '/valcode/sendLoginCode',

    /**
     * 1.2 发送通用验证码
     * @version 170511 1.0
     * @param {String} *m 手机号
     */
    do_send_captcha: '/valcode/sendSmsCode',

    /**
     * 1.2.1发送通用验证码-并保存至数据库
     * @version 170620 1.0
     * @param {String} *m 手机号
     */
    'do_send_captcha-DB': '/valcode/sendDBcode',

    /**
     * 1.3 发送找回密码验证码
     * @version 170511 1.0
     * @param {String} *m 手机号
     */
    do_send_pwd_captcha: '/valcode/sendpwdcode',

    /*
     * 1.5 根据模板发送短信验证码
     * @version 180225 1.0
     * @param {String} *m       手机号
     * @param {String} *tplName 模板名：send_code,send_dealer_audit,send_invite_code,send_reissue_notice,send_tianjin_code,已默认send_tianjin_code
     * @param {Int}    channel  频道：1.本汀户外 2.本汀官网 已默认：2
     * @param {Int}    smsType  短信类型：1.验证码类 2.内容类 已默认1
     */
    'do_sms_send-by-tpl': '/sms/sendTplSMS',

    /**
     * 2.0 注册
     * @version 170511 1.0
     * @param {String} *mobile   手机号
     * @param {String}  userName 用户名
     * @param {String} *pwd      密码
     * @param {String} *code     验证码
     */
    do_user_register: '/user/reg',

    /**
     * 2.1 验证手机号是否已存在
     * @version 170511 1.0
     * @param {String} *mobile 手机号
     */
    'get_mobile_check-exist': '/user/isExistMobile',

    /**
     * 3.0 验证码登录
     * @version 170511 1.0
     * @param {String} *mobile 手机号
     * @param {String} *code   验证码
     */
    do_login_by_captcha: '/user/loginc',

    /**
     * 4.0 密码登录
     * @version 170511 1.0
     * @param {String} *mobile 手机号
     * @param {String} *pwd    密码
     */
    do_login_by_pwd: '/user/loginp',

    /**
     * 4.0.1 用户名/手机号/邮箱 + 密码登录
     * @version 170624 1.0
     * @param {String} *account 用户名/手机号/邮箱
     * @param {String} *pwd    密码
     */
    do_login_merge: '/user/login',

    /**
     * 4.1 用户退出
     * @version 170527 1.0
     */
    do_logout: '/user/loginout',

    /**
     * 5.0 找回密码
     * @version 170522 1.0
     * @param {String} *m      手机号
     * @param {String} *code   验证码
     * @param {String} *newPwd 密码
     */
    do_find_pwd: '/userpwd/rpmpwd',

    /**
     * 5.1 修改密码
     * @version 170523 1.0
     * @param {String} *oldPwd 旧密码
     * @param {String} *newPwd 新密码
     */
    do_re_pwd: '/user/updatepwd',

    /* ==================== 6 发布 ==================== */
    /**
     * 6.0 发布信息
     * @version 170518 1.0
     * @param {String} con       内容
     * @param {String} fileIds   文件id号，多个用‘,’隔开
     * @param {Int}    *infoType 类型：1.视频 2.图文 3.纯文字
     */
    do_publish: '/infoflow/main/publish',

    /**
     * 6.1 发布信息位置信息
     * @version 170526 1.0
     * @param {Int}    *inforId 信息ID
     * @param {String} userLong 经度
     * @param {String} userlat  纬度
     * @param {String} userIp   IP
     */
    do_add_location: '/infoflow/location/add',

    /**
     * 6.2 用户删除发布信息
     * @version 170526 1.0
     * @param {Int} *inforId 信息ID
     */
    do_delete_publish: '/infoflow/main/userdel',

    /* ==================== 7 首页 ==================== */
    /**
     * 7.0 首页精选列表
     * @version 170516 1.0
     */
    get_home_list: '/infoflow/main/homelist',

    /* ==================== 8 发现 ==================== */
    /**
     * 8.0 发现页列表
     * @version 170515 1.0
     */
    get_discovery_list: '/infoflow/main/infoflowlist',

    /**
     * [需登录] 8.0.1 我的发布列表
     * @version 170522 1.0
     */
    get_my_discovery_list: '!/infoflow/main/myrelease',

    /**
     * 8.0.2 其他人的发布列表
     * @version 170526 1.0
     */
    get_person_discovery_list: '/infoflow/main/otherrelease',

    /**
     * 8.1 视讯列表 （仅视频）
     * @version 170515 1.0
     */
    get_video_list: '/infoflow/main/videolist',

    /**
     * 8.x
     * @version 171031 1.0
     */
    get_video_label: '/video/getlabel',

    /* ==================== 9 详情 ==================== */
    /**
     * 9.0 信息详情接口
     * @version 170516 1.0
     * @param {Int} *infoId 信息id号
     */
    get_detail: '/infoflow/main/detail',

    /* ==================== 10 评论 ==================== */
    /**
     * 10.0 评论/回复评论
     * @version 170517 1.0
     * @param {Int}    *infoId  信息id号
     * @param {Int}    parId    评论/回复的父节点id（被评论/回复的数据id）
     * @param {String} *con     评论/回复内容
     * @param {String} *cmtType 类型：1.评论 2.回复评论
     */
    do_comment: '/infoflow/comment/add',

    /**
     * 11.0 评论列表 (发现->详情->评论)
     * @version 170517 1.0
     * @param {Int} *infoId 信息id号
     */
    get_detail_comment_list: '/infoflow/comment/detailcomment',

    /**
     * 11.1 所有评论及回复列表
     * @version 170517 1.0
     * @param {Int} tbId   评论/回复自增id
     * @param {Int} infoId 信息id号
     * ...
     */
    get_comment_list: '/infoflow/comment/allcomment',

    /* ==================== 12 ==================== */
    /**
     * 12.0 点赞
     * @version 170519 1.0
     * @param {Int} *infoId 评论/回复自增id
     */
    do_like: '/infoflow/recordnum/addlikenum',

    /**
     * 12.1 观看视频数+1
     * @version 170519 1.0
     * @param {Int} *infoId 评论/回复自增id
     */
    do_view_video: '/infoflow/recordnum/addviewnum',

    /**
     * 12.2 点击浏览数+1
     * @version 170519 1.0
     * @param {Int} *infoId 评论/回复自增id
     */
    do_view: '/infoflow/recordnum/addhitsnum',

    /**
     * 12.3 评论点赞
     * @version 170519 1.0
     * @param {Int} *tbId 评论自增id号
     */
    do_like_comment: '/infoflow/recordnum/commentlikenum',

    /**
     * 12.4 个人点赞评论列表
     * @version 170520 1.0
     */
    get_user_like_list: '!/infoflow/recordnum/commentlist',

    /* ==================== 13 ==================== */
    /**
     * 13.0 导播图列表
     * @version 170520 1.0
     * @param {Int} *infoId 信息id号
     */
    get_carousel_list: '/adm/banner/bannerlist',

    /**
     * [需登录] 13.1 获取用户信息
     * @version 170519 1.0
     */
    get_user_info: '!/user/getUserInfo',

    /**
     * 13.2 修改用户信息
     * @version 170519 1.0
     * @version 170624 1.1
     * @param {Int}    sex     性别 1.男 2.女 3.保密
     * @param {String} *niname 昵称
     * @param {String} faceImg 压缩头像地址
     * @param {String} birDay  生日 ，格式：Y-m-d  如：1999-1-1
     * @param {String} phone   绑定手机号（仅 userSource = 2 时有效）
     * @param {String} code    绑定手机号验证码（接口：sendDBcode）
     */
    do_user_info_update: '/user/updateInfo',

    /**
     * 13.3 获取他人信息 [简单]
     * @version 170526 1.0
     * @param {String} *userId 用户id号
     */
    get_person_info: '/user/getuser',

    /**
     * 13.3 获取他人信息 [详细]
     * @version 170526 1.0
     * @param {String} *userId 用户id号
     */
    'get_person_info-more': '/user/getuserheader',

    /**
     * 13.6 添加收货地址
     * @version 170717 1.0
     * @param {String} *userId 用户id号
     */
    do_add_address: '/users/address/add',

    /**
     * 13.7 修改收货地址
     * @version 170717 1.0
     * @param {String} *userId 用户id号
     */
    do_address_update: '/users/address/update',

    /**
     * 13.8 删除收货地址
     * @version 170717 1.0
     * @param {String} *userId 用户id号
     */
    do_delete_address: '/users/address/delete',

    /**
     * 13.9.1 获取一条收货地址列表
     * @version 170718 1.0
     * @param {String} *userId 用户id号
     */
    get_address_one_info: '/users/address/get',

    /**
     * 13.9.2 获取一条收货地址列表
     * @version 170718 1.0
     * @param {String} *userId 用户id号
     */
    get_address_default: '/users/address/getdefault',

    /**
     * 13.10 获取收货地址列表
     * @version 170717 1.0
     * @param {String} *userId 用户id号
     */
    get_address_list: '/users/address/myaddresslist',

    /* ==================== 14 feedback ==================== */
    /**
     * 14.0 意见反馈
     * @version 170520 1.0
     * @param {String} *content 反馈内容
     */
    do_feedback_add: '/adm/feedback/add',

    /**
     * 14.2 我的反馈列表
     * @version 170520 1.0
     */
    get_feedback_list: '/adm/feedback/myFeedBack',

    /**
     * 14.3 更新意见反馈为已读
     * @version 170520 1.0
     * @param {int} *tbId 反馈id号，多个用,隔开；为空代表更新所有为已读
     */
    do_feedback_read: '/adm/feedback/read',

    /* ==================== 15 ==================== */
    /**
     * 15.0 获取社区论坛贴子接口
     * @version 170520 1.0
     */
    get_bbs_post_list: `${Const.__NEW_API__}/postlist`,

    /* ==================== 16 关注、粉丝 ==================== */
    /**
     * 16.0 用户添加关注
     * @version 170525 1.0
     * @param {Int} *concernId 被关注用户ID
     */
    do_add_follow: '/users/concern/add',

    /**
     * [已废弃] 16.1 用户取消关注
     * @version 170525 1.0
     * @param {Int} *concernId 被取消关注用户ID
     */
    do_cancel_follow: '/users/concern/update',

    /**
     * [需登录] 16.2 用户关注列表
     * @version 170525 1.0
     */
    get_user_followers: '!/users/concern/myConlist',

    /**
     * [需登录] 16.3 用户粉丝列表
     * @version 170525 1.0
     */
    get_user_fans: '!/users/concern/myfanlist',

    /* ==================== 17 消息 ==================== */
    /**
     * [需登录] 17.0.0 我的消息列表
     * @version 170525 1.0
     */
    get_message_list: '!/users/message/mymsglist',

    /**
     * [需登录] 17.0.1 我的论坛消息列表
     * @version 170713 1.0
     */
    'get_bbs-message_list': '!/users/message/mymsglistdz',

    /**
     * [需登录，不提示] 17.1 我的消息提示数
     * @version 170525 1.0
     * @paramName {Int} isFace 是否返回最后互动人的头像：1.是 0.否
     */
    get_message_count: '!!/users/message/mymsgcount',

    /**
     * [需登录，不提示] 17.1.1 我的消息提示数 - 新版归类
     * @version 171202 1.0
     */
    'get_message_count-new': '!!/users/message/mymsgtotal',

    /**
     * 17.1.2 已读消息处理 - 清除红点
     * @version 171202 1.0
     * @param {String} *typesKey 消息归类的键 mymsgtotal接口有返回,传all:已读所有类型消息；如：all、replyNum、likeNum等
     */
    'do_message_count-clear': '/users/message/readmsg',

    /**
     * 17.2 修改我的消息状态
     * @version 170526 1.0
     * @param {Int} *tbId  消息自增id号
     * @param {Int} *state 修改状态值：2.已读 3.移除
     */
    do_update_message_state: '/users/message/upstate',

    /* ==================== 18 ==================== */
    /**
     * [需登录] 18.0 我的发布数，关注数，粉丝数及提醒
     * @version 170526 1.0
     */
    get_person_center_count: '!/users/statistics/mycount',

    /* ==================== 19 ==================== */
    /**
     * 19.1 我的积分历史记录
     * @version 170526 1.0
     */
    'get_my-score_list': '/users/score/myscorelogs',

    /**
     * 19.2  我的等级信息 或 等级信息
     * @version 170526 1.0
     */
    get_my_grade_list: '/users/grade/mygrade',

    /**
     * 19.3  我的VIP信息
     * @version 170929 1.0
     */
    get_my_vip: '/users/uservip/get',

    /* ==================== 20 签到 ==================== */
    /**
     * 20.0 用户签到
     * @version 170527 1.0
     */
    do_sign: '/users/sign/in',

    /**
     * [需登录] 20.1 每月签到列表
     * @version 170527 1.0
     * @param {Int} num 当月的上月变量，如3：上个3月
     */
    get_sign_list: '!/users/sign/monthlist',

    /**
     * 20.2 我的每周签到列表
     * @version 170714 1.0
     */
    'get_sign_week-list': '!/users/sign/weeklist',

    /**
     * 20.3 用户签到排名
     * @version 170715 1.0
     * @param {Int} num   天数：-1：昨天，默认当天
     * @param {Int} limit 条数，已默认10条
     */
    'get_sign_today-top-list': '/users/sign/signtoplist',

    /**
     * 20.4 我的当月签到排行信息
     * @version 170830 1.0
     */
    'get_sign_month-my-detail': '!/users/signcount/mysigntop',

    /**
     * 20.5 月签到积分排行榜
     * @version 170830 1.0
     */
    'get_sign_month-top-list': '/users/signcount/monthPointTop',

    /**
     * 20.6 月签到全勤榜
     * @version 170830 1.0
     */
    'get_sign_month-all-sign-list': '/users/signcount/monthAllSignTop',

    /**
     * 20.7 签到满一周积分领取
     * @version 170905 1.0
     */
    'get_sign_week-point': '/users/sign/getweekpoint',

    /* ==================== 21 活动返现 ==================== */
    /**
     * [已废弃][需登录，不提示] 21.0 判断账号是否绑定认证
     * @version 170602 1.0
     * @param {Int} *authType 认证类型：1.微信 2.微博 3.QQ 4.本汀社区
     */
    do_check_third_bind: '!!/users/auth/isauth',

    /**
     * 21.1 账号绑定认证接口
     * @version 170602 1.0
     * @param {Int}    *authType 认证类型：1.微信 2.微博 3.QQ 4.本汀社区
     * @param {String} *account  账号
     * @param {String} *password 密码
     */
    do_third_bind: '/users/auth/doauth',

    /**
     * [已废弃][需登录，不提示] 21.2 检测本汀社区账号是否已认证
     * @version 170602 1.0
     */
    do_check_bbs_bind: '!!/discuz/dzuserauth/isauth',

    /**
     * 21.3 活动添加订单信息
     * @version 170602 1.0
     * @param {String} *orderTime    订单时间 格式y-m-d
     * @param {String} *shop         活动订单店铺
     * @param {String} *orderNumber  订单号
     * @param {String} *ww           旺旺ID
     * @param {String} *bankName     银行名称
     * @param {String} *bankNumber   银行卡号
     * @param {String} *userName     持卡人姓名
     * @param {String} *phone        联系电话
     * @param {String} *consignName  收货人姓名
     * @param {String} *consignPhone 收货人电话
     * @param {String} retRemark    备注
     */
    do_event_cash_back_add: '/adm/welfarereturn/add',

    /**
     * [需登录] 21.4 用户返现进度信息
     * @version 170602 1.0
     */
    get_event_cash_back_progress: '!/adm/welfarereturn/progress',

    /**
     * 21.5 用户重新提交资料
     * @version 170605 1.0
     * @param {String} *orderTime    订单时间 格式y-m-d
     * @param {String} *shop         活动订单店铺
     * @param {String} *orderNumber  订单号
     * @param {String} *ww           旺旺ID
     * @param {String} *bankName     银行名称
     * @param {String} *bankNumber   银行卡号
     * @param {String} *userName     持卡人姓名
     * @param {String} *phone        联系电话
     * @param {String} *consignName  收货人姓名
     * @param {String} *consignPhone 收货人电话
     * @param {String} retRemark    备注
     */
    do_event_cash_back_update: '/adm/welfarereturn/updateInfo',

    /**
     * [需登录] 21.6 用户返现资料
     * @version 170605 1.0
     */
    get_event_cash_back_detail: '!/adm/welfarereturn/get',

    /**
     * 21.7 活动列表
     * @version 170607 1.0
     */
    get_event_list: '/adm/acvitity/acvitityList',

    /**
     * 21.8 活动详情
     * @version 170607 1.0
     * @param {Int} *tbId 表自增ID
     */
    get_event_detail: '/adm/acvitity/get',

    /**
     * 21.9 验证订单是否已存在
     * @version 170608 1.0
     * @param {String} *orderNumber 订单号/物流单号
     */
    'do_event_check-order-is-exist': '/adm/welfarereturn/isExistOrderNumber',

    /* ==================== 22 论坛 ==================== */
    /**
     * 22.0 论坛-社区分类
     * @version 170613 1.0
     * @param {Int}    state     显示状态：(0:隐藏 1:正常 3:群组 空：所有)
     * @param {String} forumType 类型：forum:普通论坛 sub:子论坛 group:分类；已默认forum
     * @param {Int}    limit     返回条数，默认所有
     */
    get_bbs_blocks: '/discuz/forumforum/getforumclass',

    /**
     * 22.1 论坛-公告
     * @version 170613 1.0
     * @param {Int} forumId 版块id，公告id=68
     * @param {Int} limit   返回条数，默认2条
     */
    'get_bbs_notice-list': '/discuz/forumthread/getlist',

    /**
     * 22.2 论坛-本汀家园 主贴列表
     * @version 170613 1.0
     */
    'get_bbs_home-list': '/discuz/forumthread/threadlist',

    /**
     * 22.3 论坛-主帖列表（搜索页）
     * @version 170613 1.0
     */
    get_bbs_list: `${Const.__NEW_API__}/postlist`,

    /**
     * 22.4 论坛-版块数据统计
     * @version 170613 1.0
     * @param {Int} forumId 分类Id（版块id号）
     */
    'get_bbs_block-statistic': '/discuz/forumforum/getforumcount',

    /**
     * 22.5 论坛-发帖、回帖
     * @version 170615 1.0
     * @param {Int}    forumId  分类Id（版块id号）
     * @param {String} title    贴子标题
     * @param {String} *content 贴子内容
     * @param {String} json     保存editorState
     * @param {Int}    parentId 所回复的贴子id（父id），回帖必填
     * @param {Int}    *type    类型：1.发主帖 2.回帖
     */
    do_bbs_posted: '/discuz/forumpost/posted',

    /**
     * 22.6 论坛-贴子详情
     * @version 170615 1.0
     */
    'get_bbs_post-detail': '/discuz/forumpost/detail',

    /**
     * 22.7 论坛-帖子详情页的评论列表
     * @version 170615 1.0
     */
    'get_bbs_post-comment-list': '/discuz/forumpost/postcomment',

    /**
     * 22.8 论坛-帖子投票（点赞）
     * @version 170629 1.0
     * @param {Int} *postId 帖子ID号
     * @param {Int} *n      标识：1.支持 -1.反对
     */
    do_bbs_like: '/discuz/forumhotreplynumber/dolike',

    /**
     * 22.9 论坛-我的收藏
     * @version 170629 1.0
     * @param {Int}    *dataId 数据id（被收藏id号）
     * @param {Int}    *type   类型：aid.文章 albumid.照片 fid.版块 tid.主帖
     * @param {String} tit     标题
     * @param {String} remark  备注
     */
    do_bbs_favorite: '/discuz/homefavorite/add',

    /**
     * 22.10 论坛-帖子列表我的点赞及收藏（返回对应id）
     * @version 170629 1.0
     * @param {String} threadId 以根据列表threadId查询，多个‘,’分开（推荐）
     */
    'get_bbs_like-and-favorite-list': '!/discuz/forumpost/myPostListAt',

    /**
     * 22.11 论坛-修改我的主题帖
     * @version 170801 1.0
     * @param {Int}    *postId 帖子ID号
     * @param {String} title   帖子标题
     * @param {String} content 帖子内容
     * @param {String} json    Json content
     */
    'do_bbs_post-update': '/discuz/forumpost/update',

    /**
     * 22.12 论坛-修改我的回复帖
     */
    /**
     * 22.13 论坛-删除我的主帖
     * @version 170720 1.0
     * @param {Int} *postId 帖子ID号
     */
    'do_bbs_delete-post': '/discuz/forumpost/del',

    /**
     * 22.14 论坛-删除我的回帖
     */
    /**
     * 22.15 论坛-帖子积分打赏
     * @version 171016 1.0
     * @param {Int} *threadId 主题ID号
     */
    'do_bbs_scoretips-post': '/discuz/forumpost/scoretips',

    /**
     * 22.16 论坛-帖子打赏列表
     * @version 171016 1.0
     * @param {Int} *threadId 主题ID号
     */
    'get_bbs_scoretips-list': '/discuz/forumpost/tipslist',

    /**
     * 22.x 我的贴子
     * @version 170708 1.0
     * @param {String}
     */
    'get_bbs_my-post-list': '/discuz/forumpost/mypost',

    /**
     * 22.x 我的收藏
     * @version 170708 1.0
     * @param {String}
     */
    'get_bbs_my-favor-list': '/discuz/forumpost/myPostFavorite',

    /* ==================== 23 活动 ==================== */
    /**
     * 23.1 报名活动
     * @version 170609 1.0
     * @param {Int} *perateId 活动id号
     */
    do_event_join: '/adm/acvitity/signup',

    /**
     * [需登录] 23.5 我的活动列表
     * @version 170612 1.0
     * @param {Int} *perateId 活动id号
     */
    'get_person-event_list': '!/user/myAcvitity',

    /* ==================== 24 经销商 ==================== */
    /**
     * 24.0 经销商提交信息
     * @version 170609 1.0
     * @param {String} *name         用户名
     * @param {String} mail          邮件地址
     * @param {String} *pwd          密码
     * @param {String} *phone        手机号
     * @param {String} firm          公司名
     * @param {String} contact       联络人
     * @param {String} work          职位
     * @param {String} faxNo         传真
     * @param {String} place         地址
     * @param {String} qq            qq
     * @param {String} weburl        网站地址
     * @param {String} explain       备注说明
     * @param {String} recommender   推荐人
     * @param {String} recommenderMb 推荐人手机
     * @param {Int}    image1        营业照片id
     * @param {Int}    image2        店铺照片id
     * @param {Int}    image3        手持照片id
     * @param {Ints}   ctImage       租赁合同照片id号，多个用‘,’隔开
     * @param {String} area          所在地区
     */
    'do_activity-register-shop_register': '/dealer/info/add',

    /**
     * [需登录] 24.1 获得经销商信息
     * @version 170612 1.0
     * @param {Int} *perateId 活动id号
     */
    'get_activity-register-shop_detail': '!/dealer/info/get',

    /**
     * 24.2 修改经销商信息
     * @version 170612 1.0
     * @param 同24.0
     */
    'do_activity-register-shop_update': '/dealer/info/update',

    /* ==================== 25 粉丝 ==================== */
    /**
     * 25.0 添加粉丝认证资料
     * @version 170704 1.0
     * @param {String} userName    会员昵称
     * @param {Int}    typeId      购买平台类型id：1.天猫：本汀旗舰店，2.淘宝：西门町台客名品，3.京东：本汀渔具旗舰店，4.苏宁：本汀旗舰店，5.本汀官网，6.天猫：本汀麦酥专卖店
     * @param {String} typeName    购买平台类型名称
     * @param {String} goods       购买产品
     * @param {String} orderNo     订单号
     * @param {String} buyName     购买账号
     * @param {String} phone       手机号
     * @param {Int}    defaultPic  图片
     * @param {String} createTime  提交时间截
     * @param {String} authTime    审核时间截
     * @param {Int}    state       状态：1.待审核，2.审核通过，3.审核不通过
     * @param {Int}    proofImg    凭证图片
     * @param {String} shopName    实体店名
     * @param {Int}    channelType 1：平台购买认证，2：实体店购买认证
     */
    'do_fans-prove_add': '/users/userauthlogs/add',

    /**
     * 25.1 获得粉丝认证资料
     * @version 170704 1.0
     */
    'get_fans-prove_list': '/users/userauthlogs/get',

    /**
     * 25.2 修改粉丝认证资料
     * @version 170704 1.0
     * @param 同25.0
     */
    'do_fans-prove_update': '/users/userauthlogs/update',

    /**
     * 25.3 检测用户是否已通过粉丝认证
     * @version 170704 1.0
     */
    'get_user_fans-state': '!/users/userauthlogs/fansAuth',

    /* ==================== 26 欢乐猜鱼 ==================== */
    /**
     * 26.1 欢乐猜鱼列表
     * @version 170711 1.0
     * @param {Int} guessId
     */
    'get_guess-everday_list': '/competition/guessList',
    'get_new_guess-everday_list': `${Const.__NEW_API__}/guesslist`,

    /**
     * 26.1.1 欢乐猜鱼详情
     * @version 180203 1.0
     * @param {Int} guessId
     */
    'get_new_guess-everday_detail': `${Const.__NEW_API__}/guessdetail`,

    /**
     * 26.2 提交竞猜信息
     * @version 170711 1.0
     * @param {String} *information 竞猜内容
     * @param {Int}    *guessId     活动ID
     */
    'do_guess-everday_guessing': '/competition/addGuess',

    /**
     * 26.3 竞猜信息列表
     * @version 170711 1.0
     * @param {Int} *guessId 活动ID
     */
    'get_guss-everday_guessing-list': '/competition/competitionList',

    /**
     * 26.4.1 新---我的竞猜列表
     * @version 180205 1.0
     * @param {Int} *guessId 活动ID
     */
    'get_my_point_guess-list': `${Const.__NEW_API__}/mypointguess`,
    'get_my_gold_guess-list': `${Const.__NEW_API__}/mygoldguess`,

    /* ==================== 27 抽奖 ==================== */
    /**
     * 27.0 抽奖奖品列表（轮盘）
     * @version 170704 1.0
     * @param {Int} lid 抽奖id，如有多个抽奖可指定
     */
    get_lottery_list: '/lottery/lotterylist',

    /**
     * 27.01 检测用户否有可抽奖的次数
     * @version 170705 1.0
     * @param {Int} lid 抽奖id，如有多个抽奖可指定
     */
    'get_lottery_left-count': '/lottery/islottery',

    /**
     * 27.1 点击开始抽奖
     * @version 170704 1.0
     * @param {Int} lid 抽奖id，如有多个抽奖可指定
     */
    do_lottery: '/lottery/go',
    do_lottery_new: '/lottery/reggo',

    /**
     * 27.2 我的抽奖记录（奖品）
     * @version 170704 1.0
     * @param {Int} isWin 是否中奖：1.是 0.否
     * @param {Int} state 状态：1.未领奖 2.已领奖 3.已使用
     */
    'get_my-prize_list': '/lottery/recordlist',

    /**
     * 27.2.1 删除我的奖品（优惠券）
     * @version 171020 1.0
     * @param {Int} *tbId 数据id号，多个用‘,’隔开
     * @param {Int} del   0.恢复  已默认1.删除
     */
    'do_my-prize_del': '/lottery/delmyprize',

    /**
     * 27.3 我的抽奖记录详情
     * @version 170705 1.0
     * @param {Int} recordId 抽奖记录id号
     */
    'get_my-prize_detail': '/lottery/recordDetail',

    /**
     * 27.4 检测是否已绑定淘宝旺旺账号
     * @version 170705 1.0
     */
    'get_user_is-bind-ww': '/lottery/isbindww',

    /**
     * 27.5 绑定淘宝旺旺账号
     * @version 170705 1.0
     * @param {String} *ww 淘宝旺旺账号
     */
    'do_user_bind-ww': '/lottery/bindww',

    /**
     * 27.6 抽奖 - 领取优惠券
     * @version 170706 1.0
     * @param {Int} *cid 优惠券id(lorreylist列表tbId)
     */
    'do_lottery_get-coupon': '/lottery/coupon',

    /**
     * 27.7 抽奖 - 提交银行卡信息、购买信息
     * @version 170706 1.0
     * @param {Int}    *recordId     我的奖品记录id号(tbId)
     * @param {String} *orderNo      淘宝订单号
     * @param {String} *bankNo       银行卡号
     * @param {String} *cardUsername 持卡人名称
     * @param {String} *bankName     开户银行
     * @param {String} branchName    开启支行
     */
    'do_lottery_submit-coupon-cashback-info': '/lottery/postbankcard',

    /**
     * 27.X 抽奖 - 新手抽奖中奖列表
     * @version 171017 1.0
     */
    'get_lottery_new-win-list': '/lottery/winlist',

    /**
     * 28.0 绑定银行卡信息
     * @version 170719 1.0
     * @param {Int}    *bankType     银行卡类型
     * @param {String} *bankName      开户银行
     * @param {String} *branchName       开户支行
     * @param {String} *bankNo 银行卡号
     * @param {String} *cardUsername     持卡人姓名
     */
    do_user_bind_bank: '/users/userbankcard/add',

    /**
     * 28.1 获取银行卡分类
     * @version 170720 1.0
     */
    get_user_bank_type: '/users/userbankcard/getbanktype',

    /**
     * 28.1 获得银行卡信息
     * @version 170720 1.0
     */
    get_user_bank_info: '/users/userbankcard/get',

    /**
     * 29.0 首页模块活动图标提示
     * @version 170721 1.0
     */
    get_event_processing: '/users/usercount/mkcount',

    /**
     * 29.10 商城 - 获得商品列表 (不分页)
     * @version 1709029 1.0
     */
    'get_shop_goods-list': '/shop/goods/getlist',

    /**
     * 29.11.0.1 商城 - 产品列表
     * @version 171024 1.0
     */
    'get_goods-list': '/shop/goods/goodslist',

    /**
     * 29.11.0.1 商城 - 推荐产品列表 （本汀官网等）
     * @version 171024 1.0
     */
    'get_recommend-list': '/shop/product/recommendlist',

    /**
     * 29.11.0.2 商城 - 产品详情
     * @version 171024 1.0
     */
    'get_recommend-details': '/shop/product/details',

    /**
     * 29.11.0.4 商城 - 商品类目列表
     * @version 171025 1.0
     */
    'get_product_type-list': '/shop/product/typelist',

    /**
     * 29.11.0.4.1 商城 - 商品类目列表树
     * @version 171025 1.0
     */
    'get_product_type-tree': '/shop/product/typetree',

    /**
     * 29.11.0.4.2 商城 - 商品类目子类及它的父们
     * @version 171025 1.0
     */
    'get_product_type_parent-tree': '/shop/product/typeparenttree',

    /**
     * 29.11.0.5 商城 - 随机商品列表-不分页（您可能还喜欢）
     * @version 171222 1.0
     */
    'get_goods_random-List': '/shop/goods/randomGoodsList',

    /**
     * 29.11.X 商城 - 商品列表[发布渔获使用]
     * @version 180313 1.0
     * @search {Int} *goodsType
     */
    'get_shop_only-goods-list': '/shop/goods/getGiftGoodsList',

    /**
     * 29.11.X 商城 - 特殊商品[发布渔获使用]
     * @version 180313 1.0
     */
    'get_shop_special-goods': '/shop/goods/getgiftList',

    /* ==================== 30 一元夺宝 ==================== */
    /**
     * 30.0 一元夺宝活动期数列表
     * @version 170801 1.0
     */
    get_indiana_tabs_list: '/shop/oncebuy/gettimeNo',

    /**
     * 30.1 一元夺宝详情
     * @version 170801 1.0
     * @param {Int}    *oncebuyId     期数id
     */
    get_indiana_info: '/shop/oncebuy/getdetail',

    /**
     * 30.2.0.1 一元夺宝中奖记录详情、计算详情
     * @version 1708014 1.0
     */
    get_indiana_win_detail: '/shop/oncebuylogs/winDetail',

    /**
     * 30.2.0.2 我的夺宝记录详情
     * @version 1708014 1.0
     */
    get_indiana_logs_detail: '/shop/oncebuylogs/detail',

    /**
     * 30.2.1 一元夺宝记录
     * @version 170801 1.0
     */
    get_indiana_list: '/shop/oncebuylogs/search',

    /**
     * 30.2.1.1 一元夺宝记录状态修改
     * @version 170801 1.0
     */
    do_upstate_indiana: '/shop/oncebuylogs/upstate',

    /**
     * 30.2.2 我的一元夺宝记录
     * @version 170801 1.0
     */
    get_my_indiana_list: '/shop/oncebuylogs/myoncebuylist',

    /**
     * 30.3 立即夺宝
     * @version 170801 1.0
     * @param {Int}    *oncebuyId     期数id
     * @param {Int}    *buypernum     参与人次
     */
    do_indiana: '/shop/oncebuy/buy',

    /**
     * 30.3.1 订单 - 提交订单公用接口
     * @version 170810 1.0
     * @param {Int} *orderType 订单类型：0.常规订单 1.一元夺宝 2.快递费 50.微信充值 51.支付宝充值 100.提现
     * @param {Int} *price     充值金额(元)
     */
    do_pay_order: '/shop/order/addorder',

    /**
     * 30.3.2 订单 - 修改订单状态接口
     * @version 170811 1.0
     * @param {Int} *orderId 订单ID号
     * @param {Int} *state     订单状态：0.待确认 1.已确认 2.待发货 3.已发货 4.已签收 5.完成交易 6.已取消 7.用户删除
     */
    do_upstate_pay_order: '/shop/order/upstate',

    /**
     * 30.3.3 订单 - 获得订单支付参数（未支付）
     * @version 170813 1.0
     * @param {Int} *orderId 订单ID号
     */
    get_pay_order_info: '/shop/order/getorderpay',

    /**
     * 30.3.2.1 订单 - 修改订单状态接口
     * @version 170811 1.0
     * @param {Int}     *orderId    订单ID号
     * @param {Int}     addressId     用户地址id，不传自动获得已默认地址
     */
    do_upstate_address: '/shop/order/upGetDefAddress',

    /**
     * 30.4 夺宝成功订单详情
     * @version 170808 1.0
     * @param {Int}         orderId      订单id号
     * @param {string}    orderNo     订单号
     */
    get_indiana_order_info: '/shop/order/detail',

    /**
     * 30.4.0 购买VIP
     * @version 170929 1.0
     * @param {Int}         *gid      VIP商品id
     * @param {string}    *monthNum     购买月数 , 如：12/年
     */
    do_buy_vip: '/shop/order/buyvip',

    /**
     * 30.4.0.1 修改订单详情商品项
     * @version 171010 1.0
     * @param {Int}         *itemId      订单商品项id号（表id）
     * @param {string}    spec     规格
     */
    'do_upstate_order-Item': '/shop/order/updateItem',

    /**
     * 30.4.1退订VIP
     * @version 171019 1.0
     * @param {Int} *num 年
     */
    do_vip_refund: '/users/uservip/viprefunds',

    /**
     * 30.5 订单支付 - 公用接口
     * @version 170810 1.0
     * @param {String} *orderId 订单id号
     * @param {string} *payType 支付方式：1.充值支付（余额不足） 2.余额支付
     */
    do_wx_pay: '/wx/pay',

    /**
     * 30.5.1 微信h5支付
     * @version 170813 1.0
     * @param {String} *orderId 订单id号
     * @param {String} *payType 支付方式：1.充值支付（余额不足） 2.余额支付
     * @param {String} path     请求mweb_url后返回的地址
     */
    'do_wx_pay-h5': '/wx/payh5',

    /**
     * 30.5.0.2 支付宝 - 支付
     * @version 180103 1.0
     * @param {String} *orderNo  订单编号
     * @param {String} *payPort  支付端：1.移动端 2.PC端
     * @param {String} returnUrl 支付完成跳转地址
     */
    do_alipay_pay: `${Const.__NEW_API__}/alipay`,

    /**
     * 30.5.2 订单支付 - 结果返回
     * @version 170812 1.0
     * @param {String} *orderId 订单id号
     */
    get_pay_result: '/wx/payresult',

    /**
     * 30.6 我的余额明细
     * @version 170811 1.0
     */
    // 'get_wallet_detail': '/shop/order/myorderlist',

    /**
     * 30.6.1 我的金额明细
     * @version 170811 1.0
     */
    // 'get_wallet_logs': '/users/usergoldlogs/search',

    /**
     * [需登录] 30.7 我的钱包金额
     * @version 170811 1.0
     */
    'get_wallet_nido-info': '!/user/useramount',

    /* ==================== 31 防伪码 ==================== */
    /**
     * 31.0 防伪码-查询
     * @version 170804 1.0
     * @param {Int}    *codeNo     防伪码
     */
    get_code_query: '/code/codelist/query',

    /**
     * 31.1 防伪码-查询记录
     * @version 170804 1.0
     * @param {Int}    *codeNo     防伪码
     */
    get_code_query_list: '/code/codesecuritylogs/querylogs',

    /* ==================== 33 七牛 ==================== */
    /**
     * 33.0 七牛 - 获得上传文件token
     * @version 170825 1.0
     * @doc 上传策略文档：https://developer.qiniu.com/kodo/manual/1206/put-policy
     * @param {Json} policy 上传策略参数，json格式
     */
    get_qiniu_token: '/qiniu/token',

    /**
     * 33.1 七牛 - 获得上传文件key
     * @version 170825 1.0
     * @param {Int} num 获得key数量，默认1个，最多10个
     */
    get_qiniu_key: '/qiniu/getKey',

    /**
     * 33.2 七牛 - 获得上传持久化状态查询
     * @version 170825 1.0
     * @param {String} persistentId 持久化唯一ID
     */
    get_qiniu_state: '/qiniu/pfopState',

    /**
     * 33.3 七牛 - 获得文件信息
     * @version 170825 1.0
     * @param {String} key 文件key
     */
    'get_qiniu_file-info': '/qiniu/getfileinfo',

    /* ==================== 34 提现 ==================== */
    /**
     * 34.1 用户提现
     * @version 170829 1.0
     * @param {String} *price 提现金额
     */
    do_bt_withdraw: `${Const.__NEW_API__}/btwithdraw`,

    /* ==================== 35 秒杀 ==================== */
    /**
     * 35.0 秒杀 - 获得列表信息
     * @version 170912 1.0
     * @param {String} *price 提现金额
     */
    'get_shop_miaosha-list': '/shop/panicbuy/panicbuylist',

    /**
     * 35.1 秒杀 - 获得活动信息
     * @version 170912 1.0
     * @param {Int} *panicId 秒杀活动id号
     */
    'get_shop_miaosha-detail': '/shop/panicbuy/getpanicbuy',

    /**
     * 35.2 秒杀 - 获得记录列表
     * @version 170914 1.0
     * @param {Int} *panicId 秒杀活动id号
     */
    'get_shop_miaosha-record': '/shop/panicbuy/getpanicbuylogs',

    /**
     * 35.3 秒杀 - 抢购
     * @version 170914 1.0
     * @param {Int} *panicId 秒杀活动id号
     */
    do_shop_miaosha: '/shop/panicbuy/buy',

    /**
     * 35.4 秒杀 - 我的秒杀商品
     * @version 170914 1.0
     * @param {Int} *panicId 秒杀活动id号
     */
    'get_shop_miaosha-my-record': '/shop/panicbuy/myPanicbuyList',

    /* ==================== 37 资讯 ==================== */
    /**
     * 37.1 官网 -资讯列表
     * @version 171011 1.0
     */
    get_article_list: '/article/search',

    /**
     * 37.2 官网 -资讯详情
     * @version 171011 1.0
     * @param {Int}    *tbId     资讯id
     */
    get_article_detail: '/article/getarticle',

    /**
     * 38.0 抢红包
     * @version 171027 1.0
     * @param {Int} *packetId 红包Id
     */
    do_redpacket_get: '/redpacket/getredpacket',

    /**
     * 38.1 发红包
     * @version 171121 1.0
     */
    do_redpacket_send: '/redpacket/sendredpacket',

    /**
     * 39.1 视频添加
     * @version 171101 1.0
     * @param {Int}    *fileId  文件id号
     * @param {String} *tit     标题
     * @param {String} introCon 描述
     * @param {String} tag      标签，逗号分隔
     */
    'do_video-v2_add': '/video/add',

    /**
     * 39.2 视频编辑
     * @version 171101 1.0
     * @param {Int}    *fileId  文件id号
     * @param {String} *tit     标题
     * @param {String} introCon 描述
     * @param {String} tag      标签，逗号分隔
     */
    'do_video-v2_update': '/video/update',

    /**
     * 39.4视频详情
     * @version 171101 1.0
     */
    get_video_detail: '/video/detail',

    /**
     * 39.5 视频列表
     * @version 171101 1.0
     */
    'get_video_list-list': '/video/videolist',

    /**
     * 39.5.1 视频 - 随机列表 （可能感兴趣）
     * @version 171101 1.0
     */
    'get_random_video_list-list': '/video/randomvideolist',

    /**
     * 39.6 视频点赞
     * @version 171102 1.0
     * @param {Int} *tbId
     * @param {Int} *likeType 点赞类型：1、视频 2、回复
     */
    'do_video-v2_like': '/video/like',

    /**
     * 39.7 视频添加评论
     * @version 171102 1.0
     * @param {Int}    *tbId
     * @param {String} *con  内容
     */
    'do_video-v2_comment': '/video/addcomment',

    /**
     * 39.8 视频评论列表
     * @version 171102 1.0
     */
    'get_video-v2_comment-list': '/video/commentlist',

    /**
     * 39.9 视频获取分类树
     * @version 171213 1.0
     */
    'get_video-v2_type-list': '/video/typelist',

    /**
     * 39.9.1 视频获取分类并返回相关最新一条数据id
     * @version 171213 1.0
     */
    'get_video-v2_type_id-list': '/video/typedidlist',

    /**
     * 39.11 相关视频列表
     * @version 171104 1.0
     */
    'get_video-v2_relative-list': '/video/relate',

    /**
     * 39.12 视屏浏览数+1
     * @version 171106 1.0
     * @params {Int} *tbId
     */
    'do_video-v2_view': '/video/addviewnum',

    /* ==================== 41 天气 ==================== */
    /**
     * 41.1获得天气信息
     * @version 171114 1.0
     */
    get_weather_datail: '/weather/getweather',

    /**
     * 41.2 获得所在城市
     * @version 171114 1.0
     */
    get_weather_city: '/weather/getcity',

    /**
     * 42.1 帮助中心问题列表
     * @version 171118 1.0
     */
    get_user_helps: '/users/userhelps/search',

    /**
     * 42.3 是否有效解决问题
     * @version 171118 1.0
     */
    'do_user_helps-userful': '/users/userhelps/isuseful',

    /**
     * 43.1 打赏
     * @version 171123 1.0
     * @params {int} *dataId  id号
     * @params {int} *typeId  打赏类型  1.视屏 2.发现 3.动吧
     * @params {int} *goodsId 商品（礼物）id号
     */
    do_reward: '/video/reward',
    do_new_reward: `${Const.__NEW_API__}/reward`,

    /**
     * 43.2 打赏列表
     * @version 171123 1.0
     */
    'get_reward-list': '/video/rewardlist',
    'get_new_reward-list': `${Const.__NEW_API__}/rewardlist`,

    /**
     * 43.3 打赏排行
     * @version 171124 1.0
     */
    'get_reward-rank': '/video/rewardrank',

    /* ==================== 44 聊天 ==================== */
    /**
     * 44.0 聊天记录列表
     * @version 171127 1.0
     */
    get_chat_logs: '/chat/chatlogslist',

    /**
     * 44.1 用户聊天提醒数
     * @version 171201 1.0
     */
    // 'get_chat_user-notice': '/chat/chatremindnum',

    /**
     * 44.2 他人私聊我的消息 - 提醒列表
     * @version 171201 1.0
     */
    'get_chat_private-notice': '/chat/chatPriRemindList',

    /**
     * 44.3 他人和我的聊天 - 私聊列表
     * @version 171201 1.0
     */
    'get_chat_private-list': '/chat/chatPrivateList',

    /**
     * 46.0 活跃用户
     * @version 171220 1.0
     */
    'get_bbs_active-user-list': '/discuz/forumpost/positiveuser',

    /* ==================== 47 消费订单 ==================== */
    /**
     * 47.0 添加消费订单
     * @version 180102 1.0
     * @params {string} *shopName 店铺名称
     * @params {int}     orderNo  订单号（线上）
     * @params {string}  cardImg  售后卡图片（线下），多张逗号隔开
     */
    do_consumer_add: '/users/consumer/add',

    /**
     * 48.0 我的订单列表（官网）
     * @version 180103 1.0
     */
    get_consumer_list: '/shop/order/orderlist',

    /**
     * 48.1 我的售后（官网）
     * @version 180103 1.0
     */
    'get_consumer_card-list': '/users/consumer/search',

    /* ==================== 51 BT ==================== */
    /**
     * 51.0.0 本汀福利 - 等级领取状态列表
     * 1.未领取（可领） 2.已领取 3.未达到等级 4.未领取已超过等级
     * @version 180109 1.0
     * @params {Int} *getType 2.升级尊享 3.生日尊享 4.见面有礼
     */
    'get_bt-lottery_grade-info': `${Const.__NEW_API__}/lotterygradelist`,

    /**
     * 51 本汀福利 - 福利列表（现金、优惠券/礼品）
     * @version 180105 1.0
     */
    'get_bt-lottery_list': `${Const.__NEW_API__}/lotterylist`,

    /**
     * 51.1 本汀福利 - 领取现金、优惠券/礼品
     * @version 180105 1.0
     * @param {Int} *lotteryPrizeId 券、礼品唯一ID号
     */
    'do_bt-lottery_get': `${Const.__NEW_API__}/lotterygetcoupon`,

    /**
     * 51.1.1 本汀福利 - 领取 升级尊享、生日尊享、见面有礼、超爽积分 现金/优惠券/礼品
     * @version 180108 1.0
     * @param {Int} *lotteryPrizeId 券、礼品唯一ID号；多张用‘,’号隔
     * @param {Int} *getType        2.升级尊享 3.生日尊享 4.见面有礼 5.超爽积分
     */
    'do_bt-lottery_get-batch': `${Const.__NEW_API__}/lotterygetres`,

    /**
     * 51.2 本汀福利 - 我的物品列表
     * @version 180105 1.0
     */
    'get_bt-lottery_my-list': `!${Const.__NEW_API__}/mylotterylist`,

    /**
     * 51.3 本汀福利 - 我的物品详情
     * @version 180105 1.0
     * @param recordId 领取记录Id
     */
    'get_bt-lottery_my-detail': `!${Const.__NEW_API__}/mylotterydetail`,

    /**
     * 52.0 购买金币
     * @version 180112 1.0
     * @param *amount 金币的金额（整数）
     */
    'do_wallet_buy-coin': `${Const.__NEW_API__}/goldsbuy`,

    /**
     * 51.1.1 本汀轮盘抽 奖 - 奖品列表
     * @version 180122 1.0
     */
    'get_auth-lottery_list': `${Const.__NEW_API__}/lotteryroulettelist`,

    /**
     * 51.1.2 本汀轮盘抽 奖 - 防伪码抽奖
     * @version 180122 1.0
     * @param {String} *code 产品防伪码
     */
    'do_auth-lottery_lottery': `${Const.__NEW_API__}/lotterycode`,

    /**
     * 53.0 支付 - 新接口
     * @version 180112 1.0
     * //@param orderNo 订单号
     * @param *payPort 支付端：1.支付宝移动端 2.支付宝PC端 3.微信内支付 4.微信H5支付 5.微信扫码支付
     * @param *reqType 请求平台：1.灵动 2.本汀 已默认1
     */
    do_pay_alipay: `${Const.__NEW_API__}/alipay`,
    do_pay_wx: `${Const.__NEW_API__}/wechatpay`,
    do_pay_bt: `${Const.__NEW_API__}/btpay`,
    do_pay_ld: `${Const.__NEW_API__}/ldpay`,

    /**
     * 54.0 我的账号余额
     * @version 180113 1.0
     * @param *type 类型 0.全部 1.本汀钱包金额 2.灵动钱包金额 3.金币余额
     */
    get_wallet_info: `!${Const.__NEW_API__}/myamount`,

    /**
     * 54.1 我的资金明细
     * @version 180113 1.0
     * @param *dataType 类型 1.灵动钱包明细 2.金币明细 3.本汀钱包明细
     */
    get_wallet_logs: `!${Const.__NEW_API__}/mygoldlogs`,

    /**
     * X.X 绑定微信
     * @version 180116 1.0
     */
    'do_pay_bind-wx': `${Const.__NEW_API__}/wechat/bind_bt`,

    /**
     * X.X 充值本汀金额（目前仅支持 支付宝/微信）
     * @version 180113 1.0
     * @param *price   充值金额
     * @param *payPort 支付端：1.支付宝移动端 2.支付宝PC端 3.微信内支付 4.微信H5支付 5.微信扫码支付
     */
    get_pay_charge: `${Const.__NEW_API__}/addamount_bt`,

    /**
     * 55.0 新 - 帖子列表 / 踩楼帖子
     * @version 180113 1.0
     */
    get_floor_list: `${Const.__NEW_API__}/floorpostlist`,

    /**
     * 55.1 新 - 帖子详情
     * @version 180113 1.0
     * @param *threadId 主帖id号
     */
    get_floor_detail: `${Const.__NEW_API__}/postdetail`,

    /**
     * 55.2 新 - 帖子评论列表
     * @version 180113 1.0
     */
    get_floor_comment: `${Const.__NEW_API__}/postcomment`,

    /**
     * 55.3 新 - 踩楼回帖
     * @version 180113 1.0
     * @param *parentId 帖子postId
     * @param *threadId 主题id号（帖子评论列表使用threadId）
     * @param *content  回帖内容
     * @param fileId    文件id
     */
    do_floor_comment: `${Const.__NEW_API__}/floorposted`,

    /**
     * 55.3 新 - 发布踩楼
     * @version 180113 1.0
     */
    do_floor_post: `${Const.__NEW_API__}/admin_postedfloor`,

    /**
     * 55.4我的踩楼
     * @version 180116 1.0
     */
    get_my_floor_list: `${Const.__NEW_API__}/myfloor`,

    /**
     * 55.5踩楼领奖
     * @version 180116 1.0
     */
    get_floor_award: `${Const.__NEW_API__}/flooraward`,

    /**
     * 55.6新-设置订单地址
     * @version 180116 1.0
     */
    do_set_order_address: `${Const.__NEW_API__}/setaddress`,

    /**
     * 55.7新-我的地址列表
     * @version 180116 1.0
     */
    get_new_address_list: `${Const.__NEW_API__}/myaddress`,

    /**
     * 55.8新-设置我的地址
     * @version 180116 1.0
     */
    do_new_set_address: `${Const.__NEW_API__}/setmyaddress`,

    /**
     * 55.9新-我的地址删除
     * @version 180116 1.0
     */
    do_new_delete_address: `${Const.__NEW_API__}/deleteaddress`,

    /**
     * 56.2 新 - 首页活动信息
     * @version 180116 1.0
     */
    'get_event_home-info': `${Const.__NEW_API__}/homeactivity`,

    /**
     * 57.0 竞拍列表
     * @version 180124 1.0
     */
    get_auction_list: `${Const.__NEW_API__}/auctionlist`,

    /**
     * 57.1 竞拍
     * @version 180124 1.0
     * @param {Int}   *auctionId 竞拍id号
     * @param {Float} *auctionPrice 竞拍出价（所需价格）
     */
    do_auction: `${Const.__NEW_API__}/auction`,

    /**
     * 57.2 竞拍详情
     * @version 180124 1.0
     */
    get_auction_detail: `${Const.__NEW_API__}/auctiondetail`,

    /**
     * 57.3 竞拍记录列表
     * @version 180124 1.0
     */
    'get_auction_record-list': `${Const.__NEW_API__}/auctionrecord`,

    /**
     * 57.4 竞拍 - 根据用户输入价获得出价详情
     * @version 180125 1.0
     * @param {Int}   *auctionId    竞拍id号
     * @param {Float} *auctionPrice 竞拍出价（用户输入）
     */
    'get_auction_user-add': `${Const.__NEW_API__}/auctionuserpricedetail`,

    /**
     * 57.5 我的竞拍
     * @version 180125 1.0
     */
    'get_my_auction-list': `${Const.__NEW_API__}/myauctionrecord`,

    /**
     * 58.0 订单详情
     * @version 180124 1.0
     */
    get_bt_order_detail: `${Const.__NEW_API__}/orderdetail`,

    /* ==================== 59 附近经销商  ==================== */
    /**
     * 59.0 加盟商店铺信息列表（支持附近搜索）
     * @version 180202 1.0
     * @search {Float} *userLon 查询参数：当前用户经度
     * @search {Float} *userLat 查询参数：当前用户纬度
     * @search {Int}   *distance 查询参数：搜索范围（最小1，单位：公里）
     */
    'get_merchant_shop-list': `${Const.__NEW_API__}/allianceshoplist`,

    /**
     * 59.1 加盟商店铺详情
     * @version 180202 1.0
     * @param {Int} *allianceId
     */
    'get_merchant_shop-detail': `${Const.__NEW_API__}/allianceshopdetail`,

    /* ==================== 60 天津展会 ==================== */
    /**
     * 60.0 活动 - 现场短信验证并注册
     * 注册成功默认密码：8个8
     * @version 180207 1.0
     * @param {String} *phone 手机号
     * @param {String} *code  验证码（注册验证码）
     */
    'do_event-tianjin_register': `${Const.__NEW_API__}/activityregred`,

    /**
     * 60.2 活动 - 现场工作人员确认并领取红包（用户登录）
     * @version 180207 1.0
     * @param {String} *tk
     */
    'do_event-tianjin_get-red-packet': `${Const.__NEW_API__}/activitygetrednow`,

    /**
     * 60.3 活动 - 我的现场领取红包记录
     * @version 180208 1.0
     */
    'get_event-tianjin_record': `${Const.__NEW_API__}/myactivityredrecord`,

    /**
     * 70.0 汀友会 - 加入加盟商并注册
     * 1.如果账号已存在直接加入加盟商所属汀友会
     * 2.如果账号不存在自动注册并加入加盟商所属汀友会
     * @version 180224 1.0
     * @param {String} *mobile     手机号
     * @param {Int}    *code       验证码（注册验证码）
     * @param {Int}    *allianceId 加盟商ID
     * @param {Float}  *lon        经度
     * @param {Float}  *lat        纬度
     * @param {String} pwd         密码，新用户必填
     */
    do_register_alliance: `${Const.__NEW_API__}/alliancereg`,

    /**
     * 70.1 汀友会-获得一条汀友会相关信息
     * @version 180224 1.0
     */
    get_alliance_info: `${Const.__NEW_API__}/getassembly`,

    /**
     * 71.1 微信红包 - 注册并发送微信红包
     * @version 180227 1.0
     * @param {String} *mobile 手机号
     * @param {Int}    *code   验证码（注册验证码）
     * @param {String} *openId 微信用户openid（回调地址有此参数）
     * @param {String} pwd     密码，新用户必填
     */
    'do_register_red-packet': `${Const.__NEW_API__}/regsendwxredpacket`,

    /**
     * 72.0 话题帖子发送/回复
     * @version 180323 1.0
     * @param {Int}    parentId 所回复的贴子id（父id），回帖必填
     * @param {Int}    threadId 主题id号（帖子评论列表使用threadId）
     * @param {String} title    贴子标题
     * @param {String} *content 贴子内容
     * @param {String} json     保存editorState
     * @param {Int}    *type    类型：1.发主帖 2.回帖
     */
    do_topic_posted: `${Const.__NEW_API__}/topicposted`,

    /**
     * 73.0 话题列表
     * @version 180324 1.0
     */
    get_topic_list: `${Const.__NEW_API__}/topiclist`,

    /**
     * 73.1 今日话题单条
     * @version 180324 1.0
     */
    get_topic_today: `${Const.__NEW_API__}/topictoday`,

    /**
     * 73.2 检查话题是否已发帖
     * @version 180324 1.0
     * @param {Int} *topicId 话题ID
     */
    'do_topic_is-posted': `!${Const.__NEW_API__}/istopicposted`,

    /* ==================== 竞猜 ==================== */
    /**
     * X.X 竞猜记录
     * @version 180528 1.0
     */
    'get_competition_record-list': `${Const.__NEW_API__}/bettinglist`,

    /**
     * X.X 竞猜
     * @version 180528 1.0
     * @param {Int} *thread_id 贴子ID
     * @param {Int} *player_id 参赛选手ID
     * @param {Int} *amount    投注金额
     */
    do_competition_betting: `${Const.__NEW_API__}/betting`,

    /* ==================== 100 报名 ==================== */
    /**
     * 100.1 获得报名资料
     * @version 180626 1.0
     * @param {Int} *thread_id 贴子ID
     */
    get_registration_detail: `!${Const.__NEW_API__}/getregistrationdetail`,

    /**
     * 100.2 报名
     * @version 180626 1.0
     * @param {Int}    *thread_id 贴子ID
     * @param {String} *name      姓名
     * @param {Int}    *phone     手机号
     * @param {String} *ww        旺旺号
     * @param {String} *province  省份
     * @param {String} *city      城市
     * @param {String} *county    县/区
     * @param {String} *address   街道信息
     * @param {String} qq         QQ
     * @param {String} wechat     微信
     * @param {String} message    客户留言
     */
    do_registration_register: `${Const.__NEW_API__}/register`,

    /**
     * 100.3 取消报名
     * @version 180626 1.0
     * @param {Int} *thread_id 贴子ID
     */
    do_registration_cancel: `${Const.__NEW_API__}/cancelregistration`,

    /**
     * 100.4 提交/重新提交订单信息
     * @version 180626 1.0
     * @param {Int}    *thread_id 帖子ID
     * @param {String} *order_no  订单号
     * @param {String} *bank_card 银行卡号
     * @param {String} *bank_name 开户行
     * @param {String} *bank_user 开户人
     */
    'do_registration_submit-order': `${
      Const.__NEW_API__
    }/submitregistrationorder`,

    /**
     * 100.5 用户活动列表
     * @version 180627 1.0
     */
    get_registration_records: `!${Const.__NEW_API__}/userregistrationlist`,

    /**
     * 100.6 用户活动详情
     * @version 180627 1.0
     * @param {Int} *registration_id
     */
    'get_registration_record-detail': `!${
      Const.__NEW_API__
    }/getregistrationdetailbyid`,

    /**
     * 首页话题讨论
     * http://doc.nidosport.com/web/#/1?page_id=15
     * @version 180701 1.0
     */
    'get_home_topic-list': `${Const.__NEW_API__}/topicdetail`,

    /**
     * [渔获有礼]分类讨论数计数
     * @version 180809 1.0
     */
    'get_discovery-fish_category-count': `${
      Const.__NEW_API__
    }/discovery_fishcategory`,

    /* ==================== 101 新版防伪码 ==================== */
    /**
     * 用户绑定防伪码获取积分返回查询结果
     * @version 180813 1.0
     * @param {String} *codeNo  防伪码
     * @param {Int}    fileId   上传文件ID
     * @param {Int}    payOrder 用户上传的订单ID（获取积分为必填）
     */
    'get_new-code_auth': '/code/codelist/quercode',

    /**
     * 防伪码查询
     * @version 180813 1.0
     * @param {String} *codeNo 防伪码
     */
    'get_new-code_search-logs': '/code/codesecuritylogs/queryLogs',

    /**
     * 获取防伪码自定义属性
     * @version 180813 1.0
     * @param {String} *codeNo 防伪码
     */
    'get_new-code_detail': '/code/codelist/getcoderow',

    /**
     * 防伪码纠正
     * @version 180813 1.0
     * @param {String} *codeNo    防伪码
     * @param {String} *reTitle   现有错误的商品名
     * @param {String} *rowTitle  修改后的商品名
     * @param {String} logRemarks 备注
     */
    'do_new-code_corret': '/code/codelist/abnormal',

    /**
     * 商家绑定防伪码
     * @version 180813 1.0
     * @param {String} *codeNo 伪码
     */
    'do_new-code_bind-merchant': '/code/codelist/business',

    /**
     * 36.0 推广 - 获得用户邀请码
     * @version 180829 1.0
     */
    get_invite_code: '/code/invitecode/userinvitecode',

    /**
     * 36.1 推广 - 用户邀请记录
     * @version 180829 1.0
     */
    get_invite_record: '/code/invitecode/userInvitelogs',

    /**
     * 36.2 推广 - 短信邀请
     * @version 180829 1.0
     * @params {String} *phone 手机号
     */
    'do_invite_send-sms': '/code/invitecode/sendInviteCode',

    /**
     * 投票操作
     * @version 181009 1.0
     * @param {Int}   *fid   板块id
     * @param {Int}   *vid   投票踩楼贴详情表id(主键)
     * @param {Int}   *pid   bt_forum_post主键
     * @param {Int}   *tid   bt_forum_thread主键
     * @param {Array} *goods 投票的商品，[{“gid”:1,”name”:”商品1”},{“gid”:2,”name”:”商品2”}]
     */
    do_vote_voting: `${Const.__NEW_API__}/votefloor/voting`,

    /**
     * 投票结果
     * @version 181009 1.0
     * @param {Int} *tid 帖子ID
     */
    get_vote_detail: `${Const.__NEW_API__}/votefloor/detail`
  };
}

initApis();

/**
 * 请求
 * @version 170527 1.2
 * @version 170714 1.3
 * @version 171204 2.0 @next
 */
const _fetch = async (api, query, isSubmitApi = false) => {
  const tk = G.getState('tk');
  const isUrl = api.indexOf('https://') !== -1 || api.indexOf('http://') !== -1;
  let response;

  // 为了后端正确判断，把空的order和search过滤掉
  const _query = Utils.deepCopy(query);
  if (_query._) {
    if (_query._.order && Object.keys(_query._.order).length === 0) {
      delete _query._.order;
    }
    if (_query._.search && Object.keys(_query._.search).length === 0) {
      delete _query._.search;
    }
  }

  if (isSubmitApi) {
    response = await fetch(`${isUrl ? '' : Const.__API__}${api}?tk=${tk}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: Utils.getQueryStr({
        ..._query
      })
    });
  } else {
    response = await fetch(
      `${isUrl ? '' : Const.__API__}${api}?${Utils.getQueryStr({
        tk,
        ..._query
      })}`
    );
  }

  return response.json();
};

/**
 * POST
 * @version 170424 1.0
 * @version 170508 1.1 优化了服务器出错时的处理
 * @version 170527 1.2 单例confirm；某些接口需要登录才允许请求
 * @version 170613 1.3 优化了判断不提示错误的流程
 * @version 170717 1.4 配合app端，tk覆盖本地tk
 * @version 170721 1.5 加入plantform；未登录和登录过期引入回调机制
 * @version 171204 2.0 @next
 * @param {String}   *api        api映射key值
 * @param {Object}   query       请求参数
 * @param {Object}   config      配置参数
 *        {Boolean}  config.show 请求时显示Toast；
 *        {Function} config.fail 服务器端请求结果失败自定义回调
 */
let _confirming = false;
const P = async (api, query = {}, config = {}) => {
  const tk = Utils.getQuery('tk');
  if (tk) {
    G.updateTk(tk);
  }

  return new Promise(async (resolve, reject) => {
    const { show = true, fail, defaultValue = {} } = config;

    let apiAddress = apis[api];
    const isNeedLogin = apiAddress.indexOf('!') === 0; // 需要登录才请求
    const isShowError = apiAddress.indexOf('!!') !== 0; // 出错不提示
    const isSubmitApi = api.indexOf('get_') !== 0; // 接口是否操作型
    const isShowToast = show && isSubmitApi; // 是否显示请求Toast

    if (isShowToast) {
      Utils.loading();
    }

    try {
      if (isNeedLogin) {
        if (!G.getState('tk')) {
          if (Const.__SERVER__) {
            // [SSR]_code = -1，服务器端把请求延迟到客服端请求的手段
            resolve({
              ...defaultValue,
              _loaded: false,
              _code: -1
            });
            Utils.log('Api', api, -1);
          } else {
            resolve({
              ...defaultValue,
              _loaded: false,
              _code: -1
            });
            Utils.log('Api', api, '未登录，不请求');

            if (isShowToast) {
              Toast.hide();
            }
          }

          return;
        }

        apiAddress = apiAddress.replace(/!/g, '');
      }

      const res = await _fetch(apiAddress, query, isSubmitApi);

      // 以下处理请求完毕操作
      if (isShowToast) {
        Toast.hide();
      }

      if (Const.__DEV__) {
        Utils.log('Api', api, parseInt(res.code));
      }

      switch (parseInt(res.code)) {
        // [0] 请求成功
        case 0:
          resolve(res.data);
          break;

        // [1] 未登录(单例confirm)
        case 1:
          if (Const.__CLIENT__) {
            if (isShowError && !_confirming) {
              _confirming = true;

              Utils.onConfirm(
                '该页面部分信息需要登录后才能正常显示，前往登录?',
                () => {
                  G.setJump();
                  Utils.router.push('/login');
                  _confirming = false;
                },
                undefined,
                () => {
                  // #todo 斟酌一下更好的方案
                  // Utils.router.back();
                  _confirming = false;
                }
              );
            }
          }

          // reject(new Error(`[${api}] ${res.err}`));
          reject(`[${api}] ${res.err}`);
          break;

        // [306] 登录过期(单例confirm)
        case 306:
          if (Const.__CLIENT__) {
            // 登录过期后，马上把tk清空且本地化
            G.setState('', 'tk');
            G.setCache();

            if (isShowError && !_confirming) {
              _confirming = true;

              Utils.onConfirm(
                '登录信息已过期，前往登录?',
                () => {
                  G.setJump();
                  Utils.router.replace('/login');
                  _confirming = false;
                },
                undefined,
                () => {
                  _confirming = false;
                }
              );
            }
          }

          // reject(new Error(`[${api}] ${res.err}`));
          reject(`[${api}] ${res.err}`);
          break;

        // [704] 列表没有查到数据
        case 704:
          resolve({
            list: [],
            pageinfo: {
              limit: 1,
              page: 1,
              pagetotal: 0,
              recordtotal: 0
            },
            _loaded: true
          });
          break;

        // 需要粉丝认证
        case 900:
          if (Const.__CLIENT__) {
            if (isShowError && !_confirming) {
              _confirming = true;

              Utils.onConfirm(
                '该版块帖子需要您登录并通过粉丝认证，前往认证?',
                () => {
                  // window.location = 'https://www.nidosport.com/person/fans_prove';
                  Utils.router.replace('/account/fans');
                  _confirming = false;
                },
                undefined,
                () => {
                  Utils.router.back();
                  _confirming = false;
                }
              );
            }
          }

          // reject(new Error(`[${api}] ${res.err}`));
          reject(`[${api}] ${res.err}`);
          break;

        // 需要绑定旺旺ID
        case 1004:
          if (Const.__CLIENT__) {
            if (isShowError && !_confirming) {
              _confirming = true;

              Utils.onConfirm(
                '该操作需要绑定旺旺ID，前往绑定?',
                () => {
                  Utils.router.push('/account/ww');
                  _confirming = false;
                },
                undefined,
                () => {
                  _confirming = false;
                }
              );
            }
          }

          // reject(new Error(`[${api}] ${res.err}`));
          reject(`[${api}] ${res.err}`);
          break;

        // [~] 其他错误
        default:
          // 验证类，不作提示
          if (!isShowError) {
            // reject(new Error(`[${api}] ${res.err}`));
            reject(`[${api}] ${res.err}`);

            // 其他
          } else {
            if (Const.__CLIENT__) {
              const _fail = res => Utils.light(res.err);

              if (typeof fail === 'function') {
                fail(res, _fail);
              } else {
                _fail(res);
              }
            }

            // reject(new Error(`[${api}] ${res.err}`));
            reject(`[${api}] ${res.err}`);
          }
          break;
      }
    } catch (ex) {
      if (isShowToast) {
        Toast.hide();
      }

      if (Const.__CLIENT__) {
        Utils.light('网络请求出错，请刷新');
      }

      /* eslint-disable-next-line */
      console.log(ex);

      // reject(new Error(`[${api}] 严重错误`));
      if (Const.__CLIENT__) {
        reject(`[${api}] in catch 严重错误`);
      } else {
        // #todo 服务器错误情况，暂时这样处理
        resolve(Const.__EMPTY__);
      }
    }
  });
};

/**
 * PPOST 可以控制错误结果流程的POST
 * @version 170613 1.0
 * @param {String} *api
 * @param {Object} query
 * @param {Object} config.show 请求时显示Toast；config.fail 服务器端请求结果失败自定义回调
 */
const PP = (api, query = {}, config = {}) =>
  new Promise(async (resolve, reject) => {
    const { show = true } = config;

    const apiAddress = apis[api].replace(/!/g, '');
    const isSubmitApi = api.indexOf('get_') !== 0; // 判断api是不是操作型的
    const isShowToast = show && isSubmitApi;

    if (isShowToast) Utils.loading();

    try {
      const res = await _fetch(apiAddress, query, isSubmitApi);

      // 以下处理请求完毕操作
      if (isShowToast) Toast.hide();

      switch (parseInt(res.code)) {
        // [704] 列表没有查到数据
        case 704:
          resolve({
            code: 0,
            data: {
              list: [],
              pageinfo: {
                limit: 1,
                page: 1,
                pagetotal: 1,
                recordtotal: 1
              },
              _loaded: true
            }
          });
          break;

        // [~]
        default:
          resolve(res);
          break;
      }
    } catch (ex) {
      if (isShowToast) {
        Toast.hide();
      }

      if (Const.__DEV__ && Const.__CLIENT__) {
        Utils.light('网络请求出错，请刷新');
      }

      // reject(new Error(`[${api}] 严重错误`));
      reject(`[${api}] 严重错误`);
    }
  });

/**
 * 鸡血POST
 * @version 171121 1.0
 */
const PPP = (api, query, tk) => {
  fetch(`${Const.__API__}${apis[api]}?tk=${tk}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: Utils.getQueryStr({
      ...query
    })
  });
};

/**
 * 取得一次请求的请求格式地址
 * @version 170812 1.0
 * @param {String} *api
 * @param {Object} query
 */
const getRequestUrl = (api, query = {}) => {
  const tk = G.getState('tk');
  const apiAddress = apis[api].replace(/!/g, '');
  const isUrl = apiAddress.indexOf('https://') !== -1;

  return `${
    isUrl ? '' : Const.__API__
  }${apiAddress}?tk=${tk}&${Utils.getQueryStr(query)}`;
};

const Api = {
  P,
  PP,
  PPP,
  initApis,
  getRequestUrl
};

export default Api;

if (Const.__CLIENT__) {
  window.Api = Api;
}
