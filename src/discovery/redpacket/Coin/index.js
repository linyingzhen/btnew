/**
 * const prefixCls = 'style-205763';
 * const images = '/static/images/src/discovery/redpacket/Coin';
 * @Author: czy0729
 * @Date: 2018-10-22 23:55:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-23 18:28:08
 * @Path bt_mb_new /src/discovery/redpacket/Coin/index.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import { injectV2, form, observer } from '@';
import { AffixTabs, PayConfirm } from '@components';
import { Layout } from '@_';
import Form from './_Form';
import store from './store';
import { tabsDS } from './ds';

const prefixCls = 'style-205763';

const Coin = (props, { $ }) => {
  const { form, onSubmit } = props;
  const { page } = $.getState('_affixTabs');
  const { show, amount } = $.getState('_payConfirm');

  return (
    <Layout title="金币红包" className={prefixCls}>
      <AffixTabs
        align="center"
        tabs={tabsDS}
        page={page}
        animated
        destroyInactiveTab={false}
        onTabClick={$.page.onTabClick}
      >
        <Form form={form} onSubmit={onSubmit} label="总金币" />
        <Form form={form} onSubmit={onSubmit} label="单个金币" />
      </AffixTabs>
      <PayConfirm
        show={show}
        type="coin"
        amount={amount}
        onClose={$.page.hidePayConfirm}
        onConfirm={$.do.send}
      />

      <style jsx global>{`
        .style-205763 .am-tabs-default-bar-content {
          border-bottom: 0;
        }
      `}</style>
    </Layout>
  );
};

Coin.contextTypes = {
  $: PropTypes.object
};

export default injectV2(store)(form(observer(Coin)));
