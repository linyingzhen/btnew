/**
 * const prefixCls = 'style-962424';
 * const images = '/static/images/src/discovery/fish/Category';
 * @Author: czy0729
 * @Date: 2018-08-07 18:20:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-08-08 12:31:32
 * @Path m.benting.com.cn /src/discovery/fish/Category/_List.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { observer } from '@';
import { ListView, List, Img } from '@components';
import Utils from '@utils';
import Styles from '@styles';
import { discoveryFishCategoryDS } from '@ds';
import { images } from './ds';

const prefixCls = 'style-962424';

const _List = (props, { $ }) => {
  const { className } = props;
  const { id } = $.params.params;
  const data = $.getState('goods');
  const label = Utils.getLabel(discoveryFishCategoryDS, id);

  return (
    <div className={classNames(prefixCls, className)}>
      <List>
        <List.Item
          thumb={
            <div className="wrap-thumb">
              <Img
                className={`${prefixCls}__thumb`}
                src={`${images}/${label}.jpg`}
              />
            </div>
          }
          arrow="horizontal"
          href={`/discovery/fish?id=${id}`}
          as={`/discovery/fish/${id}`}
        >
          <p className="t-32 l-48">{label}总览</p>
        </List.Item>
      </List>
      <ListView
        className="mt-d"
        data={data}
        renderRow={item => (
          <List.Item
            key={item.gid}
            thumb={
              <div className="wrap-thumb">
                <Img
                  className={`${prefixCls}__thumb`}
                  src={Utils.getAppImgUrl(item.imgs, 'scale')}
                />
              </div>
            }
            arrow="horizontal"
            href={`/discovery/fish?id=${id}&gid=${item.gid}`}
            as={`/discovery/fish/${id}/${item.gid}`}
          >
            <p className="t-32 l-48">{item.title}</p>
            {item.comment !== 0 && (
              <p className="t-28 l-40">
                <span className="t-danger">{item.comment}</span>
                <span className="t-sub">人在讨论</span>
              </p>
            )}
          </List.Item>
        )}
        onEndReached={$.fetch.goods}
      />

      <style jsx global>{`
        .style-962424 {
        }
        .${prefixCls}__thumb {
          width: 1.8rem;
          height: 1.8rem;
          border-radius: ${Styles.radius_sm};
        }
      `}</style>
      <style jsx>{`
        .style-962424 {
        }
        .wrap-thumb {
          padding: 0.2rem 0;
        }
      `}</style>
    </div>
  );
};

_List.contextTypes = {
  $: PropTypes.object
};

export default observer(_List);
