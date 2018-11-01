/**
 * const prefixCls = 'style-738519';
 * const images = '/static/images/src/person/help/Index';
 * @Author: Jun
 * @Date: 2018-08-06 16:51:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-09-08 11:41:20
 * @Path m.benting.com.cn /src/person/help/Index/_Top.js
 */
import React from 'react';
import { observer } from '@';
import { Flex, Button } from '@components';
import Utils from '@utils';
import Styles from '@styles';

const prefixCls = 'style-738519';

const _Top = () => (
  <Flex
    className={prefixCls}
    onClick={() => Utils.router.push('/person/help/search')}
  >
    <Flex.Item>
      <p className="t-30 l-42 t-sub">请输入您要咨询的问题</p>
    </Flex.Item>
    <Button type="primary" inline size="sm">
      搜索
    </Button>

    <style jsx global>{`
      .style-738519 {
        padding: ${Styles.sm} ${Styles.wind};
        background: ${Styles.color_theme};
      }
    `}</style>
  </Flex>
);

export default observer(_Top);
