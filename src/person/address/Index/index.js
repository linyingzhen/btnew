/**
 * const prefixCls = 'style-495012';
 * const images = '/static/images/src/person/address/Index';
 * @Author: cwz0525
 * @Date: 2018-08-29 10:44:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-09-19 14:36:31
 * @Path m.benting.com.cn /src/person/address/Index/store.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Badge } from 'antd-mobile';
import { observer, injectV2 } from '@';
import { List, Flex, Icon, Form } from '@components';
import { Layout } from '@_';
import Utils from '@utils';
import Styles from '@styles';
import store from './store';

const Address = (props, { $ }) => {
  const { list } = $.getState('address');

  return (
    <Layout title="地址管理" bd={null}>
      <p
        className="p-sw t-48 l-66 t-b"
        style={{ background: Styles.color_theme }}
      >
        地址管理
      </p>
      <List>
        {list.map(item => {
          const { addressId, recName, phone, province, city, address } = item;

          return (
            <List.Item key={addressId}>
              <Flex>
                <Flex.Item>
                  <Flex>
                    <span className="t-34 l-48 t-b">{recName}</span>
                    <span className="t-30 l-42 ml-xs">
                      {String(phone).replace(/ /g, '')}
                    </span>
                    {item.default === 1 && (
                      <Badge
                        className="ml-md"
                        text="默认"
                        style={Styles._badge}
                      />
                    )}
                  </Flex>
                  <p className="t-24 l-34 mt-8">
                    {province} {city} {address}
                  </p>
                </Flex.Item>
                <Icon
                  type="more"
                  className="t-48"
                  onClick={() =>
                    Utils.actionSheet(['设为默认', '编辑', '删除'], index => {
                      switch (index) {
                        case 0:
                          $.do.setDefault(addressId);
                          break;

                        case 1:
                          Utils.router.push(
                            `/person/address/update?id=${addressId}`,
                            `/person/address/update/${addressId}`
                          );
                          break;

                        case 2:
                          Utils.onConfirm('确定删除?', () =>
                            $.do.delete(addressId));
                          break;

                        default:
                          break;
                      }
                    })
                  }
                />
              </Flex>
            </List.Item>
          );
        })}
      </List>
      <Form.Button onClick={() => Utils.router.push('/person/address/add')}>
        新建
      </Form.Button>
    </Layout>
  );
};

Address.contextTypes = {
  $: PropTypes.object
};

export default injectV2(store)(observer(Address));
