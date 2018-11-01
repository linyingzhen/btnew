/**
 * const prefixCls = 'style-173266';
 * const images = '/static/images/src/person/wallet/_/FlowList';
 * @Author: czy0729
 * @Date: 2018-09-13 15:09:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-09-13 15:14:34
 * @Path m.benting.com.cn /src/person/wallet/_/FlowList/_RowScore.js
 */
import React from 'react';
import classNames from 'classnames';
import { observer } from '@';
import { List } from '@components';
import Utils from '@utils';

const prefixCls = 'style-210925';

const _Row = props => {
  // const { con, changePoint, point, createTime, className } = props;
  const { con, changePoint, createTime, className } = props;
  const isAdd = parseFloat(changePoint) > 0;

  return (
    <List.Item
      className={classNames(prefixCls, className)}
      wrap
      extra={
        <>
          <p
            className={classNames('t-30 l-42 t-b', {
              't-danger': !isAdd,
              't-success': isAdd
            })}
          >
            {isAdd ? '+' : '-'}
            {changePoint}
          </p>
          {/* <p className="t-24 l-34 t-sub">{Utils.formatNumber(point, 0)}</p> */}
        </>
      }
    >
      <div>
        <p className="t-30 l-42">{con}</p>
        <p className="t-24 l-34 t-sub">{Utils.date('H:i', createTime)}</p>
      </div>

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
