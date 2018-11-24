/**
 * const prefixCls = 'style-150705';
 * const images = '/static/images/src/bbs/topic/Index';
 * @Author: czy0729
 * @Date: 2018-08-03 10:16:39
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-02 18:52:04
 * @Path m.benting.com.cn /src/bbs/topic/Index/_Top.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Carousel } from 'antd-mobile';
import { observer } from '@';
import { List, Flex } from '@components';
import { TopicAvatar } from '@_';
import Styles from '@styles';

const prefixCls = 'style-150705';

const _Top = (props, { $ }) => {
  const { className } = props;
  const { list } = $.getState('topicList');

  const list1 = [];
  const list2 = [];
  const list3 = [];
  list.filter((item, index) => index < 9).forEach((item, index) => {
    if (index < 3) {
      list1.push(item);
    } else if (index < 6) {
      list2.push(item);
    } else {
      list3.push(item);
    }
  });

  return (
    <div className={classNames(prefixCls, className)}>
      <Carousel
        className={`${prefixCls}__carousel`}
        dots={false}
        frameOverflow="visible"
        slideWidth={0.8}
      >
        {[list1, list2, list3].map((item, index) => (
          /* eslint-disable-next-line */
          <List key={index}>
            {item.map(({ topicId, title }) => (
              <List.Item
                key={topicId}
                thumb={<TopicAvatar />}
                href={`/bbs/topic/detail?id=${topicId}`}
                as={`/bbs/topic/detail/${topicId}`}
              >
                <Flex className={`${prefixCls}__wrap-title`}>
                  <p className="p-title t-28 t-c2">{title}</p>
                </Flex>
              </List.Item>
            ))}
          </List>
        ))}
      </Carousel>

      <style jsx global>{`
        .style-150705 {
          position: relative;
          height: 4rem;
          background: ${Styles.color_theme};
        }
        .${prefixCls}__carousel {
          position: absolute;
          top: 0;
          left: 0;
          margin-left: -0.74rem;
        }
        .${prefixCls}__wrap-title {
          height: 0.84rem;
        }
      `}</style>
    </div>
  );
};

_Top.contextTypes = {
  $: PropTypes.object
};

export default observer(_Top);
