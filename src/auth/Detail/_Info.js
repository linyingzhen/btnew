/**
 * const prefixCls = 'style-320213';
 * const images = '/static/images/src/auth/Detail';
 * @Author: czy0729
 * @Date: 2018-08-13 17:45:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-08-14 09:47:40
 * @Path m.benting.com.cn /src/auth/Detail/_Info.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { observer } from '@';
import { Result, Flex } from '@components';
import Styles from '@styles';

const prefixCls = 'style-320213';

const _Info = (props, { $ }) => {
  const { className } = props;
  const { goodsName, rowFileds } = $.getState('detail');
  const show = !!(goodsName || rowFileds);

  const details = [];
  if (show) {
    if (goodsName) {
      details.push({
        label: '商品',
        value: goodsName
      });
    }

    if (rowFileds) {
      rowFileds.split('\n').forEach(item => {
        const temp = item.split(':');

        details.push({
          label: String(temp[0]).trim(),
          value: String(temp[1]).trim()
        });
      });
    }
  }

  return (
    <div className={classNames(prefixCls, className)}>
      <Result
        image="/static/svg/防伪正品.svg"
        title={<span style={{ color: '#58C174' }}>经检测是本汀正品</span>}
        titleStyle={{
          marginTop: '-0.8rem'
        }}
      />
      {show && (
        <div className="list">
          {details.map(item => (
            <Flex key={item.label} align="start">
              <Flex.Item className="t-30 l-42 t-sub">{item.label}</Flex.Item>
              <Flex.Item style={{ flex: 2 }}>
                <p className="t-30 l-42 t-r">{item.value}</p>
              </Flex.Item>
            </Flex>
          ))}
        </div>
      )}

      <style jsx>{`
        .style-320213 {
          background: ${Styles.color_theme};
        }
        .list {
          position: relative;
          padding: 0.32rem 0;
          margin: 0 ${Styles.wind};
        }
        .list:not(:first-child) {
          margin-top: 0.16rem;
        }
        .list:before {
          content: '';
          position: absolute;
          top: 0;
          right: 0;
          left: 0;
          height: 0.02rem;
          background-image: linear-gradient(
            to right,
            ${Styles.color_border} 0%,
            ${Styles.color_border} 50%,
            transparent 50%
          );
          background-size: 0.24rem 0.02rem;
          background-repeat: repeat-x;
        }
      `}</style>
    </div>
  );
};

_Info.contextTypes = {
  $: PropTypes.object
};

export default observer(_Info);
