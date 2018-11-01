/**
 * const prefixCls = 'style-374610';
 * const images = '/static/images/src/index/Chat';
 * @Author: czy0729
 * @Date: 2018-10-21 17:05:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-23 15:01:36
 * @Path bt_mb_new /src/index/Chat/store.js
 */
import RWS from 'es6-rws';
import { observable } from 'mobx';
import common from '@stores/commonV2';
import Api from '@api';
import Const from '@const';
import Utils from '@utils';
import G from '@stores/g';
import { wrapCls } from './ds';

export default class Store extends common {
  socket;
  tk;
  DS = [];
  realHeight = 0;

  @observable
  state = this.initState({
    state: {
      socketConnectFail: false,
      showEmoji: false,
      value: '',
      imgView: {
        show: false,
        current: 0,
        data: []
      }
    },

    userInfo: G.getState('userInfo'),

    // 私聊他人的信息
    toUserInfo: {},

    // 聊天人数
    chatNum: {},

    // 聊天记录
    chatList: Const.__EMPTY__
  });

  fetch = {
    config: {
      static: ['userInfo'],
      update: ['chatList']
    },

    userInfo: async () => {
      const res = G.fetchUserInfo();

      this.setState(await res, 'userInfo');

      return res;
    },

    // 私聊他人的信息
    toUserInfo: () => {
      const { id } = this.params.params;

      return this.fetchThenSetState('get_person_info', 'toUserInfo', {
        userId: id
      });
    },

    // 在线人数，聊天室用
    chatNum: () => this.fetchThenSetState('get_chat_online-num', 'chatNum'),

    // 聊天记录
    chatList: async () => {
      const { id } = this.params.params;

      let res;
      if (id) {
        // 私聊
        res = Api.P('get_chat_private-list', {
          _: {
            limit: 100,
            order: {
              createTime: 'desc'
            },
            search: {
              userId: id
            }
          }
        });
      } else {
        // 群聊
        res = Api.P('get_chat_logs', {
          _: {
            limit: 80,
            order: {
              createTime: 'desc'
            },
            search: {
              groupId: 1
            }
          }
        });
      }

      const data = await res;
      this.setState(
        {
          ...data,
          list: data.list.reverse()
        },
        'chatList'
      );

      return res;
    }
  };

  do = {
    // 发送
    comment: ({ id }) => {
      const { value } = this.getState();
      const { userId, faceImg, niname } = this.getState('userInfo');

      try {
        this.socket.send(
          JSON.stringify({
            servicename: 'socketweb.sendmsg',
            params: {
              tk: this.tk,
              toUserId: this.params.params.id || '',
              groupId: this.params.params.id ? 0 : 1,
              message: JSON.stringify(id ? { id } : { value })
            }
          })
        );
      } catch (ex) {
        Utils.light('发送消息失败，请稍后再试');
      }

      this.setState({
        showEmoji: false,
        value: ''
      });

      // 造假数据
      if (this.params.params.id) {
        this.page.append(
          {
            userId,
            faceImg,
            niname,
            message: JSON.stringify(id ? { id } : { value }),
            createTime: Math.floor(new Date().valueOf() / 1000)
          },
          true
        );
      }
    }
  };

