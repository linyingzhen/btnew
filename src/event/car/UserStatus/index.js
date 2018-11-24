/**
 * const prefixCls = 'style-157011';
 * const images = '/static/images/src/event/car/UserStatus';
 * @Author: czy0729
 * @Date: 2018-11-09 16:15:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-10 11:06:30
 * @Path bt_mb_new /src/event/car/UserStatus/index.js.git
 */
import React from 'react';
import { injectV2 } from '@';
import { Flex, Icon } from '@components';
import { Layout } from '@_';
import List from './_List';
import Styles from '@styles';
import store from './store';

const prefixCls = 'style-157011';

const UserStatus = () => (
  <Layout title="报名详情">
    <Flex className={`${prefixCls}__attention`}>
      <Icon className="t-danger t-28 l-34" type="information-circle" />
      <p className="t-24 l-34 ml-sm">
        说明：只要有一根鱼竿审核通过，即可报名成功
      </p>
    </Flex>
    <List className="mt-d" />

    <style jsx global>{`
      .style-157011 {
      }
      .${prefixCls}__attention {
        padding: 0.16rem ${Styles.wind};
        background: ${Styles.color_theme};
      }
    `}</style>
  </Layout>
);

export default injectV2(store)(UserStatus);
