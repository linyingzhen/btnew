/**
 * const prefixCls = 'style-544241';
 * const images = '/static/images/src/event/car/Success';
 * @Author: czy0729
 * @Date: 2018-11-09 09:30:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-21 14:08:01
 * @Path bt_mb_new /src/event/car/Success/index.js.git
 */
import React from 'react';
import PropTypes from 'prop-types';
import { injectV2, observer } from '@';
import { Layout } from '@_';
import { Result, Button } from '@components';
import Utils from '@utils';
import store from './store';
import { tid } from '../ds';

const Success = (props, { $ }) => {
  const { id } = $.params.params;
  const isCarEvent = id == tid;

  return (
    <Layout title="提交成功" theme="fullTheme" bd={null}>
      <Result
        image="/static/svg/成功.svg"
        title={
          <>
            <span>您的报名信息已提交成功</span>
            <br />
            <span>等待审核中</span>
          </>
        }
        desc={
          <>
            <br />
            <span>在确认收货7天后，我们会尽快完成审核</span>
            <br />
            <span>注：您可以继续提交订单获得更多的抽奖机会</span>
          </>
        }
      />
      <div className="tool-wind mt-d">
        <Button type="primary" onClick={Utils.router.back}>
          继续提交
        </Button>
        <Button
          className="mt-32"
          onClick={() => {
            if (isCarEvent) {
              Utils.router.push('/event/car');
            } else {
              Utils.router.push(`/event/car?id=${id}`, `/event/car/${id}`);
            }
          }}
        >
          知道了
        </Button>
      </div>
    </Layout>
  );
};

Success.contextTypes = {
  $: PropTypes.object
};

export default injectV2(store)(observer(Success));
