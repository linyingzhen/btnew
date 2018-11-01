/**
 * const prefixCls = 'style-307636';
 * const images = '/static/images/src/discovery/fish/Category';
 * @Author: czy0729
 * @Date: 2018-08-07 18:11:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-08-08 13:50:41
 * @Path m.benting.com.cn /src/discovery/fish/Category/_RootList.js
 */
import React from 'react';
import classNames from 'classnames';
import { List, Img } from '@components';
import Styles from '@styles';
import { discoveryFishCategoryDS } from '@ds';
import { images } from './ds';

const prefixCls = 'style-307636';

const _RootList = props => {
  const { className } = props;

  return (
    <List className={classNames(prefixCls, className)}>
      {discoveryFishCategoryDS.map(item => (
        <List.Item
          key={item.label}
          thumb={
            <div className="wrap-thumb">
              <Img
                className={`${prefixCls}__thumb`}
                src={`${images}/${item.label}.jpg`}
              />
            </div>
          }
          arrow="horizontal"
          href={`/discovery/fish/category?id=${item.value}`}
          as={`/discovery/fish/category/${item.value}`}
        >
          {item.label}
        </List.Item>
      ))}

      <style jsx global>{`
        .style-307636 {
        }
        .${prefixCls}__thumb {
          width: 1.8rem;
          height: 1.2rem;
          border-radius: ${Styles.radius_sm};
        }
      `}</style>
      <style jsx>{`
        .style-307636 {
        }
        .wrap-thumb {
          padding: 0.2rem 0;
        }
      `}</style>
    </List>
  );
};

export default _RootList;
