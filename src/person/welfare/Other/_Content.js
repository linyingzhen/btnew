/**
 * const prefixCls = 'style-162142';
 * const images = '/static/images';
 * @Author: lyz0720
 * @Date: 2018-11-12 11:17:55
 * @Last Modified by: lyz0720
 * @Last Modified time: 2018-11-12 14:14:09
 * @Path bt_mb_new \src\person\welfare\Other\_Content.js.git
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Icon } from '@components';
import Styles from '@styles';
import { observer } from '@';
import { images } from './ds';

const prefixCls = 'style-162142';

const _Content = (props, { $ }) => {
  const { className } = props;
  const { show1, show2, show3 } = $.getState('state');
  return (
    <div className={classNames(prefixCls, className)}>
      <div className="box-content">
        <div className="top">
          <img src={`${images}/other1.png`} alt="other1" className="pic" />
          <div>
            <p className="title t-30 l-44">会员福利日</p>
            <p className="desc t-26 l-40 t-sub mt-12">精彩活动嗨不停</p>
          </div>
        </div>
        <div className="footer">
          <p className="t-24 l-36 t-sub">
            {show1
              ? '成为会员的用户，可以参加每月由本汀举办的会员福利日活动，本汀会员福利日为19号，在当天会有超值超给力的福利产品及活动，最精彩的内容相信可以带给汀粉们最火热的激情。'
              : '成为会员的用户，可以参加每月由本汀举办的会员福利日活动，本汀会员福利日为19号，在当天会...'}{' '}
          </p>
          <Icon
            className="t-30 t-sub"
            type={show1 ? 'up' : 'down'}
            style={{
              width: '0.32rem'
            }}
            onClick={() => $.setState({ show1: !show1 }, 'state')}
          />
        </div>
      </div>
      <div className="box-content">
        <div className="top">
          <img src={`${images}/other2.png`} alt="other2" className="pic" />
          <div>
            <p className="title t-30 l-44">活动优先</p>
            <p className="desc t-26 l-40 t-sub mt-12">各种活动优先入场</p>
          </div>
        </div>
        <div className="footer">
          <p className="t-24 l-36 t-sub">
            {show2
              ? '成为会员的用户，尊享各种活动的优先入场，其中包括但不限于预售、限购、新品、福利、试用线下活动等！'
              : '成为会员的用户，尊享各种活动的优先入场，其中包括但不限于预售、限购、新品、福利、试用、...'}
          </p>
          <Icon
            className="t-30 t-sub"
            type={show2 ? 'up' : 'down'}
            style={{
              width: '0.32rem'
            }}
            onClick={() => $.setState({ show2: !show2 }, 'state')}
          />
        </div>
      </div>
      <div className="box-content">
        <div className="top">
          <img src={`${images}/other3.png`} alt="other3" className="pic" />
          <div>
            <p className="title t-30 l-44">金牌客服</p>
            <p className="desc t-26 l-40 t-sub mt-12">专属客服一对一服务</p>
          </div>
        </div>
        <div className="footer">
          <p className="t-24 l-36 t-sub">
            {show3
              ? '成为会员的用户，并且会员等级达到黄金级别以上会员，可尊享专属的金牌客服来为你您进行一对一优先服务。'
              : '成为会员的用户，并且会员等级达到黄金级别以上会员，可尊享专属的金牌客服来为你您进行一...'}
          </p>
          <Icon
            className="t-30 t-sub"
            type={show3 ? 'up' : 'down'}
            style={{
              width: '0.32rem'
            }}
            onClick={() => $.setState({ show3: !show3 }, 'state')}
          />
        </div>
      </div>
      <style jsx>{`
        .style-162142 {
          position: relative;
          top: -2.36rem;
          margin: 0 ${Styles.wind};
          background: transparent;
        }
        .box-content {
          background: ${Styles.color_void};
          margin-bottom: ${Styles.wind};
          border-radius: 0.08rem;
          border: 0.02rem solid ${Styles.color_border};
        }
        .top {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          padding: 0.56rem 0;
        }
        .top .pic {
          width: 1.2rem;
          height: 1.2rem;
          border: 0.02rem dashed ${Styles.color_main};
          margin: 0 0.72rem 0 1.52rem;
        }
        .footer {
          display: flex;
          align-items: center;
          padding: ${Styles.wind};
          border-top: 0.02rem solid ${Styles.color_border};
        }
      `}</style>
    </div>
  );
};

_Content.contextTypes = {
  $: PropTypes.object
};

export default observer(_Content);
