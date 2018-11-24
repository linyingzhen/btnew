/**
 * const prefixCls = 'style-791893';
 * const images = '/static/images/src/event/car/SuccessPublish';
 * @Author: czy0729
 * @Date: 2018-11-10 13:52:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-21 14:17:48
 * @Path bt_mb_new /src/event/car/SuccessPublish/index.js.git
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
  const { id = tid } = $.params.params;

  return (
    <Layout title="提交成功" theme="fullTheme" bd={null}>
      <Result
        image="/static/svg/成功.svg"
        title="提交渔获成功"
        desc="我们会尽快完成审核"
      />
      <div className="tool-wind mt-d">
        <Button
          type="main"
          onClick={() =>
            Utils.router.push(
              `/event/car/status?id=${id}`,
              `/event/car/status/${id}`
            )
          }
        >
          查看我的渔获
        </Button>
      </div>
    </Layout>
  );
};

Success.contextTypes = {
  $: PropTypes.object
};

export default injectV2(store)(observer(Success));
