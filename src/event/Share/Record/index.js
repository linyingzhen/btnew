import React from 'react';
import PropTypes from 'prop-types';
import { injectV2, observer } from '@';
import { Layout } from '@_';
import Row from './_Row';
import Styles from '@styles';
import store from './store';

const prefixCls = 'style-20181012172925';

const Record = (props, { $ }) => {
  const list = $.getState('list');
  const { recordtotal } = $.getState('pageinfo');
  const { rankNo } = $.getState('userRank');

  const listhas = list.length > 0;


  return (
    <Layout title="推广邀请" className={prefixCls}>
      <div className="blackbox">
        <div>
          <p className="t-48">
            {list.length === 0 ? 0 : recordtotal}
          </p>
          <p className="t-24">邀请人数</p>
        </div>
        <div>
          <p className="t-48">{rankNo || 0 }</p>
          <p className="t-24">邀请排名</p>
        </div>
      </div>
      <div className="content">
        { listhas &&
          <Row data={list} />
        }
        {
          listhas ? <div className="center t-sub mt-128">暂无更多</div> : <div className="center t-sub mt-12">暂无数据</div>
        }
      </div>
      <style jsx global>{`
        .style-20181012172925 .c-header,
        .style-20181012172925 .c-header__wrap {
          background: #404040 !important;
        }
        .style-20181012172925 .t-34 {
          color: ${Styles.color_void} !important;
        }
      `}</style>
      <style jsx>{`
        .blackbox {
          display: flex;
          justify-content: space-around;
          align-items: center;
          width: 100%;
          height: 2.4rem;
          text-align: center;
          color: ${Styles.color_void};
          background: #404040;
          padding: 0 1.2rem;
        }
        .content {
          position: relative;
          background: ${Styles.color_void};
          padding: ${Styles.wind};
        }
        .center {
          text-align: center;
          line-height: 1.5;
        }
        .red {
          color: #ff4242;
        }
        .ewm {
          position: absolute;
          top: -1rem;
          left: 50%;
          margin-left: -1.2rem;
          width: 2.4rem;
          height: 2.4rem;
          background: rgba(46, 142, 255, 1);
          box-shadow: 0rem 0.04rem 0.14rem 0rem rgba(46, 142, 255, 0.2);
          border: 0.14rem solid rgba(255, 255, 255, 1);
          border-radius: 50%;
        }
        .nums {
          list-style: none;
          color: ${Styles.color_void};
          font-size: 0.48rem;
          text-align: center;
        }
        .nums li {
          display: inline-block;
          width: 0.84rem;
          height: 1.38rem;
          line-height: 1.38rem;
          background: #404040;
          border-radius: 0.04rem;
          margin-right: 0.16rem;
        }
      `}</style>
    </Layout>
  );
};

Record.contextTypes = {
  $: PropTypes.object
};

export default injectV2(store)(observer(Record));
