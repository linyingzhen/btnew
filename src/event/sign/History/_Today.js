/**
 * const prefixCls = 'style-770408';
 * const images = '/static/images/src/event/sign/History';
 * @Author: czy0729
 * @Date: 2018-10-18 02:31:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-20 15:10:55
 * @Path m.benting.com.cn /src/event/sign/History/_Today.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { observer } from '@';
import { Flex, Button, Icon } from '@components';
import Utils from '@utils';
import Styles from '@styles';

const prefixCls = 'style-770408';

const _Today = (props, { $ }) => {
  const { className } = props;
  const { sign, signCount = ' - ' } = $.getState('userInfo');
  const isSign = !!sign;

  return (
    <div className={classNames(prefixCls, className)}>
      <div className="btn t-c">
        <Button
          type="primary"
          size="sm"
          inline
          radius
          disabled={isSign}
          style={{ minWidth: '1.96rem' }}
          onClick={() => Utils.checkLogin($.do.sign)}
        >
          {isSign ? '已签到' : '马上签到'}
        </Button>
      </div>
      <Flex className="mt-40" justify="center">
        <Icon className="t-64 t-sub" type="sign-fill" />
        <div className="ml-32">
          {/* <p className="t-24 t-sub">今日签到时间：00:00:01</p> */}
          <p className="t-30 mt-4" style={{ minWidth: '2rem' }}>
            <span>已签到{signCount}天</span>
            {/* <span>，今日获得</span>
            <span className="t-primary">15积分</span> */}
          </p>
        </div>
      </Flex>

      <style jsx>{`
        .style-770408 {
          padding: 0.4rem;
        }
        .btn {
          padding-bottom: 0.4rem;
          border-bottom: ${Styles.border};
        }
      `}</style>
    </div>
  );
};

_Today.contextTypes = {
  $: PropTypes.object
};

export default observer(_Today);
