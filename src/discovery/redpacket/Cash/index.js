/**
 * const prefixCls = 'style-639912';
 * const images = '/static/images/src/discovery/redpacket/Cash';
 * @Author: czy0729
 * @Date: 2018-10-23 00:20:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-23 18:55:57
 * @Path bt_mb_new /src/discovery/redpacket/Cash/index.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import { injectV2, form, observer } from '@';
import { AffixTabs, PayConfirm } from '@components';
import { Layout } from '@_';
import Form from './_Form';
import store from './store';
import { tabsDS } from './ds';

const prefixCls = 'style-639912';

const Cash = (props, { $ }) => {
  const { form, onSubmit } = props;
  const { page } = $.getState('_affixTabs');
  const { show, amount } = $.getState('_payConfirm');

  return (
    <Layout title="现金红包" className={prefixCls}>
      <AffixTabs
        align="center"
        tabs={tabsDS}
        page={page}
        animated
        destroyInactiveTab={false}
        onTabClick={$.page.onTabClick}
      >
        <Form form={form} onSubmit={onSubmit} label="总金额" />
        <Form form={form} onSubmit={onSubmit} label="单个金额" />
      </AffixTabs>
      <PayConfirm
        show={show}
        type="amount"
        dataType="1"
        amount={amount}
        onClose={$.page.hidePayConfirm}
        onConfirm={$.do.send}
      />

      <style jsx global>{`
        .style-639912 .am-tabs-default-bar-content {
          border-bottom: 0;
        }
      `}</style>
    </Layout>
  );
};

Cash.contextTypes = {
  $: PropTypes.object
};

export default injectV2(store)(form(observer(Cash)));
