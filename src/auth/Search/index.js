/**
 * const prefixCls = 'style-205479';
 * const images = '/static/images/src/auth/Search';
 * @Author: czy0729
 * @Date: 2018-08-13 14:31:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-09-03 10:25:06
 * @Path m.benting.com.cn /src/auth/Search/index.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import { injectV2, form, observer } from '@';
import { Form, Icon } from '@components';
import { Layout } from '@_';
import Const from '@const';
import Utils from '@utils';
import store from './store';

@injectV2(store)
@form
@observer
export default class Search extends React.Component {
  static contextTypes = {
    $: PropTypes.object
  };

  componentDidMount() {
    const type = Utils.getQuery('type');

    if (type === 'scan') {
      const { $ } = this.context;

      $.page.openScan();
    }
  }

  render() {
    const { $ } = this.context;
    const { form, onSubmit } = this.props;

    return (
      <Layout title="输入防伪码">
        <Form form={form}>
          <Form.Input
            label={<Icon className="t-34" type="barcode" />}
            name="codeNo"
            placeholder="请输入防伪码"
            updatePlaceholder={false}
            option={Const.rules.required}
          />
        </Form>
        <Form.Button
          type="main"
          onClick={() => Utils.checkLogin(() => onSubmit(form, $.do.search))}
        >
          查询
        </Form.Button>
      </Layout>
    );
  }
}
