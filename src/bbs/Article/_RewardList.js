/**
 * const prefixCls = 'style-214801';
 * const images = '/static/images/src/bbs/Article';
 * @Author: czy0729
 * @Date: 2018-07-17 23:57:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-07-18 10:20:43
 * @Path m.benting.com.cn /src/bbs/Article/_RewardList.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { observer } from '@';
import { Header } from '@_';
import Utils from '@utils';
import Styles from '@styles';

const prefixCls = 'style-214801';

const _RewardList = (props, { $ }) => {
  const { className } = props;
  const reward = $.getState('reward');

  if (!reward.list.length) {
    return null;
  }

  return (
    <div className={classNames(prefixCls, className)}>
      <Header title="打赏记录" />
      <div className="wrap tool-wrap-scroll">
        {reward.list.map(item => (
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
        .style-214801 {
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

_RewardList.contextTypes = {
  $: PropTypes.object
};

export default observer(_RewardList);
