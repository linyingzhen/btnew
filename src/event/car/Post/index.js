/**
 * const prefixCls = 'style-178037';
 * const images = '/static/images/src/event/car/Post';
 * @Author: czy0729
 * @Date: 2018-11-08 11:37:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-10 12:07:00
 * @Path bt_mb_new /src/event/car/Post/index.js.git
 */
import React from 'react';
import PropTypes from 'prop-types';
import { injectV2, form, observer } from '@';
import { Flex, Icon } from '@components';
import { Layout } from '@_';
import Const from '@const';
import Header from './_Header';
import Textarea from './_Textarea';
import Media from './_Media';
import Form from './_Form';
import Rule from './_Rule';
import store from './store';

const Post = (props, { $ }) => {
  if (!Const.__CLIENT__) {
    return null;
  }

  const { form, onSubmit } = props;

  return (
    <Layout
      title="发布渔获"
      header={<Header form={form} onSubmit={onSubmit} />}
    >
      <Textarea />
      <Media />
      <Flex className="tool-wind mt-sm">
        <Flex.Item className="t-24 t-sub">
          <span>晒渔获请务必带上清晰的</span>
          <span className="t-danger">照片</span>
          <span>，否则不作审核</span>
        </Flex.Item>
        <Flex onClick={$.page.showRule} style={{ marginLeft: '0.64rem' }}>
          <span className="t-24">查看示例</span>
          <Icon className="t-32 ml-xs" type="right" onClick={$.page.showRule} />
        </Flex>
      </Flex>
      <Form className="mt-md" form={form} />
      <Rule />
    </Layout>
  );
};

Post.contextTypes = {
  $: PropTypes.object
};

export default injectV2(store)(form(observer(Post)));
