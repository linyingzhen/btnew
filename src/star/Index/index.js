/**
 * const prefixCls = 'style-114230';
 * const images = '/static/images/src/star/Index';
 * @Author: czy0729
 * @Date: 2018-10-22 00:26:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-22 00:59:19
 * @Path bt_mb_new /src/star/Index/index.js
 */
import React from 'react';
import { Layout } from '@_';
import { Link, Img } from '@components';
import { images } from './ds';
import { imagesStar, starDS } from '../ds';

const prefixCls = 'style-114230';

const Star = () => (
  <Layout title="名人堂">
    <img className="img-top" src={`${images}/bg.jpg`} alt="" />
    <p className="t-36 t-b t-c mt-40">华人之光</p>
    <div className="p-w mt-24">
      {starDS.map(item => (
        <Link
          key={item.id}
          className={`${prefixCls}__item mt-16`}
          href={`/star/detail?id=${item.id}`}
          as={`/star/detail/${item.id}`}
        >
          <Img
            className={`${prefixCls}__thumb`}
            src={`${imagesStar}/${item.img}`}
          />
          <p className="t-32 l-64 t-c">{item.title}</p>
        </Link>
      ))}
    </div>

    <style jsx global>{`
      .style-114230 {
      }
      .${prefixCls}__item {
        display: inline-block;
        width: 48.5%;
      }
      .${prefixCls}__item:first-child {
        width: 100%;
      }
      .${prefixCls}__item:nth-of-type(2n + 2) {
        margin-right: 3%;
      }
      .${prefixCls}__thumb {
        width: 100%;
        padding-bottom: 100%;
      }
      .${prefixCls}__item:first-child .${prefixCls}__thumb {
        padding-bottom: 50%;
      }
    `}</style>
    <style jsx>{`
      .style-114230 {
      }
      .img-top {
        width: 100%;
        height: 50vw;
      }
      .img-title {
        height: 0.5rem;
      }
    `}</style>
  </Layout>
);

export default Star;
