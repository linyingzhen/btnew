/**
 * const prefixCls = 'style-989758';
 * const images = '/static/images/src/person/wallet/Exchange';
 * @Author: czy0729
 * @Date: 2018-09-14 10:17:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-09-14 11:06:02
 * @Path m.benting.com.cn /src/person/wallet/Exchange/index.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import { InputItem } from 'antd-mobile';
import { injectV2, observer } from '@';
import { Layout } from '@_';
import { Flex, List, Icon, Form } from '@components';
import Styles from '@styles';
import FlowWrap from '../_/FlowWrap';
import store from './store';

const prefixCls = 'style-989758';

const Exchange = (props, { $ }) => {
  const { type, ipt } = $.getState();
  const { amount = '-', btAmount = '-' } = $.getState('walletInfo');
  const isNido = type === 1;

  return (
    <Layout
      title="余额划转"
      bd={null}
      headerStyle={{
        color: Styles.color_theme,
        background: 'transparent'
      }}
    >
      <FlowWrap>
        <Flex className="mt-64" style={{ padding: `0 ${Styles.wind}` }}>
          <Flex.Item>
            <p className="t-48 l-66 t-void t-b t-c">{btAmount}</p>
            <p className="t-24 l-34 t-void t-c mt-24">本汀账户</p>
          </Flex.Item>
          <Flex.Item>
            <p className="t-48 l-66 t-void t-b t-c">{amount}</p>
            <p className="t-24 l-34 t-void t-c mt-24">灵动账户</p>
          </Flex.Item>
        </Flex>
      </FlowWrap>
      <List>
        <List.Item
          extra={
            <Icon
              className="t-48 t-primary"
              type="transfer-circle-fill"
              onClick={$.page.changeType}
            />
          }
        >
          <p className="t-30 l-46">
            <span>从</span>
            <span className="t-primary ml-xs mr-xs">
              {isNido ? '灵动账户' : '本汀账户'}
            </span>
            <span>划转到</span>
            <span className="t-primary ml-xs">
              {isNido ? '本汀账户' : '灵动账户'}
            </span>
          </p>
        </List.Item>
      </List>
      <List className="mt-d">
        <InputItem
          className={`${prefixCls}__ipt`}
          placeholder="请输入划转金额"
          extra={
            <span className="t-30 l-46 t-primary" onClick={$.page.onAllClick}>
              全部划转
            </span>
          }
          value={ipt}
          onChange={$.page.onIptChange}
        />
      </List>
      <Form.Button onClick={$.do.exchange}>确认划转</Form.Button>

      <style jsx global>{`
        .style-989758 {
        }
        .${prefixCls}__ipt input {
          font-size: 0.3rem !important;
        }
      `}</style>
    </Layout>
  );
};

Exchange.contextTypes = {
  $: PropTypes.object
};

export default injectV2(store)(observer(Exchange));
