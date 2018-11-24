/**
 * const prefixCls = 'style-174776';
 * const images = '/static/images/src/index/Home';
 * @Author: czy0729
 * @Date: 2018-11-06 14:25:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-21 13:45:14
 * @Path bt_mb_new /src/index/Home/_Car.js.git
 */
import React from 'react';
import classNames from 'classnames';
import { Flex } from '@components';
import Const from '@const';
import Styles from '@styles';
import { getTid } from '@src/event/car/ds';
import { images } from './ds';

const prefixCls = 'style-174776';

const _Car = props => {
  const { className } = props;
  const otherEventId = getTid(2);

  return (
    <Flex className={classNames(prefixCls, className)} justify="center">
      <Flex.Item href="/event/car">
        <Flex className={`${prefixCls}__item`} justify="center">
          <img
            className="img-car"
            src={`${images}/GS8${Const.__IMG_DPR__}.png`}
            alt=""
          />
          <div>
            <p className="t-26 l-36">本汀壕礼</p>
            <p className="t-26 l-36">送车活动</p>
          </div>
        </Flex>
      </Flex.Item>
      <Flex.Item
        href={`/event/car?id=${otherEventId}`}
        as={`/event/car/${otherEventId}`}
      >
        <Flex
          className={`${prefixCls}__item ${prefixCls}__item_b`}
          justify="center"
        >
          <div className="wrap-img-box t-c">
            <img
              className="img-box"
              src={`${images}/box${Const.__IMG_DPR__}.png`}
              alt=""
            />
          </div>
          <div>
            <p className="t-26 l-36">本汀壕礼</p>
            <p className="t-26 l-36 t-c">送钓箱</p>
          </div>
        </Flex>
      </Flex.Item>

      <style jsx global>{`
        .style-174776 {
          padding: 0.24rem 0;
          background: ${Styles.color_theme};
        }
        .${prefixCls}__item {
          padding: 0.24rem 0;
        }
        .${prefixCls}__item_b {
          border-left: 0.01rem solid ${Styles.color_border};
        }
      `}</style>
      <style jsx>{`
        .style-174776 {
        }
        .img-car {
          width: 1.84rem;
          height: 1.1rem;
        }
        .wrap-img-box {
          width: 1.84rem;
        }
        .img-box {
          width: 1.24rem;
          height: 1.1rem;
        }
      `}</style>
    </Flex>
  );
};

export default _Car;
