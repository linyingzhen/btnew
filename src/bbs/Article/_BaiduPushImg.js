/**
 * const prefixCls = 'style-537069';
 * const images = '/static/images/src/bbs/Article';
 * @Author: czy0729
 * @Date: 2018-08-30 09:49:40
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-10 18:18:19
 * @Path m.benting.com.cn /src/bbs/Article/_BaiduPushImg.js
 */
import React from 'react';

export default class BaiduPushImg extends React.Component {
  state = {
    baiduPushImgSrc: '' // 百度统计推送方式为访问一个img
  };

  componentDidMount() {
    // 百度统计主动推送收录
    const { baiduPushImgSrc } = this.state;

    if (baiduPushImgSrc) {
      return;
    }

    /* eslint-disable-next-line */
    const e = /([http|https]:\/\/[a-zA-Z0-9\_\.]+\.baidu\.com)/gi;
    const r = window.location.href;
    const t = document.referrer;

    if (!e.test(r)) {
      let o = 'https://sp0.baidu.com/9_Q4simg2RQJ8t7jm9iCKT-xh_/s.gif';

      /* eslint-disable-next-line */
      t
        ? ((o += `?r=${document.referrer}`), r && (o += `&l=${r}`))
        : r && (o += `?l=${r}`);

      this.setState({
        baiduPushImgSrc: o
      });
    }
  }

  render() {
    const { baiduPushImgSrc } = this.state;

    return (
      baiduPushImgSrc && (
        <img
          className="img-baidu-push"
          src={baiduPushImgSrc}
          style={{ display: 'none' }}
          alt=""
        />
      )
    );
  }
}
