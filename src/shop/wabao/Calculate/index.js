/**
 * const prefixCls = 'style-184101';
 * const images = '/static/images/src/shop/wabao/Calculate';
 * @Author: czy0729
 * @Date: 2018-09-28 10:48:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-09-28 15:36:56
 * @Path m.benting.com.cn /src/shop/wabao/Calculate/index.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import { injectV2, observer } from '@';
import { Flex } from '@components';
import { Layout, Header } from '@_';
import Styles from '@styles';
import store from './store';

const prefixCls = 'style-184101';

const Calculate = (props, { $ }) => {
  const {
    winNo,
    lotTimeCount,
    timeNo,
    lotteryNo,
    perTotal,
    _loaded
  } = $.getState('detail');

  if (!_loaded) {
    return null;
  }

  const total = parseInt(lotTimeCount) + parseInt(lotteryNo);
  const yu = total % parseInt(perTotal);

  return (
    <Layout title="计算详情">
      <div className="wrap-num">
        <p className="t-32 t-void">幸运号码</p>
        <p className="t-48 t-void t-b mt-4">{winNo}</p>
        <p className="t-32 t-void mt-8">计算公式</p>
        <p className="t-32 t-void mt-4">
          (时间值之和 + 重庆时时彩) / 所需人次，取余数 + 初始号
        </p>
      </div>
      <Header title="第一步" desc="计算所有人次的投注时间之和" line={false} />
      <div className="wrap">
        <p className="t-32 user-select">时间之和 = {lotTimeCount}</p>
      </div>
      <Header
        className="mt-d"
        title="第二步"
        desc={`重庆时时彩 (第${timeNo}期)`}
        line={false}
        linkExtra="查询"
        href="https://m.500.com/info/kaijiang/ssc/"
      />
      <Flex className={`${prefixCls}__wrap-no`} justify="around">
        {String(lotteryNo)
          .split('')
          .map((item, index) => (
            /* eslint-disable-next-line */
            <span key={index} className="no t-64 t-b t-c t-void">
              {item}
            </span>
          ))}
      </Flex>
      <Header
        className="mt-d"
        title="第三步"
        desc="时间之和 + 重庆时时彩"
        line={false}
      />
      <div className="wrap">
        <p className="t-32 user-select">
          {lotTimeCount} + {lotteryNo} = {total}
        </p>
      </div>
      <Header
        className="mt-d"
        title="第四步"
        desc="第三步结果与 所需人次 取余数"
        line={false}
      />
      <div className="wrap">
        <p className="t-32 user-select">
          {total} % {perTotal} = {yu} (余数)
        </p>
      </div>
      <Header
        className="mt-d"
        title="第五步"
        desc="余数 + 初始号 = 幸运号码"
        line={false}
      />
      <div className="wrap">
        <p className="t-32 user-select">
          <span>{yu} + 100000001 =</span>
          <span className="t-danger ml-xs">{yu + 100000001}</span>
        </p>
      </div>

      <style jsx global>{`
        .style-184101 {
        }
        .${prefixCls}__wrap-no {
          padding: 0 ${Styles.wind_raw * 2}rem ${Styles.bottom};
          background: ${Styles.color_theme};
        }
      `}</style>
      <style jsx>{`
        .style-184101 {
        }
        .wrap-num {
          padding: ${Styles.wind};
          margin: ${Styles.wind};
          background: ${Styles.color_danger};
          border-radius: 0.06rem;
        }
        .wrap {
          padding: 0 ${Styles.wind} ${Styles.bottom};
          background: ${Styles.color_theme};
        }
        .no {
          display: inline-block;
          width: 1rem;
          height: 1rem;
          border-radius: 50%;
        }
        .no:nth-of-type(1),
        .no:nth-of-type(5) {
          background: linear-gradient(
            45deg,
            rgba(255, 119, 132, 1) 0%,
            rgba(255, 46, 70, 1) 100%
          );
        }
        .no:nth-of-type(2),
        .no:nth-of-type(4) {
          background: linear-gradient(
            45deg,
            rgba(128, 216, 250, 1) 0%,
            rgba(0, 159, 220, 1) 100%
          );
        }
        .no:nth-of-type(3) {
          background: linear-gradient(
            45deg,
            rgba(97, 244, 205, 1) 0%,
            rgba(21, 215, 184, 1) 100%
          );
        }
      `}</style>
    </Layout>
  );
};

Calculate.contextTypes = {
  $: PropTypes.object
};

export default injectV2(store)(observer(Calculate));
