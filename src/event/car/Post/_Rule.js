/**
 * const prefixCls = 'style-169787';
 * const images = '/static/images/src/event/car/Post';
 * @Author: czy0729
 * @Date: 2018-11-08 15:18:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-21 16:19:38
 * @Path bt_mb_new /src/event/car/Post/_Rule.js.git
 */
import React from 'react';
import PropTypes from 'prop-types';
import { observer } from '@';
import { Rule } from '@components';
import { tid } from '../ds';
import { images } from './ds';

const _Rule = (props, { $ }) => {
  const { id } = $.params.params;
  const { show } = $.getState('_rule');
  const isCarEvent = id == tid;

  return (
    <Rule
      show={show}
      content={[
        `①单尾渔获必须达到${
          isCarEvent ? '50' : '30'
        }cm（请使用本汀随鱼竿赠送的卷尺量度渔获的长度；`,
        '②渔获照片必须包含：单尾渔获、渔获长度（长度清晰可认）、本汀的产品；',
        '③晒图必须是2张图片以上，必须有上述描述的渔获照片；',
        <p className="t-34 l-48 t-c mt-16">渔获图片参考示例</p>,
        <img
          className="mt-16"
          src={`${images}/example.jpg`}
          alt=""
          style={{ width: '100%' }}
        />
      ]}
      onClose={$.page.hideRule}
    />
  );
};

_Rule.contextTypes = {
  $: PropTypes.object
};

export default observer(_Rule);
