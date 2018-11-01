/**
 * const prefixCls = 'style-114107';
 * const images = '/static/images/src/person/feedback/Index';
 * @Author: czy0729
 * @Date: 2018-09-10 10:29:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-09-10 14:27:05
 * @Path m.benting.com.cn /src/person/feedback/Index/_Row.js
 */
import React from 'react';
import classNames from 'classnames';
import { observer } from '@';
import { List, Flex, Icon } from '@components';
import Utils from '@utils';
import Styles from '@styles';

const prefixCls = 'style-114107';

const _Row = props => {
  const { tbId, content, replys, read, createTime } = props;
  const isReplied = !!replys;
  const isRead = isReplied && read == 0;

  return (
    <List.Item
      href={`/person/feedback/detail?id=${tbId}`}
      as={`/person/feedback/detail/${tbId}`}
    >
      <p className="wrap t-30 l-42">{content}</p>
      <Flex className={`${prefixCls}__brief`}>
        <div
          className={classNames('badge', {
            'badge-success': !isRead,
            'badge-danger': isRead
          })}
        />
        <Flex.Item className="t-30 l-42">
          {isReplied ? '管理员有回复' : '已提交'}
        </Flex.Item>
        <p className="t-30 l-42 t-sub ml-sm">{Utils.date(createTime)}</p>
        <Icon className="t-28 t-icon ml-sm" type="right" />
      </Flex>

      <style jsx global>{`
        .style-114107 {
        }
        .${prefixCls}__brief {
          padding-top: 0.24rem;
          border-top: ${Styles.border};
        }
      `}</style>
      <style jsx>{`
        .style-114107 {
        }
        .wrap {
          padding-bottom: 0.24rem;
        }
        .badge {
          display: inline-block;
          width: 0.16rem;
          height: 0.16rem;
          border-radius: 50%;
        }
        .badge-success {
          background: ${Styles.color_success};
        }
        .badge-danger {
          background: ${Styles.color_danger};
        }
      `}</style>
    </List.Item>
  );
};

export default observer(_Row);
