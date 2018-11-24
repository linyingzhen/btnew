/**
 * const prefixCls = 'style-231781';
 * const images = '/static/images/src/event/car/Index';
 * @Author: czy0729
 * @Date: 2018-11-06 16:00:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-21 11:13:46
 * @Path bt_mb_new /src/event/car/Index/_Vote.js.git
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { observer } from '@';
import { Flex, Icon } from '@components';
import Utils from '@utils';
import Styles from '@styles';
import { tid } from '../ds';

const prefixCls = 'style-231781';

const _Vote = (props, { $ }) => {
  const { className } = props;
  const { id = tid } = $.params.params;
  const { total, success } = $.getState('vote');
  const { list } = $.getState('signup');

  return (
    <div className={classNames(prefixCls, className)}>
      <Flex href={`/event/car/user?id=${id}`} as={`/event/car/user/${id}`}>
        <Flex.Item>
          <p className="t-32 l-44">
            <span>报名总人数</span>
            <span className="t-b pull-right">{total} 人</span>
          </p>
          <p className="t-32 l-44 mt-32">
            <span>已成功报名人数</span>
            <span className="t-b pull-right">{success} 人</span>
          </p>
        </Flex.Item>
        <Icon className="t-32 ml-42" type="right" />
      </Flex>
      <div className="list mt-32">
        <p className="t-32 l-44">最近报名粉丝</p>
        <div className="mt-24">
          {list.map(({ nickname, created_at: createdAt }) => (
            <p key={nickname} className="t-30 l-56 t-sub">
              <span>{nickname}</span>
              <span className="pull-right">
                {Utils.date('Y-m-d', createdAt)}
              </span>
            </p>
          ))}
        </div>
      </div>

      <style jsx>{`
        .style-231781 {
          padding: 0.32rem ${Styles.wind} ${Styles.bottom};
          background: ${Styles.color_theme};
        }
        .list {
          padding: 0.32rem 0 0;
          border-top: ${Styles.border};
        }
      `}</style>
    </div>
  );
};

_Vote.contextTypes = {
  $: PropTypes.object
};

export default observer(_Vote);
