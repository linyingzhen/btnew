/**
 * const prefixCls = 'style-141063';
 * const images = '/static/images/components/NativeShare';
 * @Author: czy0729
 * @Date: 2018-07-12 15:04:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-28 19:41:20
 * @Path m.benting.com.cn /components/NativeShare/index.js
 */
import React from 'react';
import classNames from 'classnames';
import { Modal } from 'antd-mobile';
import Const from '@const';
import Utils from '@utils';
import UI from '@stores/ui';
import NativeShare from '../_/nativeshare';
import Icon from '../Icon';

const prefixCls = 'c-native-share';
const images = Utils.cdn('/static/images/components/NativeShare');

export default class _NativeShare extends React.Component {
  componentDidMount() {
    this.initNativeShare();
    this.setShareData();
  }

  componentWillReceiveProps(nextProps) {
    if ('config' in nextProps) {
      if (this.nativeShare) {
        if (Const.__WX__) {
          Utils.wxShareUpdate({
            title: nextProps.config.title,
            desc: nextProps.config.desc,
            imgUrl: nextProps.config.icon,
            link: nextProps.config.link
          });
        } else {
          this.nativeShare.setShareData(nextProps.config);
        }
      }
    }
  }

  onShareFail = () => {
    const { config } = this.props;

    Modal.prompt(
      null,
      '您的浏览器不支持分享功能，可手动复制以下链接发送给您的朋友',
      [
        {
          text: '取消'
        },
        {
          text: '好的'
        }
      ],
      'plain-text',
      config.link
    );
  };

  setShareData = () => {
    if (!this.nativeShare) {
      return;
    }

    const { config } = this.props;
    this.nativeShare.setShareData(config);
  };

  initNativeShare = () => {
    if (this.nativeShare) {
      return;
    }

    const { config } = this.props;

    if (Const.__WX__) {
      Utils.wxShareUpdate({
        title: config.title,
        desc: config.desc,
        imgUrl: config.icon,
        link: config.link
      });
    } else {
      this.nativeShare = new NativeShare();
    }
  };

  preCheck = () => {
    if (Const.__WX__) {
      UI.showMask({
        children: (
          <img
            src={`${images}/share.png`}
            style={{
              width: '100%',
              height: 'initial'
            }}
            onClick={UI.hideMask}
            alt=""
          />
        )
      });
    } else {
      this.showShareActionSheet();
    }
  };

  showShareActionSheet = () => {
    const { actionSheetConfig } = this.props;

    const DS = [
      {
        icon: (
          <Icon
            className="t-64"
            type="wechat-circle-fill"
            style={{ color: '#1ab20a' }}
          />
        ),
        title: '微信',
        command: 'wechatFriend'
      },
      {
        icon: (
          <Icon
            className="t-64"
            type="moments-circle-fill"
            style={{ color: '#19b9a1' }}
          />
        ),
        title: '朋友圈',
        command: 'wechatTimeline'
      },
      {
        icon: <Icon className="t-64 t-primary" type="qq-circle-fill" />,
        title: 'QQ',
        command: 'qqFriend'
      },
      {
        icon: <Icon className="t-64 t-warning" type="qzone-circle-fill" />,
        title: 'QQ空间',
        command: 'qZone'
      },
      {
        icon: <Icon className="t-64 t-danger" type="weibo-circle-fill" />,
        title: '微博',
        command: 'weibo'
      },
      {
        icon: <Icon className="t-64 t-sub" type="more-circle-fill" />,
        title: '更多',
        command: 'default'
      }
    ];

    Utils.shareActionSheet(
      DS,
      index => {
        if (DS[index]) {
          try {
            this.nativeShare.call(DS[index].command);
          } catch (err) {
            this.onShareFail();
          } finally {
            Utils.hideActionSheet();
          }
        }
      },
      {
        message: '分享到',
        destructiveButtonIndex: undefined,
        ...actionSheetConfig
      }
    );
  };

  nativeShare;

  render() {
    const { className, children } = this.props;

    return (
      <div className={classNames(prefixCls, className)} onClick={this.preCheck}>
        {children}
      </div>
    );
  }
}
