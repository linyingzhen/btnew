/**
 * const prefixCls = 'style-157598';
 * const images = '/static/images/src/discovery/Index';
 * @Author: czy0729
 * @Date: 2018-07-04 14:40:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-01 14:21:48
 * @Path m.benting.com.cn /src/discovery/Index/store.js
 */
import React from 'react';
import { observable } from 'mobx';
import { Flex } from '@components';
import common from '@stores/commonV2';
import Api from '@api';
import Const from '@const';
import Utils from '@utils';
import G from '@stores/g';
import UI from '@stores/ui';
import { images, tabsDS } from './ds';

export default class Store extends common {
  config = {
    cache: ['discovery']
  };

  @observable
  state = this.initState({
    _affixTabs: {
      page: 0
    },

    _discoveryRow: {
      redOpenIds: [], // 红包记录展开id
      likeOpenIds: [] // 点赞记录展开id
    },

    _fixedTextarea: {
      show: false,
      placeholder: '',
      onSubmit: Function.prototype
    },

    // 用户信息
    userInfo: G.toJS('userInfo'),

    // 发现列表
    discovery: Const.__EMPTY__
  });

  params = {
    // 发现列表Query
    queryDiscovery: {}
  };

  setQuery = {
    // 发现列表Query
    discovery: index => {
      const { title } = tabsDS[index];
      let query;

      switch (title) {
        case '最新':
          query = {
            _: {
              limit: Const.__LIMIT__,
              search: {
                viewType: 0
              }
            }
          };
          break;

        case '精选':
          query = {
            _: {
              limit: Const.__LIMIT__,
              search: {
                isReclist: 1
              }
            }
          };
          break;

        case '渔获':
          query = {
            _: {
              limit: Const.__LIMIT__,
              search: {
                'dtsourceCategory[>]': 0
              }
            }
          };
          break;

        case '好友':
          query = {
            _: {
              limit: Const.__LIMIT__,
              search: {
                viewType: 1
              }
            }
          };
          break;

        default:
          break;
      }

      this.setParams({
        queryDiscovery: query
      });
    }
  };

  fetch = {
    config: {
      static: ['userInfo'],
      one: ['checkDiscoverySpecialNew'],
      update: ['discovery']
    },
    select: {
      discovery: {
        atList: 1,
        comCountAll: 1,
        commentList: {
          con: 1,
          niname: 1,
          parId: 1,
          parNiname: 1,
          parUserId: 1,
          tbId: 1,
          userId: 1
        },
        con: 1,
        faceImg: 1,
        fanAuth: 1,
        fileList: 1,
        grade: 1,
        infoAddress: 1,
        infoId: 1,
        infoType: 1,
        isConcern: 1,
        likeCount: 1,
        likeList: {
          niname: 1,
          userId: 1
        },
        likeRecordsOpen: 1,
        niname: 1,
        publishTime: 1,
        redPacket: 1,
        redRecordsOpen: 1,
        rewardNum: 1,
        role: 1,
        tbId: 1,
        userId: 1,
        userLat: 1,
        userLong: 1,
        vip: 1
      }
    },

    // 用户信息
    userInfo: async () => {
      const res = G.fetchUserInfo();

      this.setState(await res, 'userInfo');

      return res;
    },

    // 发现列表
    discovery: refresh => {
      const { queryDiscovery } = this.params;

      return this.fetchListThenSetState(
        'get_discovery_list',
        'discovery',
        {
          ...queryDiscovery,
          _select: this.fetch.select.discovery
        },
        refresh,
        'publishTime'
      );
    },
    updateOneDiscovery: infoId =>
      this.updateOneThenSetState('get_discovery_list', 'discovery', {
        infoId
      }),

    // 检查新精选
    checkDiscoverySpecialNew: async () => {
      const { page } = this.getState('_affixTabs');
      let { time } = G.getState('discoverySpecial');

      if (!time) {
        time = Math.floor(Utils.getTimestamp() / 1000) - 24 * 60 * 60;
      }

      const data = await Api.P('get_discovery_list', {
        _: {
          limit: 1,
          search: {
            isReclist: 1,
            'publishTime[>]': time
          }
        }
      });

      if (data.list.length) {
        const { publishTime } = data.list[0];
        const { recordtotal } = data.pageinfo;

        G.discoverySpecialSetNew(
          publishTime,
          recordtotal,
          page === tabsDS.findIndex(item => item.title === '精选')
        );
      }
    }
  };

