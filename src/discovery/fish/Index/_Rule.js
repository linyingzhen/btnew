/**
 * const prefixCls = 'style-955585';
 * const images = '/static/images/src/discovery/fish/Index';
 * @Author: czy0729
 * @Date: 2018-08-09 16:41:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-08-12 15:02:28
 * @Path m.benting.com.cn /src/discovery/fish/Index/_Rule.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import { observer } from '@';
import { Rule } from '@components';
import { ruleDS } from './ds';

const _Rule = (props, { $ }) => {
  const { id } = $.params.params;
  const { show } = $.getState('_rule');
  const { rule = '' } = $.getState('specialGoods');

  let content;
  if (rule) {
    content = rule.split('\n');
  } else {
    content = (ruleDS[id] && ruleDS[id].rule) || '';
  }

  return <Rule show={show} content={content} onClose={$.page.hideRule} />;
};

_Rule.contextTypes = {
  $: PropTypes.object
};

export default observer(_Rule);
