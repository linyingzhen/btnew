/**
 * const prefixCls = 'style-105182';
 * const images = '/static/images';
 * @Author: czy0729
 * @Date: 2018-06-22 13:34:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-16 15:29:27
 * @Path m.benting.com.cn /src/index/Home/_Footer.js
 */
import React from 'react';
import classNames from 'classnames';
import { Flex, Icon } from '@components';
import Const from '@const';
import Utils from '@utils';
import Styles from '@styles';
import { footerDS } from './ds';

const prefixCls = 'style-105182';

const _Footer = props => {
  const { className } = props;

  return (
    <footer className={classNames(prefixCls, className)}>
      <Flex className={`${prefixCls}__btns`} justify="around">
        {footerDS.map(item => (
          <Flex.Item
            key={item.label}
            href={item.href}
            as={item.as}
            login={item.login}
            onClick={() => {
              if (!item.href) {
                Utils.u();
              }
            }}
          >
            <Flex justify="center">
              <Icon className="t-28" type={item.icon} />
              <span className="t-24 l-40 t-title ml-8">{item.label}</span>
            </Flex>
          </Flex.Item>
        ))}
      </Flex>
      <p className="t-24 l-34 t-sub t-c mt-32">全国客户热线：020-31001105</p>
      <p className="t-24 l-34 t-sub t-c mt-14">
        粤ICP备 15020540号-1 广州本汀渔具有限公司
      </p>
      {Const.__WEB__ !== 'https://www.benting.com.cn' && (
        <span
          className="p-prod"
          onClick={() => Utils.router.push('/prod')}
        >
          prod
        </span>
      )}

      <style jsx>{`
        .style-105182 {
          position: relative;
          min-height: 2.4rem;
          padding: 0.48rem ${Styles.wind} 1.4rem;
          background: ${Styles.color_theme};
        }
        .p-prod {
          position: absolute;
          left: 0.16rem;
          bottom: 1.44rem;
        }
      `}</style>
    </footer>
  );
};

export default _Footer;