  page = {
    // socket连接失败回调
    socketConnectFailCb: () => {
      this.setState({
        socketConnectFail: true
      });
      Utils.light('私聊服务连接失败，请稍后再试');
      this.page.destorySocket();
    },

    // 销毁socket实例
    destorySocket: () => {
      if (this.socket) {
        this.socket.close();
      }
      this.socket = null;
    },

    // 信息追加到页面中
    append: (item, isSelf) => {
      const chatList = this.getState('chatList');

      let _list;
      if (item) {
        _list = [...chatList.list, item];
      } else {
        _list = [...this.DS, ...chatList.list];
      }

      this.setState(
        {
          list: _list
        },
        'chatList'
      );

      // 当滚动高度不在底部时，不滚动到底
      setTimeout(() => {
        const el = document.querySelector(wrapCls);

        if (this.realHeight === 0) {
          el.childNodes.forEach(item => {
            this.realHeight += item.offsetHeight;
          });
        } else {
          this.realHeight +=
            el.childNodes[el.childNodes.length - 1].offsetHeight;
        }

        // 因为不同机型像素比不同，大概超过一屏高度遍不再滚到底
        const { scrollTop } = el;
        if (isSelf || (this.realHeight - scrollTop) / Const.__DPR__ < 800) {
          el.scrollTop = 99999;
        }
      }, 0);
    },

    // Textarea改变
    onTextareaChange: value => this.setState({ value }),

    // 选择Emoji
    onEmojiPick: emoji => {
      const { value } = this.getState();

      this.setState({
        value: `${value}${emoji}`
      });
    },

    // 展开收起Emoji选择器
    toggleEmojiPicker: () => {
      const { showEmoji } = this.getState();

      this.setState({
        showEmoji: !showEmoji
      });
    },

    // 收起Emoji选择器
    hideEmojiPicker: () =>
      this.setState({
        showEmoji: false
      }),

    // 显示大图
    showImgView: img =>
      this.setState({
        imgView: {
          show: true,
          current: 0,
          data: [Utils.getAppImgUrl(img, 'scale', true)]
        }
      }),

    // 隐藏大图
    hideImgView: () =>
      this.setState({
        imgView: {
          show: false,
          current: 0,
          data: []
        }
      })
  };

  storeDidMount() {
    const { id } = this.params.params;

    // 有id的为私聊
    if (id) {
      this.fetch.toUserInfo();
    }

    try {
      if (!this.socket) {
        this.socket = new RWS(Const.__WSS__);

        // socket收到推送
        this.socket.onmessage = e => {
          const { userId } = this.getState('userInfo');

          let data;
          let message;
          try {
            data = JSON.parse(e.data);
            message = JSON.parse(data.message);
          } catch (ex) {
            console.error(ex);
          }

          // 消息结构丢失和不是当前聊天信息都不能append
          if (!message || id !== data.userId) {
            return;
          }

          // message有id的为图片消息
          if (message.id) {
            this.page.append(
              {
                userId: data.userId,
                faceImg: data.faceImg,
                niname: data.niname,
                img: message.id,
                con: '',
                createTime: Math.floor(new Date().valueOf() / 1000)
              },
              userId === data.userId
            );
          } else {
            this.page.append(
              {
                userId: data.userId,
                faceImg: data.faceImg,
                niname: data.niname,
                img: '',
                con: message.value,
                createTime: Math.floor(new Date().valueOf() / 1000)
              },
              userId === data.userId
            );
          }
        };

        // socket错误
        this.socket.onerror = () => {
          this.page.socketConnectFailCb();
        };
      } else {
        // 因为socket只会创建一次，所以第二次进入私聊需要再次调用
        this.socketOpenPrivateChat();
      }
    } catch (ex) {
      this.page.socketConnectFailCb();
    }

    this.socket.onopen = () => {
      this.tk = G.getState('tk');

      // 告诉服务器接受推送消息
      const data = {
        servicename: 'socketweb.pushmsg',
        params: { tk: this.tk, groupId: id ? 0 : 1 }
      };

      try {
        this.socket.send(JSON.stringify(data));
      } catch (ex) {
        console.warn('告诉服务器接受推送消息失败');
      }
      this.socketOpenPrivateChat();
    };
  }

  storeWillUnmount() {
    this.socketExitPrivateChat();
    this.page.destorySocket();
    this.realHeight = 0;
    this.setState({
      socketConnectFail: false
    });
  }

  // 私聊：进入聊天室时需要调用
  socketOpenPrivateChat = () => {
    const { id } = this.params.params;

    if (!id) {
      return;
    }

    try {
      this.socket.send(
        JSON.stringify({
          servicename: 'socketweb.openPrivateChat',
          params: { tk: this.tk, toUserId: id }
        })
      );
    } catch (ex) {
      console.warn('私聊服务连接失败');
    }
  };

  // 私聊：离开聊天室时需要调用
  socketExitPrivateChat = () => {
    const { id } = this.params.params;

    if (!id) {
      return;
    }

    try {
      this.socket.send(
        JSON.stringify({
          servicename: 'socketweb.exitPrivateChat',
          params: { tk: this.tk, toUserId: id }
        })
      );
    } catch (ex) {
      this.page.destorySocket();
      console.warn('离开聊天室请求失败');
    }
  };
}
