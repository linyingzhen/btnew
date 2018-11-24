/**
 * const prefixCls = 'style-205479';
 * const images = '/static/images/src/auth/Search';
 * @Author: czy0729
 * @Date: 2018-08-13 14:31:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-05 10:22:20
 * @Path m.benting.com.cn /src/auth/Search/index.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import { injectV2, form, observer } from '@';
import { Form } from '@components';
import { Layout } from '@_';
import Const from '@const';
import Utils from '@utils';
import Styles from '@styles';
import store from './store';

const prefixCls = 'style-205479';

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
      <Layout title="防伪中心" bd={null}>
        <div className="wrap">
          <p className="t-48 l-66 t-b">防伪中心</p>
        </div>
        <Form className={`${prefixCls}__form`} form={form} label>
          <Form.Input
            label="防伪码"
            name="codeNo"
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

        <style jsx global>{`
          .style-679252 {
          }
          .${prefixCls}__form {
            margin-top: 0;
            background: ${Styles.color_theme};
          }
        `}</style>
        <style jsx>{`
          .style-205479 {
          }
          .wrap {
            padding: ${Styles.space} ${Styles.wind};
            background: ${Styles.color_theme};
          }
        `}</style>
      </Layout>
    );
  }
}
