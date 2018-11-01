/**
 * const prefixCls = 'style-549755';
 * const images = '/static/images/src/person/vip/Index';
 * @Author: czy0729
 * @Date: 2018-10-17 17:01:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-17 17:15:44
 * @Path m.benting.com.cn /src/person/vip/Index/_List.js
 */
import React from 'react';
import classNames from 'classnames';
import { observer } from '@';
import { List } from '@components';
import { Header } from '@_';
import Const from '@const';
import Styles from '@styles';
import { images, listDS } from './ds';

const prefixCls = 'style-549755';

const _List = props => {
  const { className } = props;

  return (
    <div className={classNames(prefixCls, className)}>
      <Header
        title="福利特权"
        desc="开通VIP，各类专属福利特权"
        line={false}
        isList
      />
      <List>
        {listDS.map(item => (
          <List.Item
            key={item.title}
            thumb={
              <img
                className="img-thumb"
                src={`${images}/${item.thumb}${Const.__IMG_DPR__}.png`}
                alt=""
              />
            }
          >
            <p className="t-34 l-48 t-title">{item.title}</p>
            <p className="t-24 l-34 t-sub mt-4">{item.desc}</p>
          </List.Item>
        ))}
      </List>

      <style jsx>{`
        .style-549755 {
          padding: 0 0.16rem;
          background: ${Styles.color_theme};
        }
        .${prefixCls} :global(.am-list-item .am-list-line) {
          border-bottom: 0 !important;
        }
        .img-thumb {
          width: 0.4rem;
          height: 0.4rem;
          margin-bottom: 0.4rem;
        }
      `}</style>
    </div>
  );
};

export default observer(_List);
