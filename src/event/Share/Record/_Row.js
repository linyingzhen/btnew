import React from 'react';
import { observer } from '@';
import PropTypes from 'prop-types';
import Utils from '@utils';

const _Row = props => {
  const list = props.data;

  return (
    <div>
      <div className="titlebox t-sub">
        <div className="box-item">好友昵称</div>
        <div className="box-item">注册手机</div>
        <div className="box-item last">注册时间</div>
      </div>
      { list.map(item => <div key={item.tbId} className="contentbox mt-12">
        <div className="box-item">{item.invniname}</div>
        <div className="box-item">{item.invPhone}</div>
        <div className="box-item last">{Utils.date('Y-m-d', item.createTime)}</div>
      </div>) }

      <style jsx>{`
        .titlebox, .contentbox {
          display: flex;
          justify-content: space-between;
        }
        .titlebox {
          border-bottom: 1px dashed #ccc;
          line-height: 2;
        }
        .contentbox {

        }
        .box-item {
          padding: .12rem 0;
          flex: 1;
        }
        .last {
          text-align: right;
        }
      `}</style>
    </div>
  );
};

_Row.contextTypes = {
  $: PropTypes.object
};

export default observer(_Row);
