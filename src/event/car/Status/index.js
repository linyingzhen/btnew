/**
 * const prefixCls = 'style-483962';
 * const images = '/static/images/src/event/car/Status';
 * @Author: czy0729
 * @Date: 2018-11-09 14:45:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-21 11:48:51
 * @Path bt_mb_new /src/event/car/Status/index.js.git
 */
import React from 'react';
import PropTypes from 'prop-types';
import { injectV2, observer } from '@';
import { Button } from '@components';
import { Layout } from '@_';
import Utils from '@utils';
import List from '../Index/_List';
import FixedTextarea from '../Index/_FixedTextarea';
import StatusInfo from './_StatusInfo';
import store from './store';
import { tid } from '../ds';

const Status = (props, { $ }) => {
  const { id = tid } = $.params.params;

  return (
    <Layout title="我的活动状况">
      <StatusInfo />
      <div className="p-w">
        <div className="p-w">
          <Button
            type="main"
            onClick={() =>
              Utils.router.push(
                `/event/car/signup?id=${id}`,
                `/event/car/signup/${id}`
              )
            }
          >
            提交更多鱼竿
          </Button>
        </div>
      </div>
      <List className="mt-lg" />
      <FixedTextarea />
    </Layout>
  );
};

Status.contextTypes = {
  $: PropTypes.object
};

export default injectV2(store)(observer(Status));