  do = {
    // 点赞
    toggleLike: async infoId => {
      await Api.P('do_like', { infoId });

      // 更新发现列表一项
      this.fetch.updateOneDiscovery(infoId);
    },

    // 评论
    comment: async (query = {}, infoId) => {
      const { con } = query;

      if (!Utils.checkComment(con)) {
        return;
      }

      if (Utils.getCharLength(con) < 2) {
        Utils.light('回复的字数不能少于2');
        return;
      }

      if (!G.insertReply(con)) {
        Utils.light('检测到最近有类似回复，请不要恶意灌水');
        return;
      }

      const { point } = await Api.P('do_comment', query);

      this.page.hideFixedTextarea();
      Utils.light(point == 0 ? '回复成功' : `回复成功，积分+${point}`);

      // 更新发现列表一项
      this.fetch.updateOneDiscovery(infoId);
    },

    // 关注
    follow: async (userId, infoId) => {
      await Api.P('do_add_follow', {
        concernId: userId
      });

      Utils.light('关注成功');
      this.fetch.updateOneDiscovery(infoId);
    },

    // 领红包
    redPacketFetching: false,
    redClick: async (packetId, redType, infoId) => {
      if (this.do.redPacketFetching) {
        return;
      }

      if (!infoId) {
        return;
      }

      // 领红包单例
      // 阻止领完的红包再发请求
      const { list } = this.getState('discovery');
      const item = list.find(item => item.infoId === infoId);
      if (item) {
        const { redPacket = {} } = item;
        const { redPacketLogs = [], state } = redPacket;

        if (redPacketLogs.length) {
          const { userId } = this.getState('userInfo');

          if (
            userId &&
            redPacketLogs.findIndex(item => item.userId === userId) !== -1
          ) {
            Utils.light('这个红包您已领取，大师不要太贪心哦~');
            return;
          }
        }

        if (state == 2) {
          Utils.light('红包已抢光，祝大师下次好运~');
          return;
        }
      }

      this.do.redPacketFetching = true;
      const data = await Api.PP('do_redpacket_get', {
        packetId
      });
      this.do.redPacketFetching = false;

      let redTypeText;
      let ext = '';
      let link;

      switch (parseInt(redType)) {
        case 1:
          redTypeText = '金币';
          ext = '枚';
          link = '/person/wallet/coin/flow';
          break;

        case 2:
          ext = '积分';
          link = '/person/wallet/score/flow';
          break;

        case 3:
          ext = '元';
          link = '/person/wallet/flow';
          break;

        case 4:
          redTypeText = '优惠券';
          ext = '元';
          link = '/person/prize';
          break;

        default:
          break;
      }

      if (data.code !== 0) {
        Utils.light(data.err);
      } else {
        UI.showMask({
          children: (
            <Flex
              direction="column"
              style={{
                position: 'relative'
              }}
              onClick={UI.hideMask}
            >
              <img
                key="1"
                src={`${images}/red-modal.png`}
                style={{
                  width: '4.8rem',
                  height: 'initial'
                }}
                alt=""
              />
              <p
                key="2"
                className="t-36 t-c"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  marginTop: '100%',
                  color: '#FBD371'
                }}
              >
                您抢到了
                {data.data}
                {ext}
                {redTypeText}
              </p>
              <div
                key="3"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '0.64rem',
                  marginTop: '130%'
                }}
                onClick={e => {
                  e.stopPropagation();
                  Utils.router.push(link);
                }}
              />
            </Flex>
          )
        });
      }

      this.fetch.updateOneDiscovery(infoId);
    }
  };

  page = {
    // Tab点击
    onTabClick: (item, index) => {
      const { title } = tabsDS[index];
      const cb = () => {
        this.setQuery.discovery(index);
        this.fetch.discovery(true);
        this.setState({ page: index }, '_affixTabs');
      };

      if (title === '精选') {
        G.discoverySpecialSetReaded();
      }

      if (title === '好友') {
        Utils.checkLogin(cb);
      } else {
        cb();
      }

      Utils.scrollTo(0);
    },

    // 回复点击
    onCommentClick: item => {
      let placeholder;
      let onSubmit;

      if (item.userId) {
        // 回复用户
        placeholder = `回复${item.name}：`;
        onSubmit = value =>
          this.do.comment(
            {
              parId: item.tbId,
              con: value
            },
            item.infoId
          );
      } else {
        // 回复评论
        placeholder = '回复：';
        onSubmit = value =>
          this.do.comment(
            {
              infoId: item.infoId,
              con: value
            },
            item.infoId
          );
      }

      this.page.showFixedTextarea({
        placeholder,
        onSubmit
      });
    },

    // 点赞记录显示更多
    onLikeLogsOpen: infoId => {
      const { likeOpenIds } = this.getState('_discoveryRow');

      this.setState(
        {
          likeOpenIds: [...likeOpenIds, infoId]
        },
        '_discoveryRow'
      );
    },

    // 红包领取记录显示更多
    onRedLogsOpen: infoId => {
      const { redOpenIds } = this.getState('_discoveryRow');

      this.setState(
        {
          redOpenIds: [...redOpenIds, infoId]
        },
        '_discoveryRow'
      );
    },

    // 显示回复框
    showFixedTextarea: item =>
      this.setState(
        {
          ...item,
          show: true
        },
        '_fixedTextarea'
      ),

    // 隐藏回复框
    hideFixedTextarea: () =>
      this.setState(
        {
          show: false
        },
        '_fixedTextarea'
      )
  };

  storeInit() {
    const { id = 0 } = this.params.params;

    this.setQuery.discovery(id);
    this.setState({ page: id }, '_affixTabs');
  }
}
