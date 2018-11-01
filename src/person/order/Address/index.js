/**
 * const prefixCls = 'style-169978';
 * const images = '/static/images/src/person/order/Address';
 * @Author: czy0729
 * @Date: 2018-09-19 11:51:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-24 00:32:55
 * @Path m.benting.com.cn /src/person/order/Address/index.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Radio } from 'antd-mobile';
import { observer, injectV2 } from '@';
import { List, Flex, Form } from '@components';
import { Layout } from '@_';
import Styles from '@styles';
import store from './store';

const Address = (props, { $ }) => {
  const { defaultIndex } = $.getState();
  const { list } = $.getState('address');

  return (
    <Layout title="选择地址" bd={null}>
      <p
        className="p-sw t-48 l-66 t-b"
        style={{ background: Styles.color_theme }}
      >
        选择地址
      </p>
      <List>
        {list.map(item => {
          const { addressId, recName, phone, province, city, address } = item;

          return (
            <Radio.RadioItem
              key={addressId}
              checked={defaultIndex === addressId}
              onClick={() => $.page.changeIndex(addressId)}
            >
              <Flex>
                <Flex.Item>
                  <Flex>
                    <span className="t-34 l-48 t-b">{recName}</span>
                    <span className="t-30 l-42 ml-xs">
                      {String(phone).replace(/ /g, '')}
                    </span>
                  </Flex>
                  <p className="t-24 l-34 mt-8">
                    {province} {city} {address}
                  </p>
                </Flex.Item>
              </Flex>
            </Radio.RadioItem>
          );
        })}
        <List.Item arrow="horizontal" href="/person/address">
          新建地址
        </List.Item>
      </List>
      <Form.Button onClick={$.do.submit}>确认</Form.Button>
    </Layout>
  );
};

Address.contextTypes = {
  $: PropTypes.object
};

export default injectV2(store)(observer(Address));
