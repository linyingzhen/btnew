/**
 * const prefixCls = 'style-281344';
 * const images = '/static/images/src/video/Post';
 * @Author: czy0729
 * @Date: 2018-07-26 14:33:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-05 09:53:50
 * @Path m.benting.com.cn /src/video/Post/_Tags.js
 */
import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Picker } from 'antd-mobile';
import { observer } from '@';
import { List } from '@components';
import Styles from '@styles';
import { fromDS } from './ds';

const prefixCls = 'style-281344';

const _Tags = (props, { $ }) => {
  const { className } = props;
  const { from, tags } = $.getState('_tags');
  const tagsDS = $.getState('tags');

  return (
    <List className={classNames(prefixCls, className)}>
      <Picker
        data={fromDS}
        cols={1}
        title="选择视频来源"
        extra="请选择"
        value={[from]}
        onOk={value =>
          $.setState(
            {
              from: value[0]
            },
            '_tags'
          )
        }
      >
        <List.Item arrow="horizontal">视频来源</List.Item>
      </Picker>
      <List.Item>
        <span>选择标签</span>
        <div className="mt-md">
          {tagsDS.list.map(item => (
            <div
              key={item.labelId}
              className={classNames('tag t-30 l-48', {
                'tag-active': !!tags.find(id => id === item.labelId)
              })}
              onClick={() => $.page.tagClick(item.labelId)}
            >
              {item.labelvalue}
            </div>
          ))}
        </div>
      </List.Item>

      <style jsx global>{`
        .style-281344 {
        }
        .${prefixCls} .am-list-content,
        .${prefixCls} .am-list-extra {
          font-size: ${Styles.font_form} !important;
        }
      `}</style>
      <style jsx>{`
        .style-281344 {
        }
        .tag {
          display: inline-block;
          padding: 0 ${Styles.sm};
          margin: 0 ${Styles.md} ${Styles.md} 0;
          color: ${Styles.color_sub};
          border-radius: 0.28rem;
          border: ${Styles.border};
          transition: 0.3s all;
        }
        .tag-active {
          color: #fff;
          background: ${Styles.color_primary};
          border: 0.01rem solid ${Styles.color_primary};
        }
      `}</style>
    </List>
  );
};

_Tags.contextTypes = {
  $: PropTypes.object
};

export default observer(_Tags);
