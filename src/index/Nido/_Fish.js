/**
 * const prefixCls = 'style-767697';
 * const images = '/static/images/src/index/Nido';
 * @Author: czy0729
 * @Date: 2018-06-25 12:11:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-28 02:50:20
 * @Path m.benting.com.cn /src/index/Nido/_Fish.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { observer } from '@';
import { Flex, Img, Link } from '@components';
import { Header } from '@_';
import Const from '@const';
import Utils from '@utils';
import Styles from '@styles';
import { images } from './ds';

const prefixCls = 'style-767697';

const _Fish = (props, { $ }) => {
  const { className } = props;
  const { list } = $.getState('fish');

  return (
    <div className={classNames(prefixCls, className)}>
      <Header title="鱼获有礼" href="/discovery/fish/category" />
      <div className="tool-wrap-scroll tool-wind">
        {list.map(item => {
          const [goods, , fishKind, max] = item.tit.split('|');

          return (
            <Link
              key={item.tbId}
              className={`${prefixCls}__item`}
              href={`/discovery/detail?id=${item.infoId}`}
              as={`/discovery/detail/${item.infoId}`}
            >
              <Flex>
                <Img src={item.faceImg} size="0.72rem" circle />
                <Flex.Item className="ml-20">
                  <p className="t-30 l-44 t-title ls-o1">{item.niname}</p>
                  <p className="t-24 l-36 t-sub">
                    {goods} | 喜获
                    {fishKind}
                    {max}
                    斤巨物
                  </p>
                </Flex.Item>
              </Flex>
              <Img
                className={`${prefixCls}__thumb mt-24`}
                src={
                  item.fileList && item.fileList[0]
                    ? Utils.getAppImgUrl(item.fileList[0].fileId, 'scale')
                    : ''
                }
              >
                <img
                  className="img-new"
                  src={`${images}/new${Const.__IMG_DPR__}.png`}
                  alt=""
                />
              </Img>
              <div className="info">
                <span className="t-56 l-80 t-danger t-b ls-1">{item.rate}</span>
                <span className="t-24 l-34 t-sub">分</span>
              </div>
            </Link>
          );
        })}
      </div>

      <style jsx global>{`
        .style-767697 {
        }
        .${prefixCls}__item {
          display: inline-block;
          width: 6rem;
          padding: 0.24rem 0.32rem;
          background: ${Styles.color_bg};
          border-radius: 0.06rem;
        }
        .${prefixCls}__item:not(:first-child) {
          margin-left: 0.3rem;
        }
        .${prefixCls}__thumb {
          width: 100% !important;
          height: auto !important;
          padding-bottom: 48.4%;
          border-radius: 0.06rem;
        }
      `}</style>
      <style jsx>{`
        .style-767697 {
          min-height: 6.75rem;
          padding-bottom: ${Styles.bottom};
          background: ${Styles.color_theme};
        }
        .img-new {
          position: absolute;
          width: 0.8rem;
          height: 0.36rem;
          top: 0.16rem;
          right: 0;
        }
        .info {
          padding: 0.16rem 0.16rem 0;
        }
      `}</style>
    </div>
  );
};

_Fish.contextTypes = {
  $: PropTypes.object
};

export default observer(_Fish);
