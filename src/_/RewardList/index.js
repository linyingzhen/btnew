/**
 * const prefixCls = 'style-198384';
 * const images = '/static/images/src/_/RewardList';
 * @Author: czy0729
 * @Date: 2018-07-22 16:15:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-07-22 16:17:12
 * @Path m.benting.com.cn /src/_/RewardList/index.js
 */
import React from 'react';
import classNames from 'classnames';
import { observer } from '@';
import Utils from '@utils';
import Styles from '@styles';
import Header from '../Header';

const prefixCls = 'style-198384';

const RewardList = props => {
  const { data = [], className } = props;

  if (!data.length) {
    return null;
  }

  return (
    <div className={classNames(prefixCls, className)}>
      <Header title="打赏记录" />
      <div className="wrap tool-wrap-scroll">
        {data.map(item => (
          <div key={item.tbId} className="item t-c">
            <img
              className="img-gift"
              src={Utils.getImgUrl(item.goodsImg)}
              alt=""
            />
            <p className="t-28 t-primary t-c1">{item.title}</p>
            <p className="t-24 t-c1">{item.userName}</p>
          </div>
        ))}
      </div>

      <style jsx>{`
        .style-198384 {
          padding-bottom: ${Styles.bottom};
          background: ${Styles.color_theme};
        }
        .wrap {
          padding: 0 ${Styles.wind};
        }
        .item {
          display: inline-block;
        }
        .item:not(:last-child) {
          margin-right: 0.16rem;
        }
        .img-gift {
          width: auto;
          height: 0.98rem;
        }
      `}</style>
    </div>
  );
};

export default observer(RewardList);
