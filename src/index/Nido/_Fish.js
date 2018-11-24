/**
 * const prefixCls = 'style-767697';
 * const images = '/static/images/src/index/Nido';
 * @Author: czy0729
 * @Date: 2018-06-25 12:11:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-15 11:56:10
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
          const {
            tit = '',
            tbId,
            infoId,
            faceImg,
            niname,
            fileList = [],
            rate
          } = item;
          const [goods, , fishKind, max] = tit.split('|');

          return (
            <Link
              key={tbId}
              className={`${prefixCls}__item`}
              href={`/discovery/detail?id=${infoId}`}
              as={`/discovery/detail/${infoId}`}
            >
              <Flex>
                <Img src={faceImg} size="0.72rem" circle />
                <Flex.Item className="ml-20">
                  <p className="t-30 l-44 t-title ls-o1">{niname}</p>
                  <p className="p-info t-24 l-36 t-sub t-c1">
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
                  fileList[0]
                    ? Utils.getAppImgUrl(fileList[0].fileId, 'scale')
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
                <span className="t-56 l-80 t-danger t-b ls-1">{rate}</span>
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
        .p-info {
          white-space: initial;
        }
      `}</style>
    </div>
  );
};

_Fish.contextTypes = {
  $: PropTypes.object
};

export default observer(_Fish);
