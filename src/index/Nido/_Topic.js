/**
 * const prefixCls = 'style-189994';
 * const images = '/static/images/src/index/Nido';
 * @Author: czy0729
 * @Date: 2018-06-24 18:00:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-28 02:50:25
 * @Path m.benting.com.cn /src/index/Nido/_Topic.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { observer } from '@';
import { Flex, Img, Link } from '@components';
import { Header } from '@_';
import Styles from '@styles';

const prefixCls = 'style-189994';

const _Topic = (props, { $ }) => {
  const { className } = props;
  const topic = $.getState('topic');

  return (
    <div className={classNames(prefixCls, className)}>
      <Header title="话题讨论" href="/bbs/topic" />
      <div className="wrap tool-wrap-scroll">
        {topic.list.map((item, index) => (
          <div key={item.tid} className="item">
            <Flex>
              <Img
                className={`${prefixCls}__avatar`}
                src={item.topicList[0].faceImg}
                size="0.82rem"
                circle
              />
              <Flex.Item>
                <p className="t-28 l-40 t-m">{item.subject}</p>
                <p className="t-24 l-34 mt-4">
                  {index === 0 && <span className="t-danger">热门 · </span>}
                  <span className="t-primary">{item.topicTotal}人</span>
                  <span className="t-sub">参与讨论</span>
                </p>
              </Flex.Item>
            </Flex>
            <div className="mt-24">
              {item.topicList.map(i => (
                <Link
                  key={i.threadId}
                  className="mt-16"
                  href={`/bbs/article?id=${i.threadId}`}
                  as={`/bbs/article/${i.threadId}`}
                  block
                >
                  <p className="p-content t-30 l-42 t-c1">
                    <span className="t-sub">{i.niname}：</span>
                    <span className="t-title">{i.content}</span>
                  </p>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      <style jsx global>{`
        .style-189994 {
        }
        .${prefixCls}__avatar {
          position: relative;
          border: 0.04rem solid ${Styles.color_primary};
        }
        .${prefixCls}__avatar:before {
          ${Styles._full};
          content: '#';
          font-size: 0.48rem;
          line-height: 0.72rem;
          text-align: center;
          color: ${Styles.color_void};
          background: rgba(0, 0, 0, 0.32);
        }
      `}</style>
      <style jsx>{`
        .style-189994 {
          padding-bottom: ${Styles.bottom};
          background: ${Styles.color_theme};
        }
        .wrap {
          padding: 0 ${Styles.wind};
        }
        .item {
          display: inline-block;
          vertical-align: top;
          width: 80%;
          padding-right: 0.48rem;
          margin-right: 0.48rem;
          border-right: ${Styles.border};
        }
        .item:last-child {
          margin-right: 0;
          border-right: 0;
        }
        .p-content {
          white-space: initial;
        }
      `}</style>
    </div>
  );
};

_Topic.contextTypes = {
  $: PropTypes.object
};

export default observer(_Topic);
