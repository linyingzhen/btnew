/**
 * const prefixCls = 'style-200170';
 * const images = '/static/images/src/event/car/UserStatus';
 * @Author: czy0729
 * @Date: 2018-11-09 18:15:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-21 11:31:40
 * @Path bt_mb_new /src/event/car/UserStatus/_List.js.git
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { observer } from '@';
import { Flex, ListView } from '@components';
import Styles from '@styles';
import Row from './_Row';

const prefixCls = 'style-200170';

const _List = (props, { $ }) => {
  const { className } = props;
  const data = $.getState('list');

  return (
    <div className={classNames(prefixCls, className)}>
      <Flex className={`${prefixCls}__header`}>
        <p className="t-24" style={{ width: '1.28rem' }}>
          添加时间
        </p>
        <Flex.Item className="ml-32">
          <p className="t-24">添加鱼竿信息</p>
        </Flex.Item>
        <p className="t-24 ml-sm">状态</p>
      </Flex>
      <ListView
        data={data}
        renderRow={item => <Row {...item} />}
        onEndReached={$.fetch.list}
      />

      <style jsx global>{`
        .style-200170 {
        }
        .${prefixCls}__header {
          padding: 0.32rem ${Styles.wind};
          background: ${Styles.color_theme};
          border-bottom: ${Styles.border};
        }
      `}</style>
    </div>
  );
};

_List.contextTypes = {
  $: PropTypes.object
};

export default observer(_List);
