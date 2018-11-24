/**
 * const prefixCls = 'style-213201';
 * const images = '/static/images/src/index/Home';
 * @Author: czy0729
 * @Date: 2018-06-21 15:26:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-01 20:29:27
 * @Path m.benting.com.cn \src\index\Home\_NewGoods.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Badge } from 'antd-mobile';
import { observer } from '@';
import { Flex, Img, Link, Icon } from '@components';
import Utils from '@utils';
import Styles from '@styles';

const prefixCls = 'style-213201';

const _NewGoods = (props, { $ }) => {
  const { className } = props;
  const { list } = $.getState('newGoods');

  return (
    <div className={classNames(prefixCls, className)}>
      <Flex className={`${prefixCls}__title`} justify="center">
        <p className="t-32 l-44 t-title">本汀新品震撼上市</p>
        <Link className="ml-sm" href="/shop">
          <Icon className="t-32 t-sub" type="more-circle" />
        </Link>
      </Flex>
      <div>
        {list.map(({ gid, title, imgs }) => (
          <Link
            key={gid}
            className={`${prefixCls}__item`}
            href={`/shop/goods?id=${gid}`}
            as={`/shop/goods/${gid}`}
          >
            <p className="t-28 l-40 t-c1">{title}</p>
            <Flex className="mt-12" justify="between" align="start">
              <Badge
                text="上新"
                style={{
                  fontSize: '0.2rem',
                  lineHeight: '0.34rem',
                  color: Styles.color_danger,
                  background: 'transparent',
                  border: `0.01rem solid ${Styles.color_danger}`,
                  borderRadius: Styles.radius_xs
                }}
              />
              <Img src={Utils.getAppImgUrl(imgs, 'thumb')} size="1.2rem" />
            </Flex>
          </Link>
        ))}
      </div>

      <style jsx global>{`
        .style-213201 {
          min-height: 5.53rem;
          padding: 0 0.48rem 0.48rem;
          background: ${Styles.color_theme};
        }
        .${prefixCls}__title {
          padding: 0.4rem 0;
        }
        .${prefixCls}__item {
          display: inline-block;
          vertical-align: top;
          position: relative;
          width: 50%;
        }
        .${prefixCls}__item:nth-of-type(1) {
          padding: 0 0.32rem 0.28rem 0;
          border-right: 0.01rem solid ${Styles.color_border};
          border-bottom: 0.01rem solid ${Styles.color_border};
        }
        .${prefixCls}__item:nth-of-type(2) {
          padding: 0 0 0.28rem 0.33rem;
          border-bottom: 0.01rem solid ${Styles.color_border};
        }
        .${prefixCls}__item:nth-of-type(3) {
          padding: 0.28rem 0.32rem 0 0;
          border-right: 0.01rem solid ${Styles.color_border};
        }
        .${prefixCls}__item:nth-of-type(4) {
          padding: 0.28rem 0 0 0.33rem;
        }
      `}</style>
    </div>
  );
};

_NewGoods.contextTypes = {
  $: PropTypes.object
};

export default observer(_NewGoods);
