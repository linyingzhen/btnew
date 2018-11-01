/**
 * const prefixCls = 'style-143086';
 * const images = '/static/images/src/event/sign/Index';
 * @Author: czy0729
 * @Date: 2018-10-18 04:07:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-20 15:49:01
 * @Path m.benting.com.cn /src/event/sign/Index/index.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import { injectV2, observer } from '@';
import { Layout } from '@_';
import { Flex, Icon } from '@components';
import Utils from '@utils';
import Styles from '@styles';
import Week from './_Week';
import List from './_List';
import Rule from './_Rule';
import store from './store';

const Sign = (props, { $ }) => (
  <Layout
    title="每日签到"
    headerStyle={{
      color: Styles.color_void,
      background: Styles.color_main
    }}
    ft={
      <Flex>
        <Icon
          className="t-40 t-icon"
          type="calendar-fill"
          onClick={() =>
            Utils.checkLogin(() => Utils.router.push('/event/sign/history'))
          }
        />
        <Icon
          className="t-40 t-icon ml-sm"
          type="information-circle-fill"
          onClick={$.page.showRule}
        />
      </Flex>
    }
  >
    <div className="top">
      <Week />
      <List className="mt-40" />
    </div>
    <Rule />

    <style jsx>{`
      .style-143086 {
      }
      .top {
        position: relative;
        padding: 0.4rem ${Styles.wind} 0;
      }
      .top:before {
        content: '';
        position: absolute;
        z-index: -1;
        top: 0;
        right: 0;
        left: 0;
        padding-bottom: 4rem;
        background: ${Styles.color_main};
      }
    `}</style>
  </Layout>
);

Sign.contextTypes = {
  $: PropTypes.object
};

export default injectV2(store)(observer(Sign));
