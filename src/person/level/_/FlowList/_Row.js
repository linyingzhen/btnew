/**
 * const prefixCls = 'style-135027';
 * const images = '/static/images/src/person/wallet/_/FlowList';
 * @Author: czy0729
 * @Date: 2018-09-13 10:30:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-09-13 15:11:52
 * @Path m.benting.com.cn /src/person/wallet/_/FlowList/_Row.js
 */
import React from 'react';
import classNames from 'classnames';
import { observer } from '@';
import { List } from '@components';
import Utils from '@utils';
import Thumb from './_Thumb';

const prefixCls = 'style-210925';

const _Row = props => {
  const { title, changeAmount, amount, createTime, className } = props;
  const isAdd = parseFloat(changeAmount) > 0;

  return (
    <List.Item
      className={classNames(prefixCls, className)}
      thumb={<Thumb title={title} />}
      wrap
      extra={
        <>
          <p
            className={classNames('t-30 l-42 t-b', {
              't-danger': !isAdd,
              't-success': isAdd
            })}
          >
            {changeAmount}
          </p>
          <p className="t-24 l-34 t-sub">{Utils.formatNumber(amount)}</p>
        </>
      }
    >
      <p className="t-30 l-42">{title}</p>
      <p className="t-24 l-34 t-sub">{Utils.date('H:i', createTime)}</p>

      <style jsx global>{`
        .style-210925 {
        }
        .${prefixCls} .am-list-line-wrap {
          padding: 0.16rem 0;
        }
      `}</style>
    </List.Item>
  );
};

export default observer(_Row);
