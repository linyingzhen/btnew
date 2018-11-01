/**
 * const prefixCls = 'style-112761';
 * const images = '/static/images/src/discovery/fish/Post';
 * @Author: czy0729
 * @Date: 2018-08-10 18:03:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-31 18:13:38
 * @Path m.benting.com.cn /src/discovery/fish/Post/index.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import { injectV2, form, observer } from '@';
import { Header, Icon } from '@components';
import { Layout } from '@_';
import Const from '@const';
import Utils from '@utils';
import Textarea from './_Textarea';
import Media from './_Media';
import Form from './_Form';
import store from './store';

@injectV2(store)
@form
@observer
export default class Post extends React.Component {
  static contextTypes = {
    $: PropTypes.object
  };

  render() {
    if (!Const.__CLIENT__) {
      return null;
    }

    const { $ } = this.context;
    const { form, onSubmit } = this.props;

    return (
      <Layout
        title="发布渔获"
        header={
          <Header
            show
            hd={
              <Icon
                className="t-34"
                type="cross"
                onClick={Utils.router.back}
              />
            }
            ft={
              <span
                className="t-34 l-48 t-primary"
                onClick={() => onSubmit(form, $.do.publish)}
              >
                发布
              </span>
            }
          />
        }
      >
        <Textarea />
        <Media />
        <p className="tool-wind t-24 t-sub mt-sm">
          <span>晒渔获请务必带上清晰的</span>
          <span className="t-danger">渔获称重照片或视频</span>
          <span>，否则不作评分</span>
        </p>
        <Form className="mt-md" form={form} />
      </Layout>
    );
  }
}
