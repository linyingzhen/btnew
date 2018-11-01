/**
 * const prefixCls = 'style-221922';
 * const images = '/static/images/src/person/event/Index';
 * @Author: czy0729
 * @Date: 2018-09-27 10:57:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-17 10:11:28
 * @Path m.benting.com.cn /src/person/event/Index/index.js
 */
import React from 'react';
import { injectV2 } from '@';
import { List } from '@components';
import { Layout, Header } from '@_';
import store from './store';
import { images, menuDS } from './ds';

const Event = () => (
  <Layout title="我的活动">
    <div className="mt-d">
      {menuDS.map(item => (
        <div key={item.label}>
          {item.label && <Header title={item.label} line={false} isList />}
          <List className="mb-d">
            {item.child.map(i => (
              <List.Item
                key={i.label}
                thumb={
                  <img
                    className="img-thumb"
                    src={`${images}/${i.thumb}.png`}
                    alt=""
                  />
                }
                arrow={i.href ? 'horizontal' : undefined}
                href={i.href}
              >
                <p className="t-34 l-48 t-title">{i.label}</p>
              </List.Item>
            ))}
          </List>
        </div>
      ))}
    </div>

    <style jsx>{`
      .style-221922 {
      }
      .img-thumb {
        width: 0.4rem;
        height: 0.4rem;
      }
    `}</style>
  </Layout>
);

export default injectV2(store)(Event);
