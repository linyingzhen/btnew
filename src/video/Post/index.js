/**
 * const prefixCls = 'style-193549';
 * const images = '/static/images/src/video/Post';
 * @Author: czy0729
 * @Date: 2018-07-26 09:47:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-07-26 17:37:48
 * @Path m.benting.com.cn /src/video/Post/index.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import { injectV2, form, observer } from '@';
import { Layout } from '@_';
import Const from '@const';
import UI from '@stores/ui';
import Upload from './_Upload';
import Form from './_Form';
import Tags from './_Tags';
import store from './store';

@injectV2(store)
@form
@observer
export default class Post extends React.Component {
  static contextTypes = {
    $: PropTypes.object
  };

  componentDidMount() {
    const { $ } = this.context;
    const { form, onSubmit } = this.props;

    UI.header({
      ft: (
        <span
          className="t-34 l-48 t-primary"
          onClick={() => $.do._submit(form, onSubmit)}
        >
          发布
        </span>
      )
    });
  }

  componentWillUnmount() {
    UI.resetHeader();
  }

  render() {
    if (!Const.__CLIENT__) {
      return null;
    }

    const { form } = this.props;

    return (
      <Layout title="发布视频">
        <Upload />
        <Form className="mt-d" form={form} />
        <Tags className="mt-d" />
      </Layout>
    );
  }
}
