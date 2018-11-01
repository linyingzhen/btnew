/**
 * const prefixCls = 'style-210533';
 * const images = '/static/images/src/person/wallet/_/FlowList';
 * @Author: czy0729
 * @Date: 2018-09-13 10:50:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-09-13 12:12:49
 * @Path m.benting.com.cn /src/person/wallet/_/FlowList/_Thumb.js
 */
import React from 'react';
import Styles from '@styles';

const _Thumb = props => {
  const { title = '' } = props;

  let single;
  let type;
  if (
    title.indexOf('充值') !== -1 ||
    title.indexOf('中奖') !== -1 ||
    title.indexOf('兑换金币成功') !== -1
  ) {
    single = '充';
    type = 'success';
  } else if (title.indexOf('划转') !== -1) {
    single = '划';
    type = 'primary';
  } else if (title.indexOf('提现') !== -1) {
    single = '提';
    type = 'primary';
  } else {
    single = '消';
    type = 'danger';
  }

  return (
    <span className={`badge badge-${type}`}>
      {single}

      <style jsx>{`
        .style-210533 {
        }
        .badge {
          display: inline-block;
          width: 0.64rem;
          height: 0.64rem;
          margin: 0 0.16rem;
          text-align: center;
          font-size: 0.24rem;
          line-height: 0.64rem;
          color: #fff;
          border-radius: 50%;
        }
        .badge-primary {
          background: ${Styles.color_primary};
        }
        .badge-success {
          background: ${Styles.color_success};
        }
        .badge-danger {
          background: ${Styles.color_pink};
        }
      `}</style>
    </span>
  );
};

export default _Thumb;
